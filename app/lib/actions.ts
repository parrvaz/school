import {
  AbsentsListType,
  AssignFormType,
  BellsFormType,
  BellsType,
  ClassFormType,
  CreateExamFormType,
  FieldsType,
  PlanDataType,
  PlansType,
  ResponseType,
  ScheduleFormType,
  SendMessageFormType,
  StudentFormType,
  TeacherFormType,
} from 'app/types/common.type';
import request from './request';
import {
  AssignPlansUrl,
  CreateBellUrl,
  CreateClassUrl,
  CreateCourseUrl,
  CreateExamUrl,
  CreatePlanUrl,
  CreateScheduleUrl,
  CreateStudentUrl,
  CreateTeacherUrl,
  DeleteBellUrl,
  DeleteClassUrl,
  DeleteCourseUrl,
  DeleteExamUrl,
  DeleteStudentUrl,
  DeleteTeacherUrl,
  FieldsUrl,
  MarkAsReadUrl,
  PostAbsentsUrl,
  SendMessageUrl,
  UpdateBellUrl,
  UpdateClassUrl,
  UpdateCourseUrl,
  UpdateExamUrl,
  UpdatePlanUrl,
  UpdateStudentUrl,
  UpdateTeacherUrl,
} from './urls';

export const fieldsKey = (id: string): string[] => ['fields', id];
export const getFields = async (id: string): Promise<FieldsType[] | null> => {
  const res: ResponseType<{ data: FieldsType[] }> = await request.get(FieldsUrl(id));
  return res.data?.data || null;
};

export const UpdateClassAction = async (
  values: ClassFormType,
  gradeId: string,
  id?: number
): Promise<boolean> => {
  const url = id ? UpdateClassUrl(gradeId, id) : CreateClassUrl(gradeId);
  const body = { ...values, field_id: values.field.value, floor: values.floor.toString() };
  const res: ResponseType<{ data: string }> = await request.post(url, body);

  return res.ok;
};

export const DeleteClassAction = async (gradeId: string, id: number): Promise<boolean> => {
  const url = DeleteClassUrl(gradeId, id);
  const res: ResponseType<{ data: string }> = await request.post(url);

  return res.ok;
};

export const UpdateStudentAction = async (
  values: StudentFormType,
  gradeId: string,
  id?: number
): Promise<boolean> => {
  const url = id ? UpdateStudentUrl(gradeId, id) : CreateStudentUrl(gradeId);
  const body = { ...values, classroom_id: values.classroom.value };
  const res: ResponseType<{ data: string }> = await request.post(url, body);

  return res.ok;
};

export const DeleteStudentAction = async (gradeId: string, id: number): Promise<boolean> => {
  const url = DeleteStudentUrl(gradeId, id);
  const res: ResponseType<{ data: string }> = await request.post(url);

  return res.ok;
};

export const UpdateTeacherAction = async (
  values: TeacherFormType,
  gradeId: string,
  id?: number
): Promise<boolean> => {
  const url = id ? UpdateTeacherUrl(gradeId, id) : CreateTeacherUrl(gradeId);
  const body = { ...values };
  const res: ResponseType<{ data: string }> = await request.post(url, body);

  return res.ok;
};

export const DeleteTeacherAction = async (gradeId: string, id: number): Promise<boolean> => {
  const url = DeleteTeacherUrl(gradeId, id);
  const res: ResponseType<{ data: string }> = await request.post(url);

  return res.ok;
};

export const UpdateAssignmentAction = async (
  values: AssignFormType,
  gradeId: string
): Promise<boolean> => {
  const url = UpdateCourseUrl(gradeId);
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
  const url = id ? UpdateExamUrl(gradeId, id) : CreateExamUrl(gradeId);
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
  const url = DeleteExamUrl(gradeId, id);
  const res: ResponseType<{ data: string }> = await request.post(url);

  return res.ok;
};

export const UpdateBellsAction = async (
  values: BellsFormType,
  gradeId: string,
  isCreate: boolean
): Promise<BellsType[] | boolean> => {
  const url = isCreate ? CreateBellUrl(gradeId) : UpdateBellUrl(gradeId);
  const list = values.bells.map((key, index) => ({ ...key, order: index + 1 }));
  const res: ResponseType<{ data: BellsType[] }> = await request.post(url, { list });

  return res.data?.data || res.ok;
};

export const DeleteBellsAction = async (
  id: number,
  gradeId: string
): Promise<BellsType[] | boolean> => {
  const url = DeleteBellUrl(gradeId, id);
  const res: ResponseType<{ data: BellsType[] }> = await request.post(url);
  return res.data?.data || res.ok;
};

export const UpdateScheduleAction = async (
  values: ScheduleFormType,
  gradeId: string,
  classId: number
): Promise<boolean> => {
  const url = CreateScheduleUrl(gradeId, classId);
  const res: ResponseType<{ data: string }> = await request.post(url, values);

  return res.ok;
};

export const CreateCourseAction = async (name: string, gradeId: string): Promise<boolean> => {
  const url = CreateCourseUrl(gradeId);
  const res: ResponseType<{ data: string }> = await request.post(url, { name });

  return res.ok;
};

export const DeleteCourseAction = async (id: number, gradeId: string): Promise<boolean> => {
  const url = DeleteCourseUrl(gradeId, id);
  const res: ResponseType<{ data: string }> = await request.post(url);

  return res.ok;
};

export const PostAbsentsAction = async (
  values: { list: AbsentsListType[]; bellId: string; classId: string; date: string },
  gradeId: string
): Promise<boolean> => {
  const url = PostAbsentsUrl(gradeId);
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
  const url = MarkAsReadUrl(gradeId, id);
  const res: ResponseType<{ data: string }> = await request.post(url);

  return res.ok;
};

export const SendMessageAction = async (
  values: SendMessageFormType,
  gradeId: string
): Promise<boolean> => {
  const url = SendMessageUrl(gradeId);
  const body = { ...values, recipients: values.recipients.map((k) => k.value) };
  const res: ResponseType<{ data: string }> = await request.post(url, body);

  return res.ok;
};

export const UpdatePlanAction = async (
  title: string,
  plan: PlanDataType[],
  gradeId: string,
  planId: string
): Promise<boolean> => {
  const url = planId === 'new' ? CreatePlanUrl(gradeId) : UpdatePlanUrl(gradeId, planId);
  const res: ResponseType<{ data: string }> = await request.post(url, { title, plan });

  return res.ok;
};

export const UpdatePlanListAction = async (
  data: PlansType[],
  gradeId: string
): Promise<boolean> => {
  const url = AssignPlansUrl(gradeId);
  const res: ResponseType<{ data: string }> = await request.post(url, { data });

  return res.ok;
};
