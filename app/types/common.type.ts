import { ApiResponse } from 'apisauce';
import { SingleValue } from 'react-select';

export type ResponseType<DataType> = ApiResponse<DataType | undefined>;

export type PageType = {
  params: { [key: string]: string };
  searchParams?: { [key: string]: string | undefined };
};

export type SelectOptionType = { value: string | number; label: string };
export type SingleOptionType = SingleValue<SelectOptionType>;
export type GradeType = { code: string; title: string; grade_id: number };
export type FieldsType = { id: number; title: string };
export type GradeFormType = { title: string; grade: { label: string; value: number } };
export type GroupDateType = { startDate?: string; endDate?: string };

export type UserType = {
  id: number;
  name: string;
  phone: string;
  email: string;
  is_admin: boolean;
  role: string;
  role_id: number;
  schools: { data: [] };
};

export type ClassroomType = {
  id: number;
  title: string;
  number: number;
  floor: number;
  user_grade_id: number;
  field_id: number;
  field: string;
};

export type ClassOptionType = { value: number; label: string; fieldId: number };

export type ClassFormType = {
  title: string;
  field: { label: string; value: number } | null;
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
  user_id: number;
  parent_id: number;
  socialMediaID: string;
  numberOfGlasses: string;
  isLeftHand: boolean;
  religion: string;
  specialDisease: string;
  planName: string;
  plan_id: number;
  planDate: string;
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
  classroom: { label: string; value: number } | null;
};

export type TeacherType = {
  id: number;
  user_id: number;
  firstName: string;
  lastName: string;
  nationalId: number;
  name: string;
  degree: string;
  personalId: number;
  user_grade_id: number;
  isAssistant: boolean;
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
  id: number;
  field_id: number;
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
    class: { value: number; label: string; fieldId: number } | null;
    course: { value: number; label: string } | null;
    teacher: { value: number; label: string } | null;
  }[];
};

export type ScoreType = {
  score: number;
  date: string;
  course_id: number;
  course: string;
  expected: number;
  totalScore: number;
  type: { id: number; label: string };
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
  classroom: { value: number; label: string; fieldId: number } | null;
  expected: number;
  totalScore: number | null;
  type: number;
  isFinal: boolean;
  isGeneral: boolean;
  students: {
    name: { value: number; label: string } | null;
    score: number | null;
  }[];
};

export type ReportCardType = {
  average: number;
  scores: { course_id: number; course: string; factor: number; score: number }[];
};

export type TreeNodeType = {
  value: string;
  label: string;
  children?: TreeNodeType[];
};

export type BellsType = {
  startTime: string;
  endTime: string;
  order?: number;
  bellId?: number;
  id?: number;
};
export type WeekType = {
  order?: number;
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

export type AbsentsType = {
  classroom_id: number;
  classroom: string;
  count: number;
  students: {
    student_id: number;
    student: string;
    fatherPhone: string;
    bells: Record<number, { status: string; reporter: string }>;
  }[];
};

export type AbsentsListType = { id: number; name: string; isAbsent: boolean };

export type MessagesType = {
  id: number;
  sender_id: number;
  sender: string;
  subject: string;
  body: string;
  isRead: boolean;
};

export type SendMessageFormType = {
  type: { value: number; label: string };
  subject: string;
  body: string;
  roll: { value: number; label: string }[];
  students: { value: number; label: string }[];
  parents: { value: number; label: string }[];
  teachers: { value: number; label: string }[];
  assistant: { value: number; label: string }[];
};

export type EventPlanType = {
  title: string;
  date?: string;
  start: Date;
  end: Date;
  course_id: number;
  isFix?: boolean;
  id?: number;
};
export type PlanDataType = {
  day: string;
  start: string;
  end: string;
  title: string;
  course_id: number;
  isFix?: boolean;
};
export type PlanPageType = {
  title: string;
  id: number;
  field_id: number;
  classroom_id: number;
  plan: PlanDataType[];
};
export type PlansType = {
  id: number;
  classroom_id?: number;
  classroom?: string;
  title: string;
  isDuplicate?: boolean;
  students?: StudentType[];
};

export type StudyType = {
  date: string;
  title: string;
  course_id: number;
  isFix?: boolean;
};

export type StudyPageType = {
  title: string;
  id: number;
  field: string;
  field_id: number;
  plan: StudyType[];
};
