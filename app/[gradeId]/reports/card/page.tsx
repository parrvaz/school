import React from 'react';
import { Metadata } from 'next';
import fa from 'app/lib/fa.json';
import ReportCard from './reportCard';
import { examTag, fetchData, getUserRole, studentTag } from 'app/lib/server.util';
import { ExamType, PageType, StudentType } from 'app/types/common.type';
import { ShowExamUrl, ShowStudentUrl } from 'app/lib/urls';
import { roleAccess, ROLES } from 'app/utils/common.util';

export const metadata: Metadata = { title: fa.sidebar.setPlan };

const ReportCardPage: React.FC<PageType> = async ({ params }) => {
  const role = (await getUserRole()) || '';
  const admin = roleAccess([ROLES.student, ROLES.parent], role, true);
  const [students, exams] = await Promise.all([
    admin ? fetchData<StudentType[]>(ShowStudentUrl(params.gradeId), await studentTag()) : null,
    fetchData<ExamType[]>(ShowExamUrl(params?.gradeId), await examTag()),
  ]);
  return (
    <div className="relative pb-11">
      <h1 className="font-bold text-berry100 w-[calc(100%-18rem)] text-24 mb-10">
        {fa.reports.card.title}
      </h1>
      <ReportCard {...{ students, exams }} />
    </div>
  );
};

export default ReportCardPage;
