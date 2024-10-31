import { DayValue, Day, utils } from '@hassanmojab/react-modern-calendar-datepicker';
import Cookies from 'js-cookie';
import jalaali from 'jalaali-js';
import { ValueFormatterParams } from 'ag-grid-community';
import fa from 'app/lib/fa.json';
import {
  AssignFormType,
  AssignType,
  BellsType,
  ClassOptionType,
  ClassroomType,
  CourseType,
  EventPlanType,
  GroupDateType,
  PlanDataType,
  PlansType,
  ScheduleFormType,
  ScheduleType,
  StudyType,
  TeacherType,
  TreeNodeType,
} from 'app/types/common.type';

export const ROLES = {
  manager: 'manager',
  assistant: 'assistant',
  teacher: 'teacher',
  student: 'student',
  parent: 'parent',
};

export const TYPE_OPTIONS = [
  { value: 1, label: fa.createExam.written },
  { value: 2, label: fa.createExam.oral },
  { value: 3, label: fa.createExam.test },
];

export const numberValidation = (otherRules?: object, allowDecimal?: boolean): object => ({
  required: true,
  pattern: {
    value: allowDecimal ? /^[0-9]*\.?[0-9]+$/ : /^[0-9]+$/,
    message: fa.global.rules.justNumber,
  },
  ...otherRules,
});

