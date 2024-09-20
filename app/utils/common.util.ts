import { DayValue } from '@hassanmojab/react-modern-calendar-datepicker';
import Cookies from 'js-cookie';
import jalaali from 'jalaali-js';
import fa from 'app/lib/fa.json';
import {
  AssignFormType,
  AssignType,
  ClassroomType,
  CourseType,
  ScheduleFormType,
  ScheduleType,
  TeacherType,
} from 'app/types/common.type';

export const numberValidation = (otherRules?: object): object => ({
  required: true,
  pattern: { value: /^[0-9]+$/, message: fa.global.rules.justNumber },
  ...otherRules,
});

export const valueValidation = (min?: number | null, max?: number | null): object => {
  const result: Record<string, object> = {};
  const minMessage = `${fa.global.rules.minValue} ${min} ${fa.global.rules.minValue2}`;
  const maxMessage = `${fa.global.rules.maxValue} ${max} ${fa.global.rules.minValue2}`;

  if (typeof min === 'number') result.min = { value: min, message: minMessage };
  if (typeof max === 'number') result.max = { value: max, message: maxMessage };

  return result;
};

export const faNumber = (value: string | number, enNumber = false): string => {
  if (value === null || value === undefined) return '';

  const toFaDict: Record<string, string> = {
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
  };

  const toEnDict: Record<string, string> = {
    '۰': '0',
    '۱': '1',
    '۲': '2',
    '۳': '3',
    '۴': '4',
    '۵': '5',
    '۶': '6',
    '۷': '7',
    '۸': '8',
    '۹': '9',
  };

  const letters = value.toString().split('');
  const arr = letters.map((item) =>
    enNumber ? (item in toEnDict ? toEnDict[item] : item) : item in toFaDict ? toFaDict[item] : item
  );

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

export const convertJalaliToDate = (value: { jy: number; jm: number; jd: number }): string =>
  `${value?.jy}/${value?.jm}/${value?.jd}`;

export const convertToDayValue = (value: string): DayValue => {
  if (!value) return null;
  const date = value.split('/');
  return { year: Number(date[0]), month: Number(date[1]), day: Number(date[2]) };
};

export const getNestedError = (errors: any, name: string): { message: string } => {
  const path = name.split('.');
  return path.reduce((acc, key) => (acc ? acc[key] : undefined), errors);
};

export const getTody = (): string => {
  const today = new Date();
  const jalaliDate = jalaali.toJalaali(today);
  return convertJalaliToDate(jalaliDate);
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

export const getOption = (
  data: { id: number; name?: string; title?: string }[],
  key?: 'name' | 'title'
): { value: number; label: string }[] =>
  data.map((item) => ({ value: item.id, label: item[key || 'name'] ?? '' }));

export const convertArrayToSchedule = (arr: { order: number }[]): ScheduleType => {
  const schedule: ScheduleType = {};

  arr.forEach((item) => {
    schedule[item.order] = { sat: '', sun: '', mon: '', tue: '', wed: '', thu: '' };
  });

  return schedule;
};

export const mapFormData = (formData: ScheduleFormType['schedule']) => {
  return Object.keys(formData).map((order) => ({
    order,
    sat: formData[order]?.sat || '',
    sun: formData[order]?.sun || '',
    mon: formData[order]?.mon || '',
    tue: formData[order]?.tue || '',
    wed: formData[order]?.wed || '',
    thu: formData[order]?.thu || '',
  }));
};
