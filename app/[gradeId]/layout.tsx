import React from 'react';
import { redirect } from 'next/navigation';
import Sidebar from '../components/sidebar';
import GradeSelect from '../components/gradeSelect';
import { fetchData, gradesTag } from 'app/lib/server.util';
import { GradeUrl } from 'app/lib/urls';
import { GradeType } from 'app/types/common.type';
import { HomeRoute } from 'app/lib/routes';

const menu = [
  { title: 'dashboard', icon: 'icon-home' },
  { title: 'classroom', icon: 'icon-monitor' },
  { title: 'student', icon: 'icon-people' },
  { title: 'teacher', icon: 'icon-teacher' },
  { title: 'assign', icon: 'icon-book' },
  { title: 'createExam', icon: 'icon-path' },
  { title: 'exams', icon: 'icon-receipt-item' },
  { title: 'bells', icon: 'icon-menu-board' },
  { title: 'absents', icon: 'icon-task' },
];

const GradeLayout: React.FC<{ children: React.ReactNode }> = async ({ children }) => {
  const data = await fetchData<GradeType[]>(GradeUrl(), await gradesTag());

  if (!data?.length) redirect(HomeRoute());

  const options = data.map(({ code, title }) => ({
    value: code,
    label: title,
    hasDelete: true,
    hasEdit: true,
  }));
  return (
    <div className="bg-berry10 flex w-full min-h-screen pr-60">
      <div className="right-0 h-screen w-60 fixed overflow-auto bg-white">
        <Sidebar menu={menu} />
      </div>

      <div className="flex-1 m-10 relative">
        <GradeSelect options={options} tag={await gradesTag()} />
        {children}
      </div>
    </div>
  );
};

export default GradeLayout;
