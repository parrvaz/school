import React from 'react';
import { Metadata } from 'next';
import fa from 'app/lib/fa.json';
import { ClassroomType, CourseType, PageType, PlanPageType } from 'app/types/common.type';
import PlanPage from './planPage';
import { classroomTag, courseTag, fetchData, plansTag } from 'app/lib/server.util';
import { ShowClassUrl, ShowCourseUrl, ShowPlanUrl } from 'app/lib/urls';

export const metadata: Metadata = { title: fa.sidebar.setPlan };

const CreatePlan: React.FC<PageType> = async ({ params }) => {
  const [data, courses, classrooms] = await Promise.all([
    params.planId === 'new'
      ? null
      : fetchData<PlanPageType>(ShowPlanUrl(params.gradeId, params.planId)),
    fetchData<CourseType[]>(ShowCourseUrl(params.gradeId), await courseTag()),
    fetchData<ClassroomType[]>(ShowClassUrl(params.gradeId), await classroomTag()),
  ]);

  return (
    <div className="relative pb-11">
      <h1 className="font-bold text-berry100 w-[calc(100%-18rem)] text-24 mb-10">
        {!!data ? fa.plan.updatePlane + ' ' + data.title : fa.plan.createNewPlan}
      </h1>
      <PlanPage {...{ data, courses, classrooms }} tag={await plansTag()} />
    </div>
  );
};

export default CreatePlan;
