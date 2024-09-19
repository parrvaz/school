import React from 'react';
import { Metadata } from 'next';
import fa from 'app/lib/fa.json';
import { ClassroomType, CourseType, PageType, StudentType } from 'app/types/common.type';
import { classroomTag, courseTag, examTag, fetchData, studentTag } from 'app/lib/server.util';
import { ShowClassUrl, ShowCourseUrl, ShowStudentUrl } from 'app/lib/urls';
import CreateExam from '.';

export const metadata: Metadata = { title: fa.sidebar.teacher };

const CreateExamPage: React.FC<PageType> = async ({ params }) => {
  const [classes, courses, students] = await Promise.all([
    fetchData<ClassroomType[]>(ShowClassUrl(params?.gradeId), await classroomTag()),
    fetchData<CourseType[]>(ShowCourseUrl(params.gradeId), await courseTag()),
    fetchData<StudentType[]>(ShowStudentUrl(params.gradeId), await studentTag()),
  ]);

  return (
    <div className="">
      <h1 className="font-bold text-berry100 text-24 mb-10">{fa.sidebar.createExam}</h1>
      <CreateExam {...{ classes, courses, students }} tag={await examTag()} />
    </div>
  );
};

export default CreateExamPage;
