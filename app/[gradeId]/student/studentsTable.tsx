'use client';

import React, { useState } from 'react';
import { ClassroomType, StudentType } from 'app/types/common.type';
import fa from 'app/lib/fa.json';
import ActionRenderer from 'app/components/actionRenderer';
import Table from 'app/components/table';
import CreateNewStudent from './createNewStudent';
import { DeleteStudentAction } from 'app/lib/actions';

const StudentsTable: React.FC<{ data: StudentType[]; classes: ClassroomType[]; tag: string }> = ({
  data,
  classes,
  tag,
}) => {
  const [studentData, setStudentData] = useState<StudentType | boolean>(false);
  const emptyMessage = fa.student.noStudent;
  const columns = [
    {
      headerName: fa.student.lastName,
      field: 'lastName',
      pinned: 'right',
      lockPosition: 'right',
      minWidth: 100,
    },
    { headerName: fa.student.firstName, field: 'firstName' },
    { headerName: fa.student.classroom, field: 'classroom' },
    { headerName: fa.student.nationalId, field: 'nationalId' },
    { headerName: fa.student.phone, field: 'phone' },
    {
      headerName: fa.global.action,
      cellRenderer: ActionRenderer,
      pinned: 'left',
      lockPosition: 'left',
      width: 84,
      minWidth: 84,
      resizable: false,
      cellRendererParams: { setEditData: setStudentData, deleteAction: DeleteStudentAction, tag },
    },
  ];
  return (
    <div>
      <Table {...{ columns, emptyMessage, data }} className="h-full w-full" />
      <CreateNewStudent {...{ studentData, setStudentData, classes, tag }} />
    </div>
  );
};

export default StudentsTable;
