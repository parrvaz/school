import {
  AbsentsListType,
  AssignFormType,
  BellsFormType,
  ClassFormType,
  CreateExamFormType,
  FieldsType,
  ResponseType,
  ScheduleFormType,
  StudentFormType,
  TeacherFormType,
} from 'app/types/common.type';
import request from './request';
import {
  CreateBellUrl,
  CreateClassUrl,
  CreateExamUrl,
  CreateScheduleUrl,
  CreateStudentUrl,
  CreateTeacherUrl,
  DeleteClassUrl,
  DeleteExamUrl,
  DeleteStudentUrl,
  DeleteTeacherUrl,
  FieldsUrl,
  UpdateBellUrl,
  UpdateClassUrl,
  UpdateCourseUrl,
  UpdateExamUrl,
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
): Promise<boolean> => {
  const url = isCreate ? CreateBellUrl(gradeId) : UpdateBellUrl(gradeId);
  const list = values.bells.map((key, index) => ({ ...key, order: index + 1 }));
  const res: ResponseType<{ data: string }> = await request.post(url, { list });
  return res.ok;
};

export const UpdateScheduleAction = async (
  values: ScheduleFormType,
  gradeId: string,
  classId: number
): Promise<boolean> => {
  const url = CreateScheduleUrl(gradeId, classId);
  console.log('action', values);
  // const res: ResponseType<{ data: string }> = await request.post(url, values);

  return true;
  // return res.ok;
};

export const PostAbsentsAction = async (
  values: AbsentsListType[],
  gradeId: string
): Promise<boolean> => {
  // const url = CreateScheduleUrl(gradeId, classId);
  const body = values.filter((k) => k.isAbsent).map((k) => k.student_id);
  console.log('action', body, gradeId);
  // const res: ResponseType<{ data: string }> = await request.post(url, values);

  return true;
  // return res.ok;
};
