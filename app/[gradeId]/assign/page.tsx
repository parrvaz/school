import React from 'react';
import { Metadata } from 'next';
import fa from 'app/lib/fa.json';
import {
  AssignType,
  ClassroomType,
  CourseType,
  PageType,
  TeacherType,
} from 'app/types/common.type';
import { assignTag, classroomTag, courseTag, fetchData, teacherTag } from 'app/lib/server.util';
import { GetAssignUrl, ShowClassUrl, ShowCourseUrl, ShowTeacherUrl } from 'app/lib/urls';
import AssignList from './assignList';
import { normalizeAssignData } from 'app/utils/common.util';

export const metadata: Metadata = { title: fa.sidebar.teacher };

const AssignPage: React.FC<PageType> = async ({ params }) => {
  const [classes, teachers, courses, assignData] = await Promise.all([
    fetchData<ClassroomType[]>(ShowClassUrl(params?.gradeId), await classroomTag()),
    fetchData<TeacherType[]>(ShowTeacherUrl(params?.gradeId), await teacherTag()),
    fetchData<CourseType[]>(ShowCourseUrl(params.gradeId), await courseTag()),
    fetchData<AssignType[]>(GetAssignUrl(params.gradeId), await assignTag()),
  ]);

  return (
    <div className="">
      <h1 className="font-bold text-berry100 text-24 mb-10">{fa.sidebar.assign}</h1>
      <AssignList
        tag={await assignTag()}
        {...{ classes, teachers, courses }}
        assign={normalizeAssignData(assignData, courses, teachers, classes)}
      />
    </div>
  );
};

export default AssignPage;
