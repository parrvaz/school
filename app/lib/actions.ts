import { ClassFormType, FieldsType, ResponseType, StudentFormType } from 'app/types/common.type';
import request from './request';
import {
  CreateClassUrl,
  CreateStudentUrl,
  DeleteClassUrl,
  DeleteStudentUrl,
  DeleteTeacherUrl,
  FieldsUrl,
  UpdateClassUrl,
  UpdateStudentUrl,
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

export const DeleteTeacherAction = async (gradeId: string, id: number): Promise<boolean> => {
  const url = DeleteTeacherUrl(gradeId, id);
  const res: ResponseType<{ data: string }> = await request.post(url);

  return res.ok;
};
