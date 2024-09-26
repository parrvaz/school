import React from 'react';
import { Metadata } from 'next';
import fa from 'app/lib/fa.json';
import { classroomTag, fetchData, studentTag } from 'app/lib/server.util';
import { ShowClassUrl, ShowStudentUrl } from 'app/lib/urls';
import { ClassroomType, PageType, StudentType } from 'app/types/common.type';

export const metadata: Metadata = { title: fa.sidebar.study };

const StudyPage: React.FC<PageType> = async ({ params }) => {
  const [data, classes] = await Promise.all([
    fetchData<StudentType[]>(ShowStudentUrl(params.gradeId), await studentTag()),
    fetchData<ClassroomType[]>(ShowClassUrl(params?.gradeId), await classroomTag()),
  ]);

  return (
    <div className="">
      <h1 className="font-bold text-berry100 text-24 mb-10">{fa.sidebar.study}</h1>
      {/* <StudentsTable data={data} classes={classes} tag={await studentTag()} /> */}
    </div>
  );
};

export default StudyPage;
