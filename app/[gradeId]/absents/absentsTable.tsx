'use client';

import React, { useState } from 'react';
import { ValueFormatterParams } from 'ag-grid-community';
import AppDatePicker from 'app/components/datePicker';
import Table from 'app/components/table';
import { getTody } from 'app/utils/common.util';
import fa from 'app/lib/fa.json';
import AbsentStatus from './absentStatus';

const AbsentsTable: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(getTody());

  const data = [
    {
      classroom: 'as',
      classroom_id: 12,
      students: [
        {
          student: 'علی',
          student_id: 1,
          fatherPhone: '09234234323',
          bells: {
            bell1: { reporter: 'sss', status: 'absent' },
            bell2: { reporter: 'sss', status: 'absent' },
          },
        },
        {
          student: 'بثی علی',
          student_id: 3,
          fatherPhone: '09234234323',
          bells: {
            bell1: { reporter: 'aaa', status: 'notRegistered' },
            bell2: { reporter: 'aaa', status: 'absent' },
          },
        },
      ],
    },
    {
      classroom: 'bb',
      classroom_id: 13,
      students: [
        {
          student: 'ddd',
          student_id: 22,
          fatherPhone: '09234234323',
          bells: {
            bell1: { reporter: 'ddd', status: 'present' },
            bell2: { reporter: 'dddd', status: 'present' },
          },
        },
        {
          student: 'sds علی',
          student_id: 23,
          fatherPhone: '09234234323',
          bells: {
            bell1: { reporter: 'eee', status: 'present' },
            bell2: { reporter: 'sss', status: 'present' },
          },
        },
      ],
    },
  ];

  const rowData = data.flatMap((classroom) => [
    {
      classroom: classroom.classroom,
      classroom_id: classroom.classroom_id,
      fatherPhone: '', // Empty for classroom row
      student: classroom.classroom, // Classroom name displayed
      bells: classroom.students[0].bells, // Empty bells for classroom row
    },
    ...classroom.students.map((student) => ({
      classroom: '',
      classroom_id: '',
      fatherPhone: student.fatherPhone,
      student: student.student,
      bells: student.bells,
    })),
  ]);
  const bells = Object.keys(data[0].students[0].bells);

  const columns = [
    {
      headerName: fa.absents.studentName,
      field: 'student',
      lockPosition: 'right',
      minWidth: 110,
      colSpan: (params: ValueFormatterParams) =>
        params.data.classroom ? Object.keys(params.data.bells).length + 2 : 1,
    },
    ...bells.map((bell) => ({
      headerName: fa.global[bell as keyof typeof fa.global],
      field: 'bells',
      cellRenderer: AbsentStatus,
      cellRendererParams: { bell },
    })),
    { headerName: fa.absents.fatherPhone, field: 'fatherPhone', minWidth: 130 },
  ];

  return (
    <div>
      <div className="flex gap-3 mx-auto mb-6">
        <AppDatePicker className="w-52" value={selectedDate} onChange={setSelectedDate} />
      </div>
      <div className="">
        {['absentReporter', 'presentReporter', 'notRegistered'].map((key) => (
          <div key={key} className="font-light text-12 text-berry80 flex items-center">
            <i className="icon-info-circle text-16 ml-1" />
            {fa.absents[key as keyof typeof fa.absents]}
          </div>
        ))}
      </div>
      <Table
        {...{ columns }}
        data={rowData}
        getRowStyle={(params) =>
          params.data.classroom
            ? { backgroundColor: '#3730a3', fontWeight: 'bold', color: '#fff' }
            : undefined
        }
        className="h-full w-full"
      />
    </div>
  );
};

export default AbsentsTable;
