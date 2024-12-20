import { saveAs } from 'file-saver';
import {
  AbsentsListType,
  AbsentsReportType,
  AssignFormType,
  BellsFormType,
  BellsType,
  ClassFormType,
  CreateExamFormType,
  CreateHomeworkFormType,
  FieldsType,
  GradeFormType,
  GradeType,
  PlanDataType,
  PlansType,
  ReportCardType,
  ResponseType,
  ScheduleFormType,
  SendMessageFormType,
  StudentFormType,
  StudyType,
  TeacherFormType,
} from 'app/types/common.type';
import request from './request';
import * as api from './urls';

export const LogoutAction = async (): Promise<boolean> => {
  const url = api.LogoutUrl();
  const res: ResponseType<{ data: GradeType }> = await request.post(url);

  return res.ok;
};

export const PostCreateGrade = async (value: GradeFormType, id?: string): Promise<string> => {
  const body = { title: value.title, grade_id: value.grade.value };
  const url = id ? api.UpdateGradeUrl(id) : api.CreateGradeUrl();
  const res: ResponseType<{ data: GradeType }> = await request.post(url, body);

  return res.data?.data.code || '';
};

export const fieldsKey = (id: string): string[] => ['fields', id];
export const getFields = async (id: string): Promise<FieldsType[] | null> => {
  const res: ResponseType<{ data: FieldsType[] }> = await request.get(api.FieldsUrl(id));
  return res.data?.data || null;
};

export const UpdateClassAction = async (
  values: ClassFormType,
  gradeId: string,
  id?: number
): Promise<boolean> => {
  const url = id ? api.UpdateClassUrl(gradeId, id) : api.CreateClassUrl(gradeId);
  const body = { ...values, field_id: values.field?.value, floor: values.floor.toString() };
  const res: ResponseType<{ data: string }> = await request.post(url, body);

  return res.ok;
};

export const DeleteClassAction = async (gradeId: string, id: number): Promise<boolean> => {
  const url = api.DeleteClassUrl(gradeId, id);
  const res: ResponseType<{ data: string }> = await request.post(url);

  return res.ok;
};

export const UpdateStudentAction = async (
  values: StudentFormType,
  gradeId: string,
  id?: number
): Promise<boolean> => {
  const url = id ? api.UpdateStudentUrl(gradeId, id) : api.CreateStudentUrl(gradeId);
  const body = { ...values, classroom_id: values.classroom?.value };
  const res: ResponseType<{ data: string }> = await request.post(url, body);

  return res.ok;
};

export const DeleteStudentAction = async (gradeId: string, id: number): Promise<boolean> => {
  const url = api.DeleteStudentUrl(gradeId, id);
  const res: ResponseType<{ data: string }> = await request.post(url);

  return res.ok;
};

export const UpdateTeacherAction = async (
  values: TeacherFormType,
  gradeId: string,
  id?: number
): Promise<boolean> => {
  const url = id ? api.UpdateTeacherUrl(gradeId, id) : api.CreateTeacherUrl(gradeId);
  const body = { ...values };
  const res: ResponseType<{ data: string }> = await request.post(url, body);

  return res.ok;
};

export const DeleteTeacherAction = async (gradeId: string, id: number): Promise<boolean> => {
  const url = api.DeleteTeacherUrl(gradeId, id);
  const res: ResponseType<{ data: string }> = await request.post(url);

  return res.ok;
};

export const UpdateAssignmentAction = async (
  values: AssignFormType,
  gradeId: string
): Promise<boolean> => {
  const url = api.UpdateCourseUrl(gradeId);
  const list = values.assignments.map((k) => ({
    classroom_id: k.class?.value,
    course_id: k.course?.value,
    teacher_id: k.teacher?.value,
  }));
  const res: ResponseType<{ data: string }> = await request.post(url, { list });

  return res.ok;
};

export const UpdateExamAction = async (
  values: CreateExamFormType,
  gradeId: string,
  id?: number
): Promise<boolean> => {
  const url = id ? api.UpdateExamUrl(gradeId, id) : api.CreateExamUrl(gradeId);
  const body = {
    ...values,
    classroom_id: values.classroom?.value,
    course_id: values.course?.value,
    contents: values.contents.map((k) => k.value),
    students: values.students.map((k) => ({ student_id: k.name?.value, score: k.score })),
  };
  const res: ResponseType<{ data: string }> = await request.post(url, body);

  return res.ok;
};

export const DeleteExamAction = async (gradeId: string, id: number): Promise<boolean> => {
  const url = api.DeleteExamUrl(gradeId, id);
  const res: ResponseType<{ data: string }> = await request.post(url);

  return res.ok;
};

