import React from 'react';
import { Metadata } from 'next';
import fa from 'app/lib/fa.json';
import StudentsTable from './studentsTable';
import {
  absentsTag,
  classroomTag,
  examTag,
  fetchData,
  plansTag,
  studentTag,
} from 'app/lib/server.util';
import { ShowClassUrl, ShowStudentUrl } from 'app/lib/urls';
import { ClassroomType, PageType, StudentType } from 'app/types/common.type';

export const metadata: Metadata = { title: fa.sidebar.student };

const StudentPage: React.FC<PageType> = async ({ params }) => {
  const tags = [await studentTag(), await absentsTag(), await examTag(), await plansTag()];
  const [data, classes] = await Promise.all([
    fetchData<StudentType[]>(ShowStudentUrl(params.gradeId), tags[0]),
    fetchData<ClassroomType[]>(ShowClassUrl(params?.gradeId), await classroomTag()),
  ]);

  return (
    <div className="">
      <h1 className="font-bold text-berry100 text-24 mb-10">{fa.sidebar.student}</h1>
      <StudentsTable data={data} classes={classes} tags={tags} />
    </div>
  );
};

export default StudentPage;
