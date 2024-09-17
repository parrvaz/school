import { DayValue } from '@hassanmojab/react-modern-calendar-datepicker';
import Cookies from 'js-cookie';
import fa from 'app/lib/fa.json';
import {
  AssignFormType,
  AssignType,
  ClassroomType,
  CourseType,
  TeacherType,
} from 'app/types/common.type';

export const justNumber = { value: /^[0-9]+$/, message: fa.global.rules.justNumber };
export const numberValidation = (otherRules?: object): object => ({
  required: true,
  pattern: justNumber,
  ...otherRules,
});

export const faNumber = (value: string | number): string => {
  if (value === null || value === undefined) return '';

  const toFaDict = {
    '0': '۰',
    '1': '۱',
    '2': '۲',
    '3': '۳',
    '4': '۴',
    '5': '۵',
    '6': '۶',
    '7': '۷',
    '8': '۸',
    '9': '۹',
  } as Record<string, string>;
  const letters = value.toString().split('');
  const arr = letters.map((item) => (item in toFaDict ? toFaDict[item] : item));
  return arr.join('');
};

export const localNumber = (number: number): string => faNumber(number.toLocaleString());

export const minLengthMessage = (length: number): string =>
  `${fa.account.minLength1} ${length} ${fa.account.minLength2}`;

export const maxLengthMessage = (length: number): string =>
  `${fa.account.maxLength1} ${length} ${fa.account.minLength2}`;

export const setCookie = (data = ''): string | undefined =>
  Cookies.set('token', `Bearer ${data}`, { expires: 999 });

export const kebabCase = (input: string): string =>
  input
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();

export const camelCase = (input: string): string =>
  input?.trim() &&
  (input.slice(0, 1).toLowerCase() + input.slice(1))
    .replace(/([-_ ]){1,}/g, ' ')
    .split(/[-_ ]/)
    .reduce((cur, acc) => cur + acc[0].toUpperCase() + acc.substring(1));

export const convertToDate = (value: DayValue): string =>
  `${value?.year}/${value?.month}/${value?.day}`;

export const convertToDayValue = (value: string): DayValue => {
  if (!value) return null;
  const date = value.split('/');
  return { year: Number(date[0]), month: Number(date[1]), day: Number(date[2]) };
};

export const getNestedError = (errors: any, name: string): { message: string } => {
  const path = name.split('.');
  return path.reduce((acc, key) => (acc ? acc[key] : undefined), errors);
};

export const normalizeAssignData = (
  data: AssignType[],
  courses: CourseType[],
  teachers: TeacherType[],
  classrooms: ClassroomType[]
): AssignFormType => {
  return {
    assignments: data.map((assign) => {
      const course = courses.find((c) => c.id === assign.course_id);
      const teacher = teachers.find((t) => t.id === assign.teacher_id);
      const classroom = classrooms.find((cl) => cl.id === assign.classroom_id);

      return {
        class: { value: classroom?.id || 0, label: classroom?.title || '' },
        course: { value: course?.id || 0, label: course?.name || '' },
        teacher: { value: teacher?.id || 0, label: teacher?.name || '' },
      };
    }),
  };
};
