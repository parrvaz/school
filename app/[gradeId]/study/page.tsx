import React from 'react';
import { Metadata } from 'next';
import fa from 'app/lib/fa.json';
import { CourseType, PageType, StudentType, StudyPageType } from 'app/types/common.type';
import { courseTag, fetchData, studentTag } from 'app/lib/server.util';
import { ShowCourseUrl, ShowStudentUrl, ShowStudyUrl } from 'app/lib/urls';
import Study from '.';

export const metadata: Metadata = { title: fa.sidebar.study };

const StudyPage: React.FC<PageType> = async ({ params, searchParams }) => {
  const studentId = searchParams?.id;
  const [data, courses, students] = await Promise.all([
    studentId ? fetchData<StudyPageType>(ShowStudyUrl(params.gradeId, studentId)) : null,
    fetchData<CourseType[]>(ShowCourseUrl(params.gradeId), await courseTag()),
    fetchData<StudentType[]>(ShowStudentUrl(params?.gradeId), await studentTag()),
  ]);

  return (
    <div className="">
      <h1 className="font-bold text-berry100 text-24 mb-10">{fa.sidebar.study}</h1>
      <Study {...{ data, courses, students, studentId }} />
    </div>
  );
};

export default StudyPage;
