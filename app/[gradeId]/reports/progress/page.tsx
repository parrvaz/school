import React from 'react';
import { Metadata } from 'next';
import fa from 'app/lib/fa.json';
import { examTag, fetchData, getUserRole, studentTag } from 'app/lib/server.util';
import { ExamType, PageType, StudentType } from 'app/types/common.type';
import { ShowExamUrl, ShowStudentUrl } from 'app/lib/urls';
import { roleAccess, ROLES } from 'app/utils/common.util';
import Scores from '.';

export const metadata: Metadata = { title: fa.sidebar.reports };

const ReportScoresPage: React.FC<PageType> = async ({ params }) => {
  const role = (await getUserRole()) || '';
  const admin = roleAccess([ROLES.student, ROLES.parent], role, true);
  const [students, exams] = await Promise.all([
    admin ? fetchData<StudentType[]>(ShowStudentUrl(params.gradeId), await studentTag()) : null,
    fetchData<ExamType[]>(ShowExamUrl(params?.gradeId), await examTag()),
  ]);
  return <Scores {...{ students, exams }} />;
};

export default ReportScoresPage;