export const DownloadExamExcelAction = async (
  gradeId: string,
  id: number,
  name: string
): Promise<boolean> => {
  const url = api.ExamExcelUrl(gradeId, id);
  const res: ResponseType<BlobPart> = await request.get(url, undefined, { responseType: 'blob' });

  if (res.ok) saveAs(res.data, name);

  return res.ok;
};

export const GetReportAction = async (
  gradeId: string,
  filters: object,
  isCard?: boolean
): Promise<ReportCardType[] | undefined> => {
  const url = isCard ? api.CardUrl(gradeId) : api.ProgressUrl(gradeId);
  const res: ResponseType<{ data: ReportCardType[] | ReportCardType }> = await request.get(
    url,
    filters
  );

  const result = res.data?.data;

  if (!result) return undefined;
  return Array.isArray(result)
    ? result.sort((a, b) => (a.lastName || '').localeCompare(b.lastName || '', 'fa'))
    : [result];
};

export const CreateHomeworkAction = async (
  values: CreateHomeworkFormType,
  gradeId: string,
  homeworkId?: number
): Promise<boolean> => {
  const url = homeworkId
    ? api.UpdateHomeworkUrl(gradeId, homeworkId)
    : api.CreateHomeworkUrl(gradeId);
  const formData = new FormData();

  formData.append('title', values.title);
  formData.append('course_id', JSON.stringify(values.course?.value));
  formData.append('expected', JSON.stringify(Number(values.expected)));
  formData.append('score', JSON.stringify(Number(values.totalScore)));
  formData.append('date', values.date);
  formData.append('link', values.link);
  formData.append('description', values.description);
  values.voiceBlob && formData.append('voices[0]', values.voiceBlob, 'recording.webm');
  values.files.forEach((file, index) => {
    formData.append(`files[${index}]`, file);
  });
  values.classrooms.forEach((item) => {
    formData.append(`classrooms[]`, JSON.stringify(item.value));
  });

  const res: ResponseType<{ mistakes: object }> = await request.post(url, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return res.ok;
};

export const SendHomeworkAction = async (
  values: { note: string; pdf: File; homeworkId: string | string[] },
  gradeId: string,
  homeworkId?: number
): Promise<boolean> => {
  const url = api.SendHomeworkUrl(gradeId, homeworkId);

  const formData = new FormData();
  formData.append('note', values.note);
  formData.append('pdf', values.pdf[0]);
  formData.append('homework_id', values.homeworkId.toString());

  const res: ResponseType<{ mistakes: object }> = await request.post(url, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return res.ok;
};

export const ScoreHomeworkAction = async (
  score: string,
  gradeId: string,
  id: number
): Promise<boolean> => {
  const url = api.ScoreHomeworkUrl(gradeId, id);

  const res: ResponseType<{ mistakes: object }> = await request.post(url, { score });
  return res.ok;
};

export const ScoreZeroAction = async (gradeId: string, id: number): Promise<boolean> => {
  const url = api.ScoreZeroUrl(gradeId, id);

  const res: ResponseType<{ mistakes: object }> = await request.post(url);
  return res.ok;
};

export const ScoreFinalAction = async (gradeId: string, id: number): Promise<boolean> => {
  const url = api.ScoreFinalUrl(gradeId, id);

  const res: ResponseType<{ mistakes: object }> = await request.post(url);
  return res.ok;
};

export const DeleteHomeworkAction = async (gradeId: string, id: number): Promise<boolean> => {
  const url = api.DeleteHomeworkUrl(gradeId, id);
  const res: ResponseType<{ data: string }> = await request.post(url);
  return res.ok;
};

export const DownloadCardExcelAction = async (
  gradeId: string,
  body: object,
  name: string
): Promise<boolean> => {
  const url = api.CardExcelUrl(gradeId);
  const res: ResponseType<BlobPart> = await request.get(url, body, { responseType: 'blob' });

  if (res.ok) saveAs(res.data, name);

  return res.ok;
};

export const UpdateBellsAction = async (
  values: BellsFormType,
  gradeId: string,
  isCreate: boolean
): Promise<BellsType[] | boolean> => {
  const url = isCreate ? api.CreateBellUrl(gradeId) : api.UpdateBellUrl(gradeId);
  const list = values.bells.map((key, index) => ({ ...key, order: index + 1 }));
  const res: ResponseType<{ data: BellsType[] }> = await request.post(url, { list });

  return res.ok;
};

export const DeleteBellsAction = async (
  id: number,
  gradeId: string
): Promise<BellsType[] | boolean> => {
  const url = api.DeleteBellUrl(gradeId, id);
  const res: ResponseType<{ data: BellsType[] }> = await request.post(url);
  return res.data?.data || res.ok;
};

export const UpdateScheduleAction = async (
  values: ScheduleFormType,
  gradeId: string,
  classId: number
): Promise<boolean> => {
  const url = api.CreateScheduleUrl(gradeId, classId);
  const res: ResponseType<{ data: string }> = await request.post(url, values);

  return res.ok;
};

export const CreateCourseAction = async (name: string, gradeId: string): Promise<boolean> => {
  const url = api.CreateCourseUrl(gradeId);
  const res: ResponseType<{ data: string }> = await request.post(url, { name });

  return res.ok;
};

export const DeleteCourseAction = async (id: number, gradeId: string): Promise<boolean> => {
  const url = api.DeleteCourseUrl(gradeId, id);
  const res: ResponseType<{ data: string }> = await request.post(url);

  return res.ok;
};

export const PostAbsentsAction = async (
  values: { list: AbsentsListType[]; bellId: string; classId: string; date: string },
  gradeId: string
): Promise<boolean> => {
  const url = api.PostAbsentsUrl(gradeId);
  const body = {
    date: values.date,
    bell_id: values.bellId,
    classroom_id: values.classId,
    students: values.list.filter((k) => k.isAbsent).map((k) => k.id),
  };
  const res: ResponseType<{ data: string }> = await request.post(url, body);

  return res.ok;
};

export const GetAbsentsReport = async (
  id: string,
  body: object
): Promise<AbsentsReportType[] | undefined> => {
  const res: ResponseType<{ data: AbsentsReportType[] }> = await request.get(
    api.AbsentsReportsUrl(id),
    body
  );

  return res.data?.data;
};

export const JustifyAbsentAction = async (id: string, body: object): Promise<boolean> => {
  const res: ResponseType<{ data: string }> = await request.post(api.JustifyAbsentsUrl(id), body);

  return res.ok;
};

export const DownloadAbsentExcelAction = async (
  gradeId: string,
  body: object,
  name: string
): Promise<boolean> => {
  const url = api.AbsentsReportsExcelUrl(gradeId);
  const res: ResponseType<BlobPart> = await request.get(url, body, { responseType: 'blob' });

  if (res.ok) saveAs(res.data, name);

  return res.ok;
};

export const ReadMessageAction = async (gradeId: string, id: number): Promise<boolean> => {
  const url = api.MarkAsReadUrl(gradeId, id);
  const res: ResponseType<{ data: string }> = await request.post(url);

  return res.ok;
};

export const SendMessageAction = async (
  values: SendMessageFormType,
  gradeId: string
): Promise<boolean> => {
  const { parents, students, assistant, teachers, subject, body } = values;
  const recipients = [
    ...(parents || []),
    ...(students || []),
    ...(assistant || []),
    ...(teachers || []),
  ];
  const url = api.SendMessageUrl(gradeId);
  const data = { subject, body, recipients };
  const res: ResponseType<{ data: string }> = await request.post(url, data);

  return res.ok;
};

export const UpdatePlanAction = async (
  title: string,
  classroom_id: number,
  plan: PlanDataType[],
  gradeId: string,
  planId: string
): Promise<boolean> => {
  const url = planId === 'new' ? api.CreatePlanUrl(gradeId) : api.UpdatePlanUrl(gradeId, planId);
  const res: ResponseType<{ data: string }> = await request.post(url, {
    title,
    plan,
    classroom_id,
  });

  return res.ok;
};

export const UpdatePlanListAction = async (
  data: PlansType[],
  gradeId: string
): Promise<boolean> => {
  const url = api.AssignPlansUrl(gradeId);
  const res: ResponseType<{ data: string }> = await request.post(url, { data });

  return res.ok;
};

export const CreateStudyAction = async (
  data: StudyType,
  gradeId: string,
  studentId: string
): Promise<boolean> => {
  const url = api.CreateStudyUrl(gradeId, studentId);
  const res: ResponseType<{ data: string }> = await request.post(url, data);

  return res.ok;
};

export const DeleteStudyAction = async (id: number, gradeId: string): Promise<boolean> => {
  const url = api.DeleteStudyUrl(gradeId, id);
  const res: ResponseType<{ data: string }> = await request.post(url);

  return res.ok;
};

export const UploadFileAction = async (
  gradeId: string,
  file?: File
): Promise<{ ok: boolean; data?: { mistakes: object } }> => {
  if (!file) return { ok: false };
  const url = api.ImportStudentUrl(gradeId);
  const formData = new FormData();
  formData.append('file', file);
  const res: ResponseType<{ mistakes: object }> = await request.post(url, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return res;
};
