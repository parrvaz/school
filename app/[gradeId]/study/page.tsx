import React from 'react';
import { Metadata } from 'next';
import fa from 'app/lib/fa.json';
import { CourseType, PageType } from 'app/types/common.type';
import { courseTag, fetchData } from 'app/lib/server.util';
import { ShowCourseUrl } from 'app/lib/urls';
import Study from '.';

export const metadata: Metadata = { title: fa.sidebar.study };

const StudyPage: React.FC<PageType> = async ({ params }) => {
  const [courses] = await Promise.all([
    // fetchData<PlanPageType>(ShowPlanUrl(params.gradeId, params.planId)),
    fetchData<CourseType[]>(ShowCourseUrl(params.gradeId), await courseTag()),
  ]);

  const data = {
    id: 5,
    title: 'a1',
    plan: [
      {
        id: 33,
        title: 'شیمی ۱',
        isFix: true,
        course_id: 5,
        date: '1403/7/4 1:00-4:45',
      },
      {
        id: 34,
        title: 'آزمایشگاه علوم تجربی ۱',
        course_id: 10,
        date: '1403/7/1 1:00-2:00',
      },
    ],
  };

  return (
    <div className="">
      <h1 className="font-bold text-berry100 text-24 mb-10">{fa.sidebar.study}</h1>
      <Study {...{ data, courses }} />
    </div>
  );
};

export default StudyPage;
