'use client';

import Table from 'app/components/table';
import fa from 'app/lib/fa.json';
import DeleteRow from './deleteRow';

const ClassroomPage: React.FC = () => {
  const data = [
    {
      id: 9,
      title: 'ریاضی ۱۰۱',
      number: 101,
      floor: 2,
      user_grade_id: 2,
      field_id: 1,
      field: 'ریاضی و فیزیک',
    },
    {
      id: 10,
      title: 'ریاضی ۱۰۲',
      number: 102,
      floor: 2,
      user_grade_id: 2,
      field_id: 1,
      field: 'ریاضی و فیزیک',
    },
    {
      id: 11,
      title: 'تجربی ۱۰۳',
      number: 103,
      floor: 3,
      user_grade_id: 2,
      field_id: 2,
      field: 'تجربی',
    },
  ];

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
      cellRenderer: DeleteRow,
      pinned: 'left',
      lockPosition: 'left',
      width: 75,
      resizable: false,
    },
  ];
  return (
    <div className="">
      <Table columns={columns} data={data} className="h-full w-full" />
    </div>
  );
};

export default ClassroomPage;