export const phoneValidation = (otherRules?: object): object => ({
  required: true,
  validate: {
    isNumeric: (value: string) => /^[0-9]+$/.test(value) || fa.global.rules.justNumber,
    startsWith09: (value: string) => /^09/.test(value) || fa.global.rules.startNine,
  },
  minLength: { value: 11, message: minLengthMessage(11) },
  maxLength: { value: 11, message: maxLengthMessage(11) },
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

export const roleAccess = (roles: string[], role = '', notInclude?: boolean): boolean =>
  notInclude ? !roles.includes(role) : roles.includes(role);

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

export const setCookie = (data = '', name?: string): string | undefined =>
  Cookies.set(name || 'token', name ? data : `Bearer ${data}`, { expires: 999 });

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

export const convertToDate = (value: DayValue): string => {
  if (!value) return '';
  const month = value?.month < 10 ? '0' + value?.month : value?.month;
  const day = value?.day < 10 ? '0' + value?.day : value?.day;
  return `${value?.year}/${month}/${day}`;
};

export const convertJalaliToDate = (value: { jy: number; jm: number; jd: number }): string => {
  if (!value) return '';
  const month = value?.jm < 10 ? '0' + value?.jm : value?.jm;
  const day = value?.jd < 10 ? '0' + value?.jd : value?.jd;
  return `${value?.jy}/${month}/${day}`;
};

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

export const convertToDayValue = (value?: string): DayValue => {
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
        class: {
          value: classroom?.id || 0,
          label: classroom?.title || '',
          fieldId: classroom?.field_id || 0,
        },
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
  data?.map((item) => ({ value: item.id, label: item[key || 'name'] ?? '' }));

export const getClassOption = (data: ClassroomType[]): ClassOptionType[] =>
  data?.map((item) => ({ value: item.id, label: item.title, fieldId: item.field_id }));

export const getCourses = (courses: CourseType[], targetField: number): CourseType[] =>
  courses.filter((k) => k.field_id === targetField || !k.field_id);

export const getCoursesOption = (
  courses: CourseType[],
  targetField: number
): { value: number; label: string }[] => {
  return getCourses(courses, targetField).map((k) => ({ value: k.id, label: k.name }));
};

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

export const formatDateToDayTime = (data: EventPlanType): PlanDataType => {
  const { start, end } = data;
  const days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
  const day = days[start?.getDay()];

  // Format hours and minutes
  const formatTime = (date: Date): string => {
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  return { ...data, day, start: formatTime(start), end: formatTime(end) };
};

export const formatEventData = (events: EventPlanType[]): PlanDataType[] =>
  events.map((event) => formatDateToDayTime(event));

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

  return { ...data, start: startTime, end: endTime };
};

export const getInitialGroupDate = (): GroupDateType => {
  const { getToday } = utils('fa');
  return { startDate: convertToDate(getFiscalYear(getToday())?.start), endDate: getTody() };
};

export const examTypeFormatter = (params: ValueFormatterParams): string =>
  fa.createExam[params.value.label as keyof typeof fa.createExam];

export const revertEventData = (events: PlanDataType[]): EventPlanType[] =>
  events.map((event) => revertToDateTimes(event));

export const handleDuplicatePlan = (
  data: PlansType[],
  setData: (plan: PlansType[]) => void,
  id: number,
  title: string
): void => {
  const targetIndex = data.findIndex((k) => k.id === id);
  const target = data[targetIndex];
  if (!target) return;

  const newPlan = { ...target, title, isDuplicate: true, students: [] };
  const updatedData = [...data];

  // Insert the new object at the specific index after the original
  updatedData.splice(targetIndex + 1, 0, newPlan);
  setData(updatedData);
};

const jalaliMonthNames = [
  'فروردین',
  'اردیبهشت',
  'خرداد',
  'تیر',
  'مرداد',
  'شهریور',
  'مهر',
  'آبان',
  'آذر',
  'دی',
  'بهمن',
  'اسفند',
];

export const convertToJalaliLabel = (date: Date, label: string): string => {
  // Use a regular expression to capture the month and the day range
  const regex = /^([A-Za-z]+)\s+(\d+)\s+–\s+([A-Za-z]+)?\s*(\d+)$/;
  const match = label.match(regex);

  if (!match) {
    throw new Error('Invalid label format');
  }

  // Extracting the necessary values from the match
  const startMonthName = match[1]; // First month (e.g., 'September')
  const startDay = match[2]; // Start day (e.g., '21')
  const endMonthName = match[3] || startMonthName; // End month (e.g., 'October' or the same as start)
  const endDay = match[4]; // End day (e.g., '04' or '27')

  // Get the current year from the provided date
  const year = date.getFullYear();

  // Create Date objects for the start and end days using the extracted month(s) and year
  const startDate = new Date(`${startMonthName} ${startDay}, ${year}`);
  const endDate = new Date(`${endMonthName} ${endDay}, ${year}`);

  // Convert both start and end dates to Jalali
  const jalaliStart = jalaali.toJalaali(startDate);
  const jalaliEnd = jalaali.toJalaali(endDate);

  // Get the Jalali month names
  const startMonth = jalaliMonthNames[jalaliStart.jm - 1];
  const endMonth = jalaliMonthNames[jalaliEnd.jm - 1];

  // If the months are the same, return a single month, else return both
  return startMonth === endMonth ? startMonth : `${startMonth} - ${endMonth}`;
};

export const formatJalaliDateTimeRange = (data: EventPlanType): StudyType => {
  const { start, end, course_id, title, isFix } = data;
  // Create Date objects from the ISO strings
  const startDate = new Date(start);
  const endDate = new Date(end);

  // Extract Jalali date components
  const jalaliStart = jalaali.toJalaali(startDate);

  // Format the Jalali date
  const formattedDate = convertJalaliToDate(jalaliStart);

  // Extract hours and minutes for start and end times
  const startHours = startDate.getHours();
  const startMinutes = startDate.getMinutes();
  const endHours = endDate.getHours();
  const endMinutes = endDate.getMinutes();
  // Format the times, ensuring two-digit minutes
  const formattedStartTime = `${startHours.toString().padStart(2, '0')}:${startMinutes.toString().padStart(2, '0')}`;
  const formattedEndTime = `${endHours.toString().padStart(2, '0')}:${endMinutes.toString().padStart(2, '0')}`;
  const date = `${formattedDate} ${formattedStartTime}-${formattedEndTime}`;

  // Combine date and time range
  return { course_id, title, isFix, date };
};

export const revertJalaliDateTimeRangeToDate = (data: StudyType): EventPlanType => {
  // Split the input string into date and time range
  const [jalaliDate, timeRange] = data.date.split(' ');
  const [startTime, endTime] = timeRange.split('-');

  // Extract Jalali year, month, and day from the date string
  const [jy, jm, jd] = jalaliDate.split('/').map(Number);

  // Convert Jalali date to Gregorian
  const gregorianDate = jalaali.toGregorian(jy, jm, jd);

  // Create Date objects for start and end times using local time
  const startDate = new Date(
    gregorianDate.gy,
    gregorianDate.gm - 1,
    gregorianDate.gd,
    ...startTime.split(':').map(Number)
  );

  const endDate = new Date(
    gregorianDate.gy,
    gregorianDate.gm - 1,
    gregorianDate.gd,
    ...endTime.split(':').map(Number)
  );

  // Return the Date objects
  return { ...data, start: startDate, end: endDate };
};

export const revertJalaliDateTime = (events: StudyType[]): EventPlanType[] =>
  events.map((event) => revertJalaliDateTimeRangeToDate(event));

export const getFiscalYear = (jalaliDate: Day): { start: Day; end: Day } | undefined => {
  if (!jalaliDate) return undefined;
  const day = jalaliDate?.day || 0;
  const month = jalaliDate?.month || 0;
  const year = jalaliDate?.year || 0;

  // Determine if the given date is after 4/1 of the given year
  const isAfterStartDate = month > 7 || (month === 7 && day >= 1);

  let startYear, endYear;

  if (isAfterStartDate) {
    startYear = year;
    endYear = year + 1;
  } else {
    startYear = year - 1;
    endYear = year;
  }

  return {
    start: { year: startYear, month: 7, day: 1 },
    end: { year: endYear, month: 6, day: 31 },
  };
};

export const getExamNodes = (exams): TreeNodeType[] => {
  // Create a mapping for type options by id for easier lookup
  const typeMap = new Map(TYPE_OPTIONS.map(({ value, label }) => [value, label]));

  // Create a nested structure
  const nodes = {};

  exams.forEach((exam) => {
    const { type, course, id } = exam;
    const date = faNumber(exam.date);
    // Ensure type node exists
    if (!nodes[type.id]) {
      nodes[type.id] = {
        label: typeMap.get(type.id),
        value: type.id.toString(),
        children: [],
      };
    }

    // Check if the course node exists
    let courseNode = nodes[type.id].children.find((child) => child.label === course);
    if (!courseNode) {
      courseNode = {
        label: course,
        value: `${course}${id}`, // Unique identifier
        children: [],
      };
      nodes[type.id].children.push(courseNode);
    }

    // Group exams by date
    const dateNode = courseNode.children.find((child) => child.label.includes(date));
    if (dateNode) {
      // Update the value array and recalculate the count for label
      const currentIds = dateNode.value.replace(/[\[\]]/g, '').split(',');
      currentIds.push(id.toString());
      dateNode.value = `${currentIds.join(',')}`;
      dateNode.label = `${date} (${faNumber(currentIds.length)} ${fa.global.exam})`;
    } else {
      // Create a new entry for the date with the exam id
      courseNode.children.push({
        value: `${id}`,
        label: `${date} (۱ ${fa.global.exam})`,
      });
    }
  });

  // Convert the nodes object into an array
  return Object.values(nodes);
};

export const getClassNodes = (activeClasses, students): TreeNodeType[] =>
  Array.from(
    activeClasses
      .reduce((map, exam) => {
        // Check if classroom_id already exists in map
        if (!map.has(exam.classroom_id)) {
          // Initialize classroom node with children filtered by classroom_id
          map.set(exam.classroom_id, {
            label: exam.classroom,
            value: exam.classroom_id.toString(),
            children: students
              .filter((student) => student.classroom_id === exam.classroom_id)
              .map((student) => ({
                label: student.name,
                value: student.id.toString(),
              })),
          });
        }
        return map;
      }, new Map())
      .values()
  );
