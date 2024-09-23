import React from 'react';
import { ScheduleDataType } from 'app/types/common.type';
import fa from 'app/lib/fa.json';
import { getTody } from 'app/utils/common.util';
import Table from 'app/components/table';

const Schedule: React.FC<{ schedules: ScheduleDataType[] }> = ({ schedules }) => {
  const data = schedules.map((k) => ({
    classroom: k.classroom,
    ...Object.keys(k.schedule).reduce((acc: any, val) => {
      acc[`bell${val}`] = (k.schedule[val] as any)[getTody(true, true)];
      return acc;
    }, {}),
  }));

  const bells = [
    ...new Set(data.flatMap((item) => Object.keys(item).filter((key) => key.startsWith('bell')))),
  ];

  const columns = [
    { headerName: fa.global.className, field: 'classroom', lockPosition: 'right' },
    ...bells.map((bell) => ({
      headerName: fa.global[bell as keyof typeof fa.global],
      field: bell,
    })),
  ];

  return (
    <div className="">
      <div className="font-bold text-14 mb-1">{fa.dashboard.classesSchedule}</div>
      <Table {...{ columns, data }} className="h-full w-full" />
    </div>
  );
};

export default Schedule;
