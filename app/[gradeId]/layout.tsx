import React from 'react';
import { redirect } from 'next/navigation';
import Sidebar from './sidebar';
import GradeSelect from './gradeSelect';
import { fetchData, gradesTag } from 'app/lib/server.util';
import { GradeUrl } from 'app/lib/urls';
import { GradeType } from 'app/types/common.type';
import { HomeRoute } from 'app/lib/routes';

const menu = [
  { title: 'dashboard', icon: 'icon-home' },
  { title: 'classroom', icon: 'icon-monitor' },
  { title: 'student', icon: 'icon-people' },
  { title: 'teacher', icon: 'icon-teacher' },
];

const GradeLayout: React.FC<{ children: React.ReactNode }> = async ({ children }) => {
  const data = await fetchData<GradeType[]>(GradeUrl(), gradesTag());

  if (!data?.length) redirect(HomeRoute());

  const options = data.map(({ code, title }) => ({
    value: code,
    label: title,
    hasDelete: true,
    hasEdit: true,
  }));
  return (
    <div className="bg-berry10 flex w-screen min-h-screen">
      <div className="right-0 h-screen w-60 overflow-auto bg-white">
        <Sidebar menu={menu} />
      </div>

      <div className="flex-1 m-10 relative">
        <GradeSelect options={options} />
        {children}
      </div>
    </div>
  );
};

export default GradeLayout;
