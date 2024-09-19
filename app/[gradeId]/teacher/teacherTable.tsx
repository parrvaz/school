'use client';

import React, { useState } from 'react';
import { TeacherType } from 'app/types/common.type';
import fa from 'app/lib/fa.json';
import ActionRenderer from 'app/components/actionRenderer';
import Table from 'app/components/table';
import { DeleteTeacherAction } from 'app/lib/actions';
import CreateNewTeacher from './createNewTeacher';
import RenderBoolean from 'app/components/renderBoolean';

const TeacherTable: React.FC<{ data: TeacherType[]; tag: string }> = ({ data, tag }) => {
  const [teacherData, setTeacherData] = useState<TeacherType | boolean>(false);
  const emptyMessage = fa.teacher.noTeacher;

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
      headerName: fa.teacher.assistant,
      field: 'isAssistant',
      cellRenderer: RenderBoolean,
      width: 60,
      minWidth: 60,
      resizable: false,
    },
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
      <CreateNewTeacher teacherData={teacherData} setTeacherData={setTeacherData} tag={tag} />
    </div>
  );
};

export default TeacherTable;
