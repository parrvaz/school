'use server';

import { notFound, redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { revalidateTag, revalidatePath } from 'next/cache';
import { baseURL } from './request';
import { LoginRoute } from './routes';

export const gradesTag = async (): Promise<string> => `grades`;
export const userTag = async (): Promise<string> => `user`;
export const classroomTag = async (): Promise<string> => `classroom-show`;
export const studentTag = async (): Promise<string> => `student-show`;
export const teacherTag = async (): Promise<string> => `teacher-show`;
export const courseTag = async (): Promise<string> => `course-show`;
export const assignTag = async (): Promise<string> => `assign-show`;
export const examTag = async (): Promise<string> => `exam-show`;
export const examIdTag = async (id?: string): Promise<string> => `exam-${id}`;
export const bellTag = async (): Promise<string> => `bell-show`;
export const schedulesTag = async (): Promise<string> => `schedules-show`;
export const absentsTag = async (): Promise<string> => `absents-show`;
export const plansTag = async (): Promise<string> => `plans-show`;
export const studyTag = async (id: string): Promise<string> => `study-${id}`;

export const fetchData = async <T>(
  url: string,
  tag?: string,
  method: 'GET' | 'POST' | 'DELETE' = 'GET',
  body: Record<string, any> | null = null // eslint-disable-line
): Promise<T> => {
  const next = tag ? { tags: [tag] } : { revalidate: 1 };
  const cache = tag ? 'force-cache' : undefined;
  const token = cookies().get('token')?.value || '';
  const headers = { Authorization: `${token}`, 'Content-Type': 'application/json' };
  const requestOptions: RequestInit = { method, headers, next, cache };

  if (method === 'POST' && body) requestOptions.body = JSON.stringify(body);
  const res = await fetch(baseURL + url, requestOptions);

  if (res.status === 404) return notFound();
  if (res.status === 405) return redirect(LoginRoute());

  const data = await res.json();

  return data.data as T;
};

export const revalidateAllData = (): void => revalidateTag('*');

export const tagRevalidate = (tag: string): void => revalidateTag(tag);

export const revalidatePage = (url: string): void => revalidatePath(url, 'page');
