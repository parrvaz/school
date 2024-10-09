'use client';

import React from 'react';
import { ValueFormatterParams } from 'ag-grid-community';
import { useParams, useRouter } from 'next/navigation';
import AppDatePicker from 'app/components/datePicker';
import Table from 'app/components/table';
import fa from 'app/lib/fa.json';
import AbsentStatus from './absentStatus';
import { GradeRoute } from 'app/lib/routes';
import { AbsentsType } from 'app/types/common.type';

const AbsentsTable: React.FC<{ jalaliDate: string; data: AbsentsType[] }> = ({
  data,
  jalaliDate,
}) => {
  const router = useRouter();
  const { gradeId } = useParams();
  const emptyMessage = fa.absents.noAbsents;

  const rowData = data.flatMap((classroom) => [
    {
      classroom: classroom.classroom,
      classroom_id: classroom.classroom_id,
      fatherPhone: '', // Empty for classroom row
      student: classroom.classroom, // Classroom name displayed
      bells: classroom.students[0]?.bells, // Empty bells for classroom row
    },
    ...classroom.students.map((student) => ({
      classroom: '',
      classroom_id: '',
      fatherPhone: student.fatherPhone,
      student: student.student,
      bells: student.bells,
    })),
  ]);
  const bells = Object.keys(data[0]?.students[0]?.bells || {});

  const columns = [
    {
      headerName: fa.absents.studentName,
      field: 'student',
      lockPosition: 'right',
      minWidth: 110,
      colSpan: (params: ValueFormatterParams) =>
        params.data.classroom ? Object.keys(params.data.bells || []).length + 2 : 1,
    },
    ...bells.map((bell) => ({
      headerName: fa.global[`bell${bell}` as keyof typeof fa.global],
      field: 'bells',
      cellRenderer: AbsentStatus,
      cellRendererParams: { bell },
    })),
    { headerName: fa.absents.fatherPhone, field: 'fatherPhone', minWidth: 130 },
  ];

  return (
    <div>
      <div className="flex gap-3 mx-auto mb-6">
        <AppDatePicker
          className="w-52"
          value={jalaliDate}
          onChange={(date) => router.push(GradeRoute(gradeId, 'absents', `?date=${date}`))}
        />
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
        {...{ columns, emptyMessage }}
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
