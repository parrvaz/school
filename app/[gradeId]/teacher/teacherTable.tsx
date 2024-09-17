'use client';

import React, { useState } from 'react';
import { TeacherType } from 'app/types/common.type';
import fa from 'app/lib/fa.json';
import ActionRenderer from 'app/components/actionRenderer';
import Table from 'app/components/table';
import { DeleteTeacherAction } from 'app/lib/actions';
import { teacherTag } from 'app/lib/server.util';
import CreateNewTeacher from './createNewTeacher';

const TeacherTable: React.FC<{ data: TeacherType[] }> = ({ data }) => {
  const [teacherData, setTeacherData] = useState<TeacherType | boolean>(false);
  const emptyMessage = fa.teacher.noTeacher;
  const tag = teacherTag();
  const columns = [
    {
      headerName: fa.teacher.lastName,
      field: 'lastName',
      pinned: 'right',
      lockPosition: 'right',
    },
    { headerName: fa.teacher.firstName, field: 'firstName' },
    { headerName: fa.teacher.nationalId, field: 'nationalId' },
    { headerName: fa.teacher.degree, field: 'degree' },
    { headerName: fa.teacher.personalId, field: 'personalId' },
    {
      headerName: fa.global.action,
      cellRenderer: ActionRenderer,
      pinned: 'left',
      lockPosition: 'left',
      width: 84,
      minWidth: 84,
      resizable: false,
      cellRendererParams: { setEditData: setTeacherData, deleteAction: DeleteTeacherAction, tag },
    },
  ];
  return (
    <div>
      <Table {...{ columns, emptyMessage, data }} className="h-full w-full" />
      <CreateNewTeacher teacherData={teacherData} setTeacherData={setTeacherData} />
    </div>
  );
};

export default TeacherTable;
