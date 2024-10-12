import React from 'react';
import { redirect } from 'next/navigation';
import { Metadata } from 'next';
import fa from 'app/lib/fa.json';
import StudentsTable from './studentsTable';
import {
  absentsTag,
  classroomTag,
  examTag,
  fetchData,
  getUserRole,
  plansTag,
  studentTag,
} from 'app/lib/server.util';
import { ShowClassUrl, ShowStudentUrl } from 'app/lib/urls';
import { ClassroomType, PageType, StudentType } from 'app/types/common.type';
import { roleAccess, ROLES } from 'app/utils/common.util';

export const metadata: Metadata = { title: fa.sidebar.student };

const StudentPage: React.FC<PageType> = async ({ params }) => {
  const role = (await getUserRole()) || '';
  const accessTeacher = roleAccess([ROLES.manager, ROLES.assistant], role);
  !accessTeacher && redirect('/403');
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
