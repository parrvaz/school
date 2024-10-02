import { Metadata } from 'next';
import React from 'react';
import fa from 'app/lib/fa.json';
import { BellsType, ClassroomType, PageType, StudentType } from 'app/types/common.type';
import { absentsTag, bellTag, classroomTag, fetchData, studentTag } from 'app/lib/server.util';
import { ShowBellUrl, ShowClassUrl, ShowStudentUrl } from 'app/lib/urls';
import StudentsList from './studentsList';

export const metadata: Metadata = { title: fa.sidebar.rollCall };

const RollCallPage: React.FC<PageType> = async ({ params, searchParams }) => {
  const bellId = searchParams?.bellId || '';
  const classId = searchParams?.classId || '';
  const date = searchParams?.date || '';
  const tag = await absentsTag();
  const [bells, classes, students] = await Promise.all([
    fetchData<BellsType[]>(ShowBellUrl(params.gradeId), await bellTag()),
    fetchData<ClassroomType[]>(ShowClassUrl(params?.gradeId), await classroomTag()),
    fetchData<StudentType[]>(ShowStudentUrl(params?.gradeId), await studentTag()),
  ]);

  return (
    <div className="">
      <h1 className="font-bold text-berry100 text-24 mb-10">{fa.sidebar.rollCall}</h1>
      <StudentsList {...{ bells, classes, bellId, classId, date, students, tag }} />
    </div>
  );
};

export default RollCallPage;
