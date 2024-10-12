import React from 'react';
import { redirect } from 'next/navigation';
import { Metadata } from 'next';
import fa from 'app/lib/fa.json';
import { ExamType, PageType } from 'app/types/common.type';
import { examTag, fetchData, getUserRole } from 'app/lib/server.util';
import { ShowExamUrl } from 'app/lib/urls';
import ExamsTable from './examsTable';
import { roleAccess, ROLES } from 'app/utils/common.util';

export const metadata: Metadata = { title: fa.sidebar.teacher };

const ExamPage: React.FC<PageType> = async ({ params }) => {
  const role = (await getUserRole()) || '';
  const accessTeacher = roleAccess([ROLES.parent, ROLES.student], role, true);
  !accessTeacher && redirect('/403');
  const data = await fetchData<ExamType[]>(ShowExamUrl(params?.gradeId), await examTag());

  return (
    <div className="">
      <h1 className="font-bold text-berry100 text-24 mb-10">{fa.sidebar.exams}</h1>
      <ExamsTable {...{ data }} tag={await examTag()} />
    </div>
  );
};

export default ExamPage;
