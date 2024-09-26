'use client';

import React, { useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ClassroomType, CourseType, SelectOptionType, StudentType } from 'app/types/common.type';
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
}> = ({ courses, students, classes }) => {
  const router = useRouter();
  const { gradeId } = useParams();
  const emptyMessage = fa.plan.noStudent;
  const allClasses = { value: -1, label: fa.plan.allClasses };
  const [selectedClass, setSelectedClass] = useState<SelectOptionType | null>(allClasses);
  const classOptions = [allClasses, ...getOption(classes, 'title')];

  const columns = [
    {
      headerName: fa.global.studentName,
      field: 'name',
      lockPosition: 'right',
    },
    { headerName: fa.plan.className, field: 'classroom' },
    { headerName: fa.plan.submitDate, field: 'planDate', valueFormatter: dashFormatter },
    { headerName: fa.plan.planName, field: 'planName', valueFormatter: dashFormatter },
  ];

  const filteredData = useMemo(
    () =>
      students.filter((k) =>
        selectedClass?.value === -1 ? true : k.classroom_id === selectedClass?.value
      ),
    [selectedClass, students]
  );
  return (
    <div className="flex flex-col">
      <div className="flex justify-between mb-2">
        <div className="text-14 flex items-center gap-1 font-light text-berry100">
          <i className="icon-info-circle text-18" /> {fa.plan.changePlan}
        </div>
        <ReactSelect
          className="w-60"
          options={classOptions}
          value={selectedClass}
          onChange={setSelectedClass}
        />
      </div>
      <Table {...{ columns, emptyMessage }} data={filteredData} className="h-full w-full" />
      <Button
        onClick={() => router.push(GradeRoute(gradeId, 'set-plan', `new`))}
        className="btn btn-primary self-end mt-3"
      >
        {fa.plan.createNewPlan}
      </Button>
    </div>
  );
};

export default SetCalendar;
