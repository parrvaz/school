import React from 'react';
import { Metadata } from 'next';
import fa from 'app/lib/fa.json';
import { ClassroomType, CourseType, PageType, StudentType } from 'app/types/common.type';
import SetCalendar from '.';
import { classroomTag, courseTag, fetchData, studentTag } from 'app/lib/server.util';
import { ShowClassUrl, ShowCourseUrl, ShowStudentUrl } from 'app/lib/urls';

export const metadata: Metadata = { title: fa.sidebar.setPlan };

const SetPlanPage: React.FC<PageType> = async ({ params }) => {
  const [courses, students, classes] = await Promise.all([
    fetchData<CourseType[]>(ShowCourseUrl(params.gradeId), await courseTag()),
    fetchData<StudentType[]>(ShowStudentUrl(params?.gradeId), await studentTag()),
    fetchData<ClassroomType[]>(ShowClassUrl(params?.gradeId), await classroomTag()),
  ]);

  return (
    <div className="">
      <h1 className="font-bold text-berry100 text-24 mb-10">{fa.sidebar.setPlan}</h1>
      <SetCalendar {...{ courses, students, classes }} />
    </div>
  );
};

export default SetPlanPage;
