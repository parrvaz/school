import React from 'react';
import { Metadata } from 'next';
import fa from 'app/lib/fa.json';
import { classroomTag, courseTag, fetchData } from 'app/lib/server.util';
import { ShowClassUrl, ShowCourseUrl } from 'app/lib/urls';
import { ClassroomType, CourseType, PageType } from 'app/types/common.type';
import HomeworkList from '.';
import CreateHomework from './createHomework';

export const metadata: Metadata = { title: fa.sidebar.homeworkList };

const HomeworkListPage: React.FC<PageType> = async ({ params, searchParams }) => {
  const activeTab = searchParams?.tab || '';
  const [courses, classes] = await Promise.all([
    fetchData<CourseType[]>(ShowCourseUrl(params?.gradeId), await courseTag()),
    fetchData<ClassroomType[]>(ShowClassUrl(params?.gradeId), await classroomTag()),
  ]);

  const components = {
    create: <CreateHomework {...{ courses, classes }} />,
  };

  const title = {
    create: 'createNewHomework',
  };

  return (
    <div className="">
      <h1 className="font-bold text-berry100 text-24 mb-10">
        {fa.homework[title[activeTab] || 'homeworkList']}
      </h1>

      {components[activeTab] || <HomeworkList />}
    </div>
  );
};

export default HomeworkListPage;
