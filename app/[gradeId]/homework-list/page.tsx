import React from 'react';
import { Metadata } from 'next';
import fa from 'app/lib/fa.json';
import { classroomTag, courseTag, fetchData, homeworkTag } from 'app/lib/server.util';
import { ShowClassUrl, ShowCourseUrl, ShowHomeworkUrl } from 'app/lib/urls';
import { ClassroomType, CourseType, HomeworkType, PageType } from 'app/types/common.type';
import HomeworkList from '.';
import CreateHomework from './createHomework';
import GiveScore from './giveScore';
import { camelCase } from 'app/utils/common.util';
import ScoreReport from './scoreReport';

export const metadata: Metadata = { title: fa.sidebar.homeworkList };

const HomeworkListPage: React.FC<PageType> = async ({ params, searchParams }) => {
  const activeTab = camelCase(searchParams?.tab || '');
  const homeworkId = searchParams?.homeworkId || '';
  const tag = await homeworkTag();

  const [courses, classes, homework] = await Promise.all([
    fetchData<CourseType[]>(ShowCourseUrl(params?.gradeId), await courseTag()),
    fetchData<ClassroomType[]>(ShowClassUrl(params?.gradeId), await classroomTag()),
    fetchData<HomeworkType[] | HomeworkType>(
      ShowHomeworkUrl(params?.gradeId, homeworkId),
      await homeworkTag(homeworkId)
    ),
  ]);

  const components = {
    create: (
      <CreateHomework
        homework={homeworkId ? (homework as HomeworkType) : undefined}
        {...{ courses, classes, tag }}
      />
    ),
    giveScore: <GiveScore />,
    scoreReport: <ScoreReport />,
  };

  const title = {
    create: 'createNewHomework',
    giveScore: 'giveScore',
    scoreReport: 'scoreReport',
  };

  return (
    <div className="pb-20">
      <h1 className="font-bold text-berry100 text-24 mb-10">
        {fa.homework[title[activeTab] || 'homeworkList']}
      </h1>

      {components[activeTab] || <HomeworkList {...{ tag }} data={homework as HomeworkType[]} />}
    </div>
  );
};

export default HomeworkListPage;
