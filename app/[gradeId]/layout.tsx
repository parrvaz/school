import React from 'react';
import { Viewport } from 'next';
import { redirect } from 'next/navigation';
import Sidebar from '../components/sidebar';
import GradeSelect from '../components/gradeSelect';
import { fetchData, gradesTag, userTag } from 'app/lib/server.util';
import { GradeUrl, UserUrl } from 'app/lib/urls';
import { GradeType, UserType } from 'app/types/common.type';
import { HomeRoute } from 'app/lib/routes';
import AppHeader from 'app/components/appHeader';

export const viewport: Viewport = {
  initialScale: 1,
  width: '1300',
};

const menu = [
  { title: 'dashboard', icon: 'icon-home' },
  { title: 'classroom', icon: 'icon-monitor' },
  { title: 'student', icon: 'icon-people' },
  { title: 'teacher', icon: 'icon-teacher' },
  { title: 'assign', icon: 'icon-book' },
  { title: 'createExam', icon: 'icon-path' },
  { title: 'exams', icon: 'icon-receipt-item' },
  { title: 'bells', icon: 'icon-menu-board' },
  { title: 'absents', icon: 'icon-personalcard' },
  { title: 'rollCall', icon: 'icon-task' },
  { title: 'messages', icon: 'icon-message' },
  { title: 'setPlan', icon: 'icon-calendar' },
  { title: 'study', icon: 'icon-timer' },
];

const GradeLayout: React.FC<{ children: React.ReactNode }> = async ({ children }) => {
  const [data, user] = await Promise.all([
    fetchData<GradeType[]>(GradeUrl(), await gradesTag()),
    fetchData<UserType>(UserUrl(), await userTag()),
  ]);

  if (!data?.length) redirect(HomeRoute());

  const options = data.map(({ code, title }) => ({
    value: code,
    label: title,
    hasDelete: true,
    hasEdit: true,
  }));
  return (
    <div className="bg-berry10 flex w-full min-h-screen pr-60">
      <AppHeader user={user} />
      <Sidebar menu={menu} />

      <div className="flex-1 m-10 relative pt-7">
        <GradeSelect options={options} tag={await gradesTag()} />
        {children}
      </div>
    </div>
  );
};

export default GradeLayout;
