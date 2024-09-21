import { Metadata } from 'next';
import React from 'react';
import fa from 'app/lib/fa.json';
import { BellsType, ClassroomType, PageType } from 'app/types/common.type';
import { bellTag, classroomTag, fetchData } from 'app/lib/server.util';
import { ShowBellUrl, ShowClassUrl } from 'app/lib/urls';
import StudentsList from './studentsList';

export const metadata: Metadata = { title: fa.sidebar.rollCall };

const RollCallPage: React.FC<PageType> = async ({ params, searchParams }) => {
  const bellId = searchParams?.bellId || '';
  const classId = searchParams?.classId || '';
  const date = searchParams?.date || '';
  const [bells, classes] = await Promise.all([
    fetchData<BellsType[]>(ShowBellUrl(params.gradeId), await bellTag()),
    fetchData<ClassroomType[]>(ShowClassUrl(params?.gradeId), await classroomTag()),
  ]);

  return (
    <div className="">
      <h1 className="font-bold text-berry100 text-24 mb-10">{fa.sidebar.rollCall}</h1>
      <StudentsList {...{ bells, classes, bellId, classId, date }} />
    </div>
  );
};

export default RollCallPage;
