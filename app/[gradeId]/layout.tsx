import React from 'react';
import Sidebar from './sidebar';
import ReactSelect from 'app/components/select';
import GradeSelect from './gradeSelect';

const menu = [
  { title: 'dashboard', icon: 'icon-home' },
  { title: 'classroom', icon: 'icon-people' },
  { title: 'student', icon: 'icon-teacher' },
];

const grades = [
  { title: 'aaa', id: 1 },
  { title: 'ddd', id: 2 },
  { title: 'ccc', id: 3 },
];

const AppLayout = ({ children }: { children: React.ReactNode }): React.ReactNode => {
  const options = grades.map(({ id, title }) => ({ value: id, label: title }));
  return (
    <div className="bg-berry10 flex w-screen min-h-screen">
      <div className="right-0 h-screen w-60 overflow-auto bg-white">
        <Sidebar menu={menu} />
      </div>

      <div className="flex-1 m-10">
        <GradeSelect options={options} />
        {children}
      </div>
    </div>
  );
};

export default AppLayout;
