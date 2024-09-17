import React from 'react';
import { Metadata } from 'next';
import fa from 'app/lib/fa.json';
import { PageType, TeacherType } from 'app/types/common.type';
import TeacherTable from './teacherTable';
import { fetchData, teacherTag } from 'app/lib/server.util';
import { ShowTeacherUrl } from 'app/lib/urls';

export const metadata: Metadata = { title: fa.sidebar.teacher };

const StudentPage: React.FC<PageType> = async ({ params }) => {
  const data = await fetchData<TeacherType[]>(ShowTeacherUrl(params.gradeId), teacherTag());

  return (
    <div className="">
      <h1 className="font-bold text-berry100 text-24 mb-10">{fa.sidebar.teacher}</h1>
      <TeacherTable data={data} />
    </div>
  );
};

export default StudentPage;
