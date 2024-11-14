import React from 'react';
import { Viewport } from 'next';
import { redirect } from 'next/navigation';
import Sidebar from '../components/sidebar';
import GradeSelect from '../components/gradeSelect';
import { fetchData, getUserRole, gradesTag, userTag } from 'app/lib/server.util';
import { GradeUrl, UserUrl } from 'app/lib/urls';
import { GradeType, UserType } from 'app/types/common.type';
import { HomeRoute } from 'app/lib/routes';
import AppHeader from 'app/components/appHeader';
import { roleAccess, ROLES } from 'app/utils/common.util';

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
  { title: 'reports', icon: 'icon-trend-up', url: '/card' },
  { title: 'homeworkList', icon: 'icon-edit' },
  { title: 'bells', icon: 'icon-menu-board' },
  { title: 'absents', icon: 'icon-personalcard' },
  { title: 'rollCall', icon: 'icon-task' },
  { title: 'messages', icon: 'icon-message' },
  { title: 'setPlan', icon: 'icon-calendar' },
  { title: 'study', icon: 'icon-timer' },
];

const roleMenu = {
  manager: menu.map((k) => k.title),
  assistant: menu.map((k) => k.title),
  parent: ['dashboard', 'reports'],
  teacher: ['dashboard', 'createExam', 'exams', 'reports', 'absents', 'rollCall', 'messages'],
  student: ['dashboard', 'reports', 'messages', 'study'],
};

const GradeLayout: React.FC<{ children: React.ReactNode }> = async ({ children }) => {
  const role = (await getUserRole()) || '';
  const accessGrad = roleAccess([ROLES.parent, ROLES.student], role, true);

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
      <Sidebar menu={roleMenu[user.role].map((item) => menu.find((k) => k.title === item))} />

      <div className="flex-1 m-10 relative pt-9">
        {accessGrad && <GradeSelect options={options} tag={await gradesTag()} />}
        {children}
      </div>
    </div>
  );
};

export default GradeLayout;
