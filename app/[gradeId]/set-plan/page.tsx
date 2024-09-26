import React from 'react';
import { Metadata } from 'next';
import fa from 'app/lib/fa.json';
import { ClassroomType, PageType, PlansType, StudentType } from 'app/types/common.type';
import SetCalendar from '.';
import { classroomTag, fetchData, plansTag, studentTag } from 'app/lib/server.util';
import { ShowAllPlansUrl, ShowClassUrl, ShowStudentUrl } from 'app/lib/urls';

export const metadata: Metadata = { title: fa.sidebar.setPlan };

const SetPlanPage: React.FC<PageType> = async ({ params }) => {
  const tag = await plansTag();
  const [plans, students, classes] = await Promise.all([
    fetchData<PlansType[]>(ShowAllPlansUrl(params.gradeId), tag),
    fetchData<StudentType[]>(ShowStudentUrl(params?.gradeId), await studentTag()),
    fetchData<ClassroomType[]>(ShowClassUrl(params?.gradeId), await classroomTag()),
  ]);

  const plans1 = [
    {
      id: 1,
      classroom_id: 18,
      classroom: 'سوم',
      title: 'عمومی 1',
      students: [
        {
          id: 8,
          firstName: 'حسن',
          lastName: 'حسینی',
          name: 'حسن حسینی',
          nationalId: '4444444444',
          classroom_id: 18,
          classroom: 'سوم',
          birthday: '1403/07/05',
          isOnlyChild: false,
          address: null,
          phone: '22222222222',
          fatherPhone: '22222222222',
          motherPhone: null,
          socialMediaID: null,
          numberOfGlasses: null,
          isLeftHand: false,
          religion: null,
          specialDisease: null,
          user_id: 22,
          parent_id: 22,
        },
      ],
    },
    {
      id: 2,
      classroom_id: 18,
      classroom: 'سوم',
      title: 'عمومی 2',
      students: undefined,
    },
  ];

  return (
    <div className="">
      <h1 className="font-bold text-berry100 text-24 mb-10">{fa.sidebar.setPlan}</h1>
      <SetCalendar {...{ students, classes, tag }} plans={plans1} />
    </div>
  );
};

export default SetPlanPage;
