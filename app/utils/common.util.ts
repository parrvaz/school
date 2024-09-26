import { DayValue } from '@hassanmojab/react-modern-calendar-datepicker';
import Cookies from 'js-cookie';
import jalaali from 'jalaali-js';
import { ValueFormatterParams } from 'ag-grid-community';
import fa from 'app/lib/fa.json';
import {
  AssignFormType,
  AssignType,
  BellsType,
  ClassroomType,
  CourseType,
  EventPlanType,
  PlanDataType,
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

export const convertToJalali = (value: string): string => {
  const [year, month, day] = value.split('/').map(Number);

  // Convert Gregorian date to Jalali
  const { jy, jm, jd } = jalaali.toJalaali(year, month, day);
  return `${jy}/${jm}/${jd}`;
};

export const convertToGregorian = (jalaliDate: string): string => {
  const [jy, jm, jd] = jalaliDate.split('/').map(Number);

  // Convert Jalali date to Gregorian
  const { gy, gm, gd } = jalaali.toGregorian(jy, jm, jd);

  return `${gy}/${gm.toString().padStart(2, '0')}/${gd.toString().padStart(2, '0')}`;
};

export const convertToDayValue = (value: string): DayValue => {
  if (!value) return null;
  const date = value.split('/');
  return { year: Number(date[0]), month: Number(date[1]), day: Number(date[2]) };
};

export const getNestedError = (errors: any, name: string): { message: string } => {
  const path = name.split('.');
  return path.reduce((acc, key) => (acc ? acc[key] : undefined), errors);
};

export const getTody = (notPersian = false, week = false): string => {
  const today = new Date();
  const jalaliDate = jalaali.toJalaali(today);
  const daysOfWeek = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
  const dayName = daysOfWeek[today.getDay()];

  return week
    ? dayName
    : notPersian
      ? today.toISOString().slice(0, 10).replace(/-/g, '/')
      : convertJalaliToDate(jalaliDate);
};

export const dateToHour = (dateStr: string): string => {
  const date = new Date(dateStr);

  // Get hours and minutes
  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');

  // Format to "H:MM"
  return faNumber(`${hours}:${minutes}`);
};

export const dashFormatter = (params: ValueFormatterParams): string => params.value || '-';

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

export const convertArrayToSchedule = (arr: BellsType[]): ScheduleType => {
  const schedule: ScheduleType = {};

  arr.forEach((item) => {
    schedule[item.order || 0] = { sat: '', sun: '', mon: '', tue: '', wed: '', thu: '', fri: '' };
  });

  return schedule;
};

export const mapFormData = (formData: ScheduleFormType['schedule']): object[] => {
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

export const formatDateToDayTime = (
  startTime: Date,
  endTime: Date,
  title: string,
  course_id: number
): PlanDataType => {
  const days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

  // Get the day from the startTime
  const day = days[startTime?.getDay()];

  // Format hours and minutes
  const formatTime = (date: Date): string => {
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  return {
    course_id,
    title,
    day,
    start: formatTime(startTime),
    end: formatTime(endTime),
  };
};

export const formatEventData = (events: EventPlanType[]): PlanDataType[] => {
  return events.map((event) => {
    const { start, end, title, course_id } = event;
    return formatDateToDayTime(start, end, title, course_id);
  });
};

export const revertToDateTimes = (data: PlanDataType): EventPlanType => {
  const daysOfWeek = ['sat', 'sun', 'mon', 'tue', 'wed', 'thu', 'fri']; // Week starts on Saturday

  // Get the current date
  const today = new Date();

  // Find the index of the day from the input
  const dayIndex = daysOfWeek.indexOf(data.day);

  // Calculate how many days to subtract to get to the last Saturday
  const currentDayIndex = today.getDay(); // 0 is Sunday, 6 is Saturday
  const daysUntilLastSaturday = (currentDayIndex + 1) % 7; // Adjusting to match our week starting from Saturday

  // Calculate the start of the week (Saturday)
  const startOfWeek = new Date(today.setDate(today.getDate() - daysUntilLastSaturday + dayIndex));

  // Extract start time and end time from the input data
  const [startHours, startMinutes] = data.start.split(':').map(Number);
  const [endHours, endMinutes] = data.end.split(':').map(Number);

  // Create startTime and endTime based on the startOfWeek
  const startTime = new Date(startOfWeek);
  startTime.setHours(startHours, startMinutes, 0, 0); // Set hours and minutes

  const endTime = new Date(startOfWeek);
  endTime.setHours(endHours, endMinutes, 0, 0); // Set hours and minutes

  return { start: startTime, end: endTime, title: data.title, course_id: data.course_id };
};

export const revertEventData = (events: PlanDataType[]): EventPlanType[] => {
  return events.map((event) => {
    const { title, day, start, end, course_id } = event;
    return revertToDateTimes({ day, start, end, title, course_id });
  });
};
