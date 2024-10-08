import { Metadata } from 'next';
import React from 'react';
import Bells from '.';
import fa from 'app/lib/fa.json';
import {
  BellsType,
  ClassroomType,
  CourseType,
  PageType,
  ScheduleDataType,
} from 'app/types/common.type';
import { bellTag, classroomTag, courseTag, fetchData, schedulesTag } from 'app/lib/server.util';
import { ShowBellUrl, ShowClassUrl, ShowCourseUrl, ShowSchedulesUrl } from 'app/lib/urls';

export const metadata: Metadata = { title: fa.sidebar.bells };

const BellsPage: React.FC<PageType> = async ({ params }) => {
  const bellsTag = await bellTag();
  const scheduleTag = await schedulesTag();
  const coursesTag = await courseTag();
  const [schedules, bells, classes, courses] = await Promise.all([
    fetchData<ScheduleDataType[]>(ShowSchedulesUrl(params.gradeId), scheduleTag),
    fetchData<BellsType[]>(ShowBellUrl(params.gradeId), bellsTag),
    fetchData<ClassroomType[]>(ShowClassUrl(params?.gradeId), await classroomTag()),
    fetchData<CourseType[]>(ShowCourseUrl(params?.gradeId), coursesTag),
  ]);

  return (
    <div className="">
      <h1 className="font-bold text-berry100 text-24 mb-10">{fa.sidebar.bells}</h1>
      <Bells {...{ classes, bells, courses, schedules, bellsTag, scheduleTag, coursesTag }} />
    </div>
  );
};

export default BellsPage;
