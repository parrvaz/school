import { Metadata } from 'next';
import React from 'react';
import ClassTable from './classTable';
import fa from 'app/lib/fa.json';
import { classroomTag, fetchData } from 'app/lib/server.util';
import { ClassroomType, PageType } from 'app/types/common.type';
import { ShowClassUrl } from 'app/lib/urls';

export const metadata: Metadata = { title: fa.sidebar.classroom };

const ClassroomPage: React.FC<PageType> = async ({ params }) => {
  const data = await fetchData<ClassroomType[]>(ShowClassUrl(params?.gradeId), classroomTag());

  return (
    <div className="">
      <h1 className="font-bold text-berry100 text-24 mb-10">{fa.sidebar.classroom}</h1>
      <ClassTable data={data} tag={classroomTag()} />
    </div>
  );
};

export default ClassroomPage;
