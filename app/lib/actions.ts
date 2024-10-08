import {
  AbsentsListType,
  AssignFormType,
  BellsFormType,
  BellsType,
  ClassFormType,
  CreateExamFormType,
  FieldsType,
  GradeFormType,
  GradeType,
  PlanDataType,
  PlansType,
  ResponseType,
  ScheduleFormType,
  SendMessageFormType,
  StudentFormType,
  StudyType,
  TeacherFormType,
} from 'app/types/common.type';
import request from './request';
import * as api from './urls';

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
  plan: PlanDataType[],
  gradeId: string,
  planId: string
): Promise<boolean> => {
  const url = planId === 'new' ? api.CreatePlanUrl(gradeId) : api.UpdatePlanUrl(gradeId, planId);
  const res: ResponseType<{ data: string }> = await request.post(url, { title, plan });

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
