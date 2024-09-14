'use client';

import React, { useState } from 'react';
import { ClassroomType } from 'app/types/common.type';
import fa from 'app/lib/fa.json';
import Table from 'app/components/table';
import CreateNewClass from './createNewClass';
import ActionRenderer from '../../components/actionRenderer';

const ClassTable: React.FC<{ data: ClassroomType[] }> = ({ data }) => {
  const [openCreateClassModal, setOpenCreateClassModal] = useState<ClassroomType | boolean>(false);

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
      headerName: fa.classroom.action,
      cellRenderer: ActionRenderer,
      pinned: 'left',
      lockPosition: 'left',
      width: 90,
      resizable: false,
      cellRendererParams: { setEditData: setOpenCreateClassModal },
    },
  ];
  return (
    <div className="">
      <Table columns={columns} data={data} className="h-full w-full" />
      <CreateNewClass classData={openCreateClassModal} setClassData={setOpenCreateClassModal} />
    </div>
  );
};

export default ClassTable;
