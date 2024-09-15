import { ApiResponse } from 'apisauce';

export type ResponseType<DataType> = ApiResponse<DataType | undefined>;

export type PageType = {
  params: { [key: string]: string };
  searchParams?: { [key: string]: string | undefined };
};

export type SelectOptionType = { value: string | number; label: string };
export type GradeType = { id: number; title: string };

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
  nationalId: string;
  classroom_id: number;
  birthday: string;
  isOnlyChild: boolean;
  address: string;
  phone: string;
  socialMediaID: string;
  numberOfGlasses: string;
  isLeftHand: boolean;
  religion: string;
  specialDisease: string;
};
