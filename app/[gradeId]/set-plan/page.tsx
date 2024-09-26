import React from 'react';
import { Metadata } from 'next';
import fa from 'app/lib/fa.json';
import { ClassroomType, CourseType, PageType, PlansType, StudentType } from 'app/types/common.type';
import SetCalendar from '.';
import { classroomTag, courseTag, fetchData, plansTag, studentTag } from 'app/lib/server.util';
import { ShowAllPlansUrl, ShowClassUrl, ShowCourseUrl, ShowStudentUrl } from 'app/lib/urls';

export const metadata: Metadata = { title: fa.sidebar.setPlan };

const SetPlanPage: React.FC<PageType> = async ({ params }) => {
  const tag = await plansTag();
  const [plans, courses, students, classes] = await Promise.all([
    fetchData<PlansType[]>(ShowAllPlansUrl(params.gradeId), tag),
    fetchData<CourseType[]>(ShowCourseUrl(params.gradeId), await courseTag()),
    fetchData<StudentType[]>(ShowStudentUrl(params?.gradeId), await studentTag()),
    fetchData<ClassroomType[]>(ShowClassUrl(params?.gradeId), await classroomTag()),
  ]);

  return (
    <div className="">
      <h1 className="font-bold text-berry100 text-24 mb-10">{fa.sidebar.setPlan}</h1>
      <SetCalendar {...{ courses, students, classes, plans }} />
    </div>
  );
};

export default SetPlanPage;
