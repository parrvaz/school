'use client';

import React, { useState } from 'react';
import { StudentType } from 'app/types/common.type';
import fa from 'app/lib/fa.json';
import ActionRenderer from 'app/components/actionRenderer';
import Table from 'app/components/table';
import CreateNewStudent from './createNewStudent';

const StudentsTable: React.FC<{ data: StudentType[] }> = ({ data }) => {
  const [studentData, setStudentData] = useState<StudentType | boolean>(false);

  const columns = [
    {
      headerName: fa.student.lastName,
      field: 'lastName',
      pinned: 'right',
      lockPosition: 'right',
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
      cellRendererParams: { setEditData: setStudentData },
    },
  ];
  return (
    <div>
      <Table columns={columns} data={data} className="h-full w-full" />
      <CreateNewStudent studentData={studentData} setStudentData={setStudentData} />
    </div>
  );
};

export default StudentsTable;
