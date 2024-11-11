'use client';

import React from 'react';
import { ValueFormatterParams } from 'ag-grid-community';
import IsFinalRenderer from '../exams/isFinalRenderer';
import fa from 'app/lib/fa.json';
import { ExamType } from 'app/types/common.type';
import { examTypeFormatter, faNumber } from 'app/utils/common.util';
import Table from 'app/components/table';

const LastExams: React.FC<{ data: ExamType[]; isAdmin: boolean }> = ({ data, isAdmin }) => {
  const emptyMessage = fa.createExam.noExam;
  const columns = [
    {
      headerName: fa.global.date,
      field: 'date',
      width: 95,
      minWidth: 95,
      resizable: false,
      valueFormatter: (params: ValueFormatterParams) => faNumber(params.value),
    },
    { headerName: fa.global.course, field: 'course' },
    { headerName: fa.global.classroom, field: 'classroom' },
    {
      headerName: fa.createExam.type,
      field: 'type',
      valueFormatter: examTypeFormatter,
      width: 90,
      minWidth: 90,
      resizable: false,
    },
    {
      headerName: fa.createExam.status,
      field: 'isFinal',
      cellDataType: 'text',
      cellRenderer: IsFinalRenderer,
      width: 80,
      minWidth: 80,
      resizable: false,
    },
  ];

  return (
    <div className="">
      <div className="font-bold text-14 mb-1 mt-3">
        {fa.dashboard[isAdmin ? 'lastExams' : 'lastExamsInClass']}
      </div>

      <Table {...{ columns, emptyMessage, data }} className="h-full w-full" />
    </div>
  );
};

export default LastExams;
