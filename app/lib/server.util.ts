'use server';

import { notFound, redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { revalidateTag, revalidatePath } from 'next/cache';
import { baseURL } from './request';
import { LoginRoute } from './routes';

export const workshopTag = (id: number | string): string => `workshop-${id}`;
export const lessonTag = (id: number | string): string => `lesson-${id}`;
export const eventTag = (id: number | string): string => `event-${id}`;
export const userTag = (): string => `user`;

export const fetchData = async <T>(
  url: string,
  tag: string,
  method: 'GET' | 'POST' | 'DELETE' = 'GET',
  body: Record<string, any> | null = null // eslint-disable-line
): Promise<T> => {
  const token = cookies().get('token')?.value || '';
  const headers = { Authorization: `${token}`, 'Content-Type': 'application/json' };
  const next = { tags: [tag] };
  const requestOptions: RequestInit = { method, headers, next, cache: 'force-cache' };

  if (method === 'POST' && body) requestOptions.body = JSON.stringify(body);

  const res = await fetch(baseURL + url, requestOptions);

  if (res.status === 404) return notFound();
  if (res.status === 405) return redirect(LoginRoute());

  const data = await res.json();

  return data as T;
};

export const revalidateAllData = (): void => revalidateTag('*');

export const tagRevalidate = (tag: string): void => revalidateTag(tag);

export const revalidatePage = (url: string): void => revalidatePath(url, 'page');
