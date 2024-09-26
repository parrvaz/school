import React from 'react';
import { Metadata } from 'next';
import fa from 'app/lib/fa.json';
import { CourseType, PageType } from 'app/types/common.type';
import PlanPage from './planPage';
import { courseTag, fetchData } from 'app/lib/server.util';
import { ShowCourseUrl } from 'app/lib/urls';

export const metadata: Metadata = { title: fa.sidebar.setPlan };

const CreatePlan: React.FC<PageType> = async ({ params }) => {
  const [courses] = await Promise.all([
    fetchData<CourseType[]>(ShowCourseUrl(params.gradeId), await courseTag()),
  ]);

  const data = {
    name: 'عمومی ۱',
    plan: [],
  };

  return (
    <div className="relative pb-11">
      <h1 className="font-bold text-berry100 text-24 mb-10">
        {data?.name ? fa.plan.updatePlane + ' ' + data.name : fa.plan.createNewPlan}
      </h1>
      <PlanPage {...{ data, courses }} />
    </div>
  );
};

export default CreatePlan;
