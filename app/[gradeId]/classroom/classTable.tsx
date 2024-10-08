'use client';

import React, { useState } from 'react';
import { ClassroomType } from 'app/types/common.type';
import fa from 'app/lib/fa.json';
import Table from 'app/components/table';
import CreateNewClass from './createNewClass';
import { DeleteClassAction } from 'app/lib/actions';
import ActionRenderer from 'app/components/actionRenderer';

const ClassTable: React.FC<{ data: ClassroomType[]; tag: string }> = ({ data, tag }) => {
  const [classData, setClassData] = useState<ClassroomType | boolean>(false);
  const emptyMessage = fa.classroom.noClassroom;
  const deleteMessage = fa.classroom.deleteMessage;

  const columns = [
    {
      headerName: fa.classroom.title,
      field: 'title',
      pinned: 'right',
      lockPosition: 'right',
    },
    { headerName: fa.classroom.number, field: 'number' },
    { headerName: fa.classroom.field, field: 'field' },
    { headerName: fa.classroom.floor, field: 'floor' },
    {
      headerName: fa.global.action,
      cellRenderer: ActionRenderer,
      pinned: 'left',
      lockPosition: 'left',
      width: 84,
      minWidth: 84,
      resizable: false,
      cellRendererParams: {
        setEditData: setClassData,
        deleteAction: DeleteClassAction,
        tag,
        deleteMessage,
      },
    },
  ];
  return (
    <div className="">
      <Table {...{ columns, emptyMessage, data }} className="h-full w-full" />
      <CreateNewClass classData={classData} setClassData={setClassData} tag={tag} />
    </div>
  );
};

export default ClassTable;
