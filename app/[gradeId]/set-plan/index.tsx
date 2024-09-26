'use client';

import React, { useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  ClassroomType,
  CourseType,
  PlansType,
  SelectOptionType,
  StudentType,
} from 'app/types/common.type';
import fa from 'app/lib/fa.json';
import Table from 'app/components/table';
import { dashFormatter, getOption } from 'app/utils/common.util';
import ReactSelect from 'app/components/select';
import Button from 'app/components/button';
import { GradeRoute } from 'app/lib/routes';

const SetCalendar: React.FC<{
  courses: CourseType[];
  students: StudentType[];
  classes: ClassroomType[];
  plans: PlansType[];
}> = ({ courses, students, classes, plans }) => {
  const router = useRouter();
  const { gradeId } = useParams();
  const allClasses = { value: -1, label: fa.plan.allClasses };
  const [selectedClass, setSelectedClass] = useState<SelectOptionType | null>(allClasses);
  const classOptions = [allClasses, ...getOption(classes, 'title')];

  const filteredData = useMemo(
    () =>
      students.filter((k) =>
        selectedClass?.value === -1 ? true : k.classroom_id === selectedClass?.value
      ),
    [selectedClass, students]
  );

  console.log(plans);
  return (
    <div className="">
      <div className="grid font-bold mb-1 pr-2 text-14 text-berry100 grid-cols-[10rem_8rem_13rem_1fr]">
        <div className="">{fa.plan.planName}</div>
        <div className="">{fa.global.action}</div>
        <div className="">{fa.global.className}</div>
        <div className="">{fa.global.studentName}</div>
      </div>

      <div className="rounded-lg overflow-hidden">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="font-light bg-white text-16 p-1 border-t items-center border-t-black20 grid grid-cols-[10rem_8rem_13rem_1fr]"
          >
            <div className="">{plan.title}</div>
            <div className="flex items-center">
              <i
                onClick={() => router.push(GradeRoute(gradeId, 'set-plan', plan.id))}
                className="icon-edit text-20 cursor-pointer hover:bg-berry10 duration-300 p-2 rounded-full"
              />
              <i className="icon-close text-24 cursor-pointer hover:bg-berry10 duration-300 p-1 rounded-full" />
              <i className="icon-note text-20 cursor-pointer hover:bg-berry10 duration-300 p-2 rounded-full" />
            </div>

            <div className="">{plan.classroom || '-'}</div>
            <div className="">{plan.classroom || '-'}</div>
          </div>
        ))}
      </div>

      {/* <Button
      onClick={() => router.push(GradeRoute(gradeId, 'set-plan', `new`))}
      className="btn btn-primary self-end mt-3"
    >
      {fa.plan.createNewPlan}
    </Button> */}
    </div>
  );
};

export default SetCalendar;
