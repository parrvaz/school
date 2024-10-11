import React from 'react';
import { redirect } from 'next/navigation';
import { Metadata } from 'next';
import fa from 'app/lib/fa.json';
import { PageType, TeacherType } from 'app/types/common.type';
import TeacherTable from './teacherTable';
import { fetchData, getUserRole, teacherTag } from 'app/lib/server.util';
import { ShowTeacherUrl } from 'app/lib/urls';
import { roleAccess, ROLES } from 'app/utils/common.util';

export const metadata: Metadata = { title: fa.sidebar.teacher };

const StudentPage: React.FC<PageType> = async ({ params }) => {
  const role = (await getUserRole()) || '';
  const accessTeacher = roleAccess([ROLES.manager, ROLES.assistant], role);
  !accessTeacher && redirect('/403');

  const data = await fetchData<TeacherType[]>(ShowTeacherUrl(params.gradeId), await teacherTag());

  return (
    <div className="">
      <h1 className="font-bold text-berry100 text-24 mb-10">{fa.sidebar.teacher}</h1>
      <TeacherTable data={data} tag={await teacherTag()} />
    </div>
  );
};

export default StudentPage;
