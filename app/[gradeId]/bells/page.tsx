import { Metadata } from 'next';
import React from 'react';
import Bells from '.';
import fa from 'app/lib/fa.json';
import { BellsType, ClassroomType, CourseType, PageType } from 'app/types/common.type';
import { bellTag, classroomTag, courseTag, fetchData } from 'app/lib/server.util';
import { ShowBellUrl, ShowClassUrl, ShowCourseUrl } from 'app/lib/urls';

export const metadata: Metadata = { title: fa.sidebar.bells };

const BellsPage: React.FC<PageType> = async ({ params }) => {
  const [bells, classes, courses] = await Promise.all([
    fetchData<BellsType>(ShowBellUrl(params.gradeId), await bellTag()),
    fetchData<ClassroomType[]>(ShowClassUrl(params?.gradeId), await classroomTag()),
    fetchData<CourseType[]>(ShowCourseUrl(params?.gradeId), await courseTag()),
  ]);
  return (
    <div className="">
      <h1 className="font-bold text-berry100 text-24 mb-10">{fa.sidebar.bells}</h1>
      <Bells {...{ classes, bells, courses }} tag={await bellTag()} />
    </div>
  );
};

export default BellsPage;
