import Cookies from 'js-cookie';
import fa from 'app/lib/fa.json';
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
  Cookies.set('token', data, { expires: 999 });

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
