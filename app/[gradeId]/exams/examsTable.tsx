'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ValueFormatterParams } from 'ag-grid-community';
import { ExamType } from 'app/types/common.type';
import fa from 'app/lib/fa.json';
import ActionRenderer from 'app/components/actionRenderer';
import { DeleteExamAction } from 'app/lib/actions';
import Table from 'app/components/table';
import { examTypeFormatter, faNumber } from 'app/utils/common.util';
import IsFinalRenderer from './isFinalRenderer';
import { GradeRoute } from 'app/lib/routes';
import RenderBoolean from 'app/components/renderBoolean';

const ExamsTable: React.FC<{ data: ExamType[]; tag: string }> = ({ data, tag }) => {
  const emptyMessage = fa.createExam.noExam;
  const deleteMessage = fa.createExam.deleteMessage;

  const router = useRouter();
  const { gradeId } = useParams();

  const [examData, setExamData] = useState<ExamType | boolean>(false);

  useEffect(() => {
    if (typeof examData !== 'boolean')
      router.push(GradeRoute(gradeId, 'create-exam', `?id=${examData.id}`));
  }, [examData]);

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
      headerName: fa.createExam.modifiedDate,
      field: 'modifiedDate',
      valueFormatter: (params: ValueFormatterParams) => faNumber(params.value),
      width: 100,
      minWidth: 100,
      resizable: false,
    },
    {
      headerName: fa.createExam.contents,
      field: 'contents',
      valueFormatter: (params: ValueFormatterParams): string =>
        params.value.map((k: { content: string }) => k.content).join(' - ') || '-',
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
    {
      headerName: fa.createExam.isGeneral,
      field: 'isGeneral',
      cellRenderer: RenderBoolean,
      width: 65,
      minWidth: 65,
      resizable: false,
    },
    {
      headerName: fa.global.action,
      cellRenderer: ActionRenderer,
      pinned: 'left',
      lockPosition: 'left',
      width: 120,
      minWidth: 120,
      resizable: false,
      cellRendererParams: {
        excelAction: true,
        setEditData: setExamData,
        deleteAction: DeleteExamAction,
        tag,
        deleteMessage,
      },
    },
  ];

  return <Table {...{ columns, emptyMessage, data }} className="h-full w-full" />;
};

export default ExamsTable;
