import React from 'react';
import { Metadata } from 'next';
import fa from 'app/lib/fa.json';
import { ClassroomType, CourseType, ExamType, PageType, StudentType } from 'app/types/common.type';
import {
  classroomTag,
  courseTag,
  examIdTag,
  examTag,
  fetchData,
  studentTag,
} from 'app/lib/server.util';
import { ShowClassUrl, ShowCourseUrl, ShowExamUrl, ShowStudentUrl } from 'app/lib/urls';
import CreateExam from '.';

export const metadata: Metadata = { title: fa.sidebar.teacher };

const CreateExamPage: React.FC<PageType> = async ({ params, searchParams }) => {
  const id = searchParams?.id;
  const idTag = await examIdTag(id);
  const [classes, courses, students, examData] = await Promise.all([
    fetchData<ClassroomType[]>(ShowClassUrl(params?.gradeId), await classroomTag()),
    fetchData<CourseType[]>(ShowCourseUrl(params.gradeId), await courseTag()),
    fetchData<StudentType[]>(ShowStudentUrl(params.gradeId), await studentTag()),
    id ? fetchData<ExamType>(ShowExamUrl(params.gradeId, id), idTag) : undefined,
  ]);

  return (
    <div className="">
      <h1 className="font-bold text-berry100 text-24 mb-10">{fa.sidebar.createExam}</h1>
      <CreateExam
        {...{ classes, courses, students }}
        data={examData}
        examTag={idTag}
        tag={await examTag()}
      />
    </div>
  );
};

export default CreateExamPage;
