import React from 'react';
import { Metadata } from 'next';
import fa from 'app/lib/fa.json';
import { CourseType, PageType } from 'app/types/common.type';
import SetCalendar from '.';
import { courseTag, fetchData } from 'app/lib/server.util';
import { ShowCourseUrl } from 'app/lib/urls';

export const metadata: Metadata = { title: fa.sidebar.setCalendar };

const SetCalendarPage: React.FC<PageType> = async ({ params }) => {
  const courses = await fetchData<CourseType[]>(ShowCourseUrl(params.gradeId), await courseTag());

  return (
    <div className="">
      <h1 className="font-bold text-berry100 text-24 mb-10">{fa.sidebar.setCalendar}</h1>
      <SetCalendar {...{ courses }} />
    </div>
  );
};

export default SetCalendarPage;
