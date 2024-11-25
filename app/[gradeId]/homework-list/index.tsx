'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Button from 'app/components/button';
import fa from 'app/lib/fa.json';
import { GradeRoute } from 'app/lib/routes';
import { HomeworkType } from 'app/types/common.type';
import Table from 'app/components/table';
import RenderBoolean from 'app/components/renderBoolean';
import HomeworkActionRenderer from './homeworkActionRenderer';

const HomeworkList: React.FC<{ data: HomeworkType[] }> = ({ data }) => {
  console.log(data);
  const { gradeId } = useParams();

  const columns = [
    { headerName: fa.global.title, field: 'title', minWidth: 90 },
    { headerName: fa.global.course, field: 'course' },
    {
      headerName: fa.global.classrooms,
      field: 'classrooms',
      valueFormatter: (params) => params.value.map((k) => k.title).join(', '),
    },
    { headerName: fa.homework.modifiedDate, field: 'modifiedDate', width: 110, minWidth: 110 },
    { headerName: fa.homework.date, field: 'date', width: 105, minWidth: 105 },
    { headerName: fa.homework.studentsNumber, field: 'studentsNumber', width: 126, minWidth: 126 },
    { headerName: fa.homework.scoredNumber, field: 'scoredNumber', width: 110, minWidth: 110 },
    {
      headerName: fa.global.isFinal,
      field: 'isFinal',
      cellRenderer: RenderBoolean,
      width: 65,
      minWidth: 65,
      resizable: false,
    },
    {
      headerName: fa.global.action,
      cellRenderer: HomeworkActionRenderer,
      pinned: 'left',
      lockPosition: 'left',
      width: 235,
      minWidth: 235,
      resizable: false,
      // cellRendererParams: {
      //   setEditData: setStudentData,
      //   deleteAction: DeleteStudentAction,
      //   tags,
      //   deleteMessage,
      // },
    },
  ];
  return (
    <div className="relative">
      <Table {...{ columns, data }} className="h-full w-full" />
      <Link
        href={GradeRoute(gradeId, 'homework-list', '?tab=create')}
        className="bg-white fixed bottom-0 w-full left-0 p-3 text-left"
      >
        <Button className="btn btn-primary">{fa.homework.createNewHomework}</Button>
      </Link>
    </div>
  );
};

export default HomeworkList;
