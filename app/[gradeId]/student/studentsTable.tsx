'use client';

import React, { useState } from 'react';
import { ClassroomType, StudentType } from 'app/types/common.type';
import fa from 'app/lib/fa.json';
import ActionRenderer from 'app/components/actionRenderer';
import Table from 'app/components/table';
import CreateNewStudent from './createNewStudent';
import { DeleteStudentAction } from 'app/lib/actions';
import UploadExcel from './uploadExcel';

const StudentsTable: React.FC<{
  data: StudentType[];
  classes: ClassroomType[];
  tags: string[];
}> = ({ classes, tags, data }) => {
  const [studentData, setStudentData] = useState<StudentType | boolean>(false);
  const emptyMessage = fa.student.noStudent;
  const deleteMessage = fa.student.deleteMessage;

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
      cellRendererParams: {
        setEditData: setStudentData,
        deleteAction: DeleteStudentAction,
        tags,
        deleteMessage,
      },
    },
  ];

  return (
    <div className="relative pb-10">
      <Table {...{ columns, emptyMessage, data }} className="h-full w-full" />
      <div className="flex justify-end mt-6 fixed bottom-0 bg-white90 w-full left-0 p-3 gap-4">
        <UploadExcel {...{ tags }} />
        <CreateNewStudent {...{ studentData, setStudentData, classes, tags }} />
      </div>
    </div>
  );
};

export default StudentsTable;
