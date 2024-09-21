import { ApiResponse } from 'apisauce';

export type ResponseType<DataType> = ApiResponse<DataType | undefined>;

export type PageType = {
  params: { [key: string]: string };
  searchParams?: { [key: string]: string | undefined };
};

export type SelectOptionType = { value: string | number; label: string };
export type GradeType = { code: string; title: string; grade_id: number };
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

export type ClassFormType = {
  title: string;
  field: { label: string; value: number };
  floor: number;
  number: string;
};

export type StudentType = {
  id: number;
  firstName: string;
  lastName: string;
  name: string;
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

export type TeacherFormType = {
  firstName: string;
  lastName: string;
  nationalId: number;
  phone: number;
  personalID: string;
  degree: string;
  isAssistant: boolean;
};

export type ContentType = {
  id: number;
  course_id: number;
  season: string;
  content: string;
  pageStart: number;
  pageEnd: number;
  priority: number;
};

export type CourseType = {
  contents?: ContentType[];
  id: number | null;
  name: string;
  isUser?: boolean;
};

export type AssignType = {
  id: number;
  classroom_id: number;
  course_id: number;
  teacher_id: number;
};

export type AssignFormType = {
  assignments: {
    class: { value: number; label: string } | null;
    course: { value: number; label: string } | null;
    teacher: { value: number; label: string } | null;
  }[];
};

export type ExamType = {
  date: string;
  contents: ContentType[];
  course_id: number;
  classroom_id: number;
  expected: number;
  totalScore: number;
  type: { id: number; label: string };
  isFinal: boolean;
  isGeneral: boolean;
  id: number;
  classroom: string;
  course: string;
  students: {
    id: number;
    student_id: number;
    name: string;
    score: number;
  }[];
};

export type CreateExamFormType = {
  date: string;
  contents: { value: number; label: string }[];
  course: { value: number; label: string } | null;
  classroom: { value: number; label: string } | null;
  expected: number;
  totalScore: number;
  type: number;
  isFinal: boolean;
  isGeneral: boolean;
  students: {
    name: { value: number; label: string } | null;
    score: number | null;
  }[];
};

export type BellsType = {
  startTime: string;
  endTime: string;
  order?: number;
  bellId?: number;
  id?: number;
};
export type WeekType = {
  sat: string;
  sun: string;
  mon: string;
  tue: string;
  wed: string;
  thu: string;
  fri: string;
};
export type BellsFormType = { bells: BellsType[] };
export type ScheduleType = { [key: string]: WeekType };
export type ScheduleDataType = { classroom: string; classroom_id: number; schedule: ScheduleType };

export type ScheduleFormType = {
  schedule: {
    [time: string]: {
      [day: string]: string | number | null;
    };
  };
};

export type AbsentsListType = { id: number; name: string; isAbsent: boolean };
