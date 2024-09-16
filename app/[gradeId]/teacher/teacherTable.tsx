'use client';

import React from 'react';
import { TeacherType } from 'app/types/common.type';
import fa from 'app/lib/fa.json';
import ActionRenderer from 'app/components/actionRenderer';
import Table from 'app/components/table';
import { DeleteTeacherAction } from 'app/lib/actions';

const TeacherTable: React.FC<{ data: TeacherType[] }> = ({ data }) => {
  //   const [teacherData, setTeacherData] = useState<TeacherType | boolean>(false);

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
      cellRendererParams: {
        // setEditData: setTeacherData,
        deleteAction: DeleteTeacherAction,
        id: 'teacher',
      },
    },
  ];
  return (
    <div>
      <Table columns={columns} data={data} className="h-full w-full" />
      {/* <CreateNewStudent studentData={studentData} setStudentData={setStudentData} /> */}
    </div>
  );
};

export default TeacherTable;
