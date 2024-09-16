import { ApiResponse } from 'apisauce';

export type ResponseType<DataType> = ApiResponse<DataType | undefined>;

export type PageType = {
  params: { [key: string]: string };
  searchParams?: { [key: string]: string | undefined };
};

export type SelectOptionType = { value: string | number; label: string };
export type GradeType = { id: number; title: string };
export type FieldsType = { id: number; title: string };

export type ClassroomType = {
  id: number;
  title: string;
  number: number;
  floor: number;
  user_grade_id: number;
  field_id: number;
  field: string;
};

export type StudentType = {
  id: number;
  firstName: string;
  lastName: string;
  classroom: string;
  nationalId: number;
  classroom_id: number;
  birthday: string;
  isOnlyChild: boolean;
  address: string;
  phone: number;
  socialMediaID: string;
  numberOfGlasses: string;
  isLeftHand: boolean;
  religion: string;
  specialDisease: string;
};

export type StudentFormType = {
  firstName: string;
  lastName: string;
  fatherPhone: string;
  motherPhone: string;
  nationalId: number;
  phone: number;
  birthday: string;
  socialMediaID: string;
  religion: string;
  specialDisease: string;
  address: string;
  classroom: { label: string; value: number };
};

export type TeacherType = {
  id: number;
  firstName: string;
  lastName: string;
  nationalId: number;
  name: string;
  degree: string;
  personalId: number;
  user_grade_id: number;
};
