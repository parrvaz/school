'use server';

import { notFound, redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { revalidateTag, revalidatePath } from 'next/cache';
import { baseURL } from './request';
import { LoginRoute } from './routes';

export const gradesTag = async (): Promise<string> => `grades`;
export const userTag = async (): Promise<string> => `user`;
export const fieldTag = async (): Promise<string> => `field`;
export const classroomTag = async (): Promise<string> => `classroom-show`;
export const studentTag = async (): Promise<string> => `student-show`;
export const teacherTag = async (): Promise<string> => `teacher-show`;
export const courseTag = async (): Promise<string> => `course-show`;
export const assignTag = async (): Promise<string> => `assign-show`;
export const examTag = async (): Promise<string> => `exam-show`;
export const homeworkTag = async (id?: string): Promise<string> => `homework-show-${id}`;
export const studentHomeworkTag = async (id?: string): Promise<string> =>
  `student-homework-show-${id}`;
export const bellTag = async (): Promise<string> => `bell-show`;
export const schedulesTag = async (): Promise<string> => `schedules-show`;
export const absentsTag = async (): Promise<string> => `absents-show`;
export const plansTag = async (): Promise<string> => `plans-show`;
export const scoreTag = async (): Promise<string> => `scores`;
export const scoreListTag = async (): Promise<string> => `scores-list`;
export const studyTag = async (id: string): Promise<string> => `study-${id}`;

export const fetchData = async <T>(url: string, tag?: string, cacheMethod?: string): Promise<T> => {
  const next = tag ? { tags: [tag] } : undefined;
  const cache = cacheMethod || tag ? 'no-store' : undefined;
  const token = cookies().get('token')?.value || '';
  const headers = { Authorization: `${token}`, 'Content-Type': 'application/json' };
  const requestOptions: RequestInit = { method: 'GET', headers, next, cache };

  const res = await fetch(baseURL + url, requestOptions);
  // console.log(url, res.status);

  if (res.status === 404) return notFound();
  if (res.status === 405) return redirect(LoginRoute());
  if (res.status === 403) return redirect('/403');
  // if (res.status > 499) return redirect('/500');

  const data = await res.json();

  return data.data as T;
};

export const revalidateAllData = (): void => revalidateTag('*');

export const tagRevalidate = (tag: string): void => revalidateTag(tag);

export const revalidatePage = (url: string): void => revalidatePath(url, 'page');

export const getUserRole = async (): Promise<string | undefined> => {
  const cookieStore = cookies();
  const role = cookieStore.get('role')?.value;
  return role;
};
