'use client';

import React from 'react';
import { ScheduleDataType, ScheduleType } from 'app/types/common.type';
import fa from 'app/lib/fa.json';
import { getTody } from 'app/utils/common.util';
import Table from 'app/components/table';

const Schedule: React.FC<{
  adminData?: ScheduleDataType[];
  studentData: ScheduleType;
}> = ({ adminData, studentData }) => {
  const emptyMessage = fa.global.noPlan;

  const schoolPlan = adminData?.map((k) => ({
    classroom: k.classroom,
    ...Object.keys(k.schedule).reduce((acc: any, val) => {
      acc[`bell${val}`] = (k.schedule[val] as any)[getTody(true, true)];
      return acc;
    }, {}),
  }));

  const studentPlan = Object.keys(studentData || []).map((key) => ({
    bell: fa.global[`bell${key}`],
    ...studentData[key],
  }));

  const bells = [
    ...new Set(
      schoolPlan?.flatMap((item) => Object.keys(item).filter((key) => key.startsWith('bell')))
    ),
  ];

  const schoolColumns = [
    { headerName: fa.global.className, field: 'classroom', lockPosition: 'right' },
    ...bells.map((bell) => ({
      headerName: fa.global[bell as keyof typeof fa.global],
      field: bell,
    })),
  ];

  const studentColumns = ['bell', 'sat', 'sun', 'mon', 'tue', 'wed', 'thu', 'fri'].map((item) => ({
    headerName: fa.global[item],
    field: item,
  }));

  const data = !adminData ? studentPlan : schoolPlan || [];
  const columns = !adminData ? studentColumns : schoolColumns;

  return (
    <div className="">
      <div className="font-bold text-14 mb-1">
        {fa.dashboard[!adminData ? 'schedule' : 'classesSchedule']}
      </div>
      <Table
        {...{ columns, data, emptyMessage }}
        defaultColDef={{ sortable: false }}
        className="h-full w-full"
      />
    </div>
  );
};

export default Schedule;
