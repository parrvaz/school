'use client';

import React from 'react';
import { StudentHomeworkType } from 'app/types/common.type';
import fa from 'app/lib/fa.json';
import Table from 'app/components/table';
import ShowHomeworkRenderer from './showHomeworkRenderer';

const StudentHomeworkList: React.FC<{ data: StudentHomeworkType[] }> = ({ data }) => {
  const columns = [
    { headerName: fa.global.title, field: 'title', minWidth: 90 },
    { headerName: fa.global.course, field: 'course' },
    { headerName: fa.homework.modifiedDate, field: 'modifiedDate', width: 110, minWidth: 110 },
    { headerName: fa.homework.date, field: 'date', width: 110, minWidth: 110 },
    {
      headerName: fa.homework.score,
      field: 'score',
      width: 90,
      minWidth: 90,
      valueFormatter: (params) => params.value || fa.homework.notSet,
    },
    {
      headerName: fa.homework.status,
      field: 'status',
      width: 130,
      minWidth: 130,
      valueFormatter: (params) => fa.homework[params.value],
    },
    {
      headerName: fa.global.action,
      cellRenderer: ShowHomeworkRenderer,
      pinned: 'left',
      lockPosition: 'left',
      width: 90,
      minWidth: 90,
      resizable: false,
    },
  ];
  return (
    <div>
      <Table {...{ columns, data }} className="h-full w-full" />
    </div>
  );
};

export default StudentHomeworkList;
