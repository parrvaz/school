import React from 'react';
import { Metadata } from 'next';
import fa from 'app/lib/fa.json';
// import { fetchData } from 'app/lib/server.util';
// import { ShowStudentUrl } from 'app/lib/urls';
import { PageType } from 'app/types/common.type';
import TeacherTable from './teacherTable';

export const metadata: Metadata = { title: fa.sidebar.teacher };

const StudentPage: React.FC<PageType> = async () => {
  // const data = await fetchData<{ data: GradeType[] }>(ShowStudentUrl(params.gradeId), 'students');

  const data = [
    {
      id: 31,
      firstName: 'محمد صادق',
      lastName: 'بیهقی',
      name: 'محمد صادق بیهقی',
      nationalId: 4560197245,
      degree: 'ddd',
      personalId: 432,
      user_grade_id: 2,
    },
    {
      id: 32,
      firstName: 'احسان',
      lastName: 'رزازیان',
      name: 'احسان رزازیان',
      nationalId: 4560197246,
      degree: '',
      personalId: 23,
      user_grade_id: 2,
    },
  ];
  return (
    <div className="">
      <h1 className="font-bold text-berry100 text-24 mb-10">{fa.sidebar.teacher}</h1>
      <TeacherTable data={data} />
    </div>
  );
};

export default StudentPage;
