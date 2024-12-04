import React from 'react';
import { Metadata } from 'next';
import fa from 'app/lib/fa.json';
import ReportCard from './reportCard';
import { examTag, fetchData, getUserRole, gradesTag, studentTag } from 'app/lib/server.util';
import { ExamType, GradeType, PageType, StudentType } from 'app/types/common.type';
import { GradeUrl, ShowExamUrl, ShowStudentUrl } from 'app/lib/urls';
import { roleAccess, ROLES } from 'app/utils/common.util';

export const metadata: Metadata = { title: fa.sidebar.reports };

const ReportCardPage: React.FC<PageType> = async ({ params }) => {
  const role = (await getUserRole()) || '';
  const admin = roleAccess([ROLES.student, ROLES.parent], role, true);
  const [students, exams, grade] = await Promise.all([
    admin ? fetchData<StudentType[]>(ShowStudentUrl(params.gradeId), await studentTag()) : null,
    fetchData<ExamType[]>(ShowExamUrl(params?.gradeId), await examTag()),
    fetchData<GradeType[]>(GradeUrl(), await gradesTag()),
  ]);
  return (
    <ReportCard
      {...{ students, exams }}
      grade={grade.find((k) => k.code === params.gradeId)?.grade_id || 0}
    />
  );
};

export default ReportCardPage;
