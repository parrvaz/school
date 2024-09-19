import {
  AssignFormType,
  ClassFormType,
  CreateExamFormType,
  FieldsType,
  ResponseType,
  StudentFormType,
  TeacherFormType,
} from 'app/types/common.type';
import request from './request';
import {
  CreateClassUrl,
  CreateExamUrl,
  CreateStudentUrl,
  CreateTeacherUrl,
  DeleteClassUrl,
  DeleteStudentUrl,
  DeleteTeacherUrl,
  FieldsUrl,
  UpdateClassUrl,
  UpdateCourseUrl,
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
  const body = { ...values, field_id: values.field.value };
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

export const CreateExamAction = async (
  values: CreateExamFormType,
  gradeId: string
): Promise<boolean> => {
  const url = CreateExamUrl(gradeId);
  const body = {
    ...values,
    classroom_id: values.classroom?.value,
    course_id: values.course?.value,
    students: values.students.map((k) => ({ student_id: k.name?.value, score: k.score })),
  };
  const res: ResponseType<{ data: string }> = await request.post(url, body);

  return res.ok;
};
