import React from 'react';
import Sidebar from './sidebar';
import GradeSelect from './gradeSelect';
import { fetchData } from 'app/lib/server.util';
import { GradeUrl } from 'app/lib/urls';

const menu = [
  { title: 'dashboard', icon: 'icon-home' },
  { title: 'classroom', icon: 'icon-monitor' },
  { title: 'student', icon: 'icon-people' },
];

const grades = [
  { title: 'aaa', id: 1 },
  { title: 'ddd', id: 2 },
  { title: 'ccc', id: 3 },
];

const GradeLayout: React.FC<{ children: React.ReactNode }> = async ({ children }) => {
  const data = await fetchData<{ data: { id: number; title: string }[] }>(GradeUrl(), 'grades');

  // if (!data.data.length) redirect(HomeRoute());
  const options = grades.map(({ id, title }) => ({
    value: id,
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
