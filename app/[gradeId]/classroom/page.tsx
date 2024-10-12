import { Metadata } from 'next';
import React from 'react';
import { redirect } from 'next/navigation';
import ClassTable from './classTable';
import fa from 'app/lib/fa.json';
import { classroomTag, fetchData, getUserRole } from 'app/lib/server.util';
import { ClassroomType, PageType } from 'app/types/common.type';
import { ShowClassUrl } from 'app/lib/urls';
import { roleAccess, ROLES } from 'app/utils/common.util';

export const metadata: Metadata = { title: fa.sidebar.classroom };

const ClassroomPage: React.FC<PageType> = async ({ params }) => {
  const role = (await getUserRole()) || '';
  const accessTeacher = roleAccess([ROLES.manager, ROLES.assistant], role);
  !accessTeacher && redirect('/403');
  const data = await fetchData<ClassroomType[]>(
    ShowClassUrl(params?.gradeId),
    await classroomTag()
  );

  return (
    <div className="">
      <h1 className="font-bold text-berry100 text-24 mb-10">{fa.sidebar.classroom}</h1>
      <ClassTable data={data} tag={await classroomTag()} />
    </div>
  );
};

export default ClassroomPage;
