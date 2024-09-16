import { FieldsType, ResponseType, StudentFormType } from 'app/types/common.type';
import request from './request';
import {
  CreateStudentUrl,
  DeleteStudentUrl,
  DeleteTeacherUrl,
  FieldsUrl,
  UpdateStudentUrl,
} from './urls';

export const fieldsKey = (id: string): string[] => ['fields', id];
export const getFields = async (id: number): Promise<FieldsType[] | null> => {
  const res: ResponseType<{ data: FieldsType[] }> = await request.get(FieldsUrl(id));
  return res.data?.data || null;
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
