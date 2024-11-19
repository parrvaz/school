'use client';

import React from 'react';
import { ValueFormatterParams } from 'ag-grid-community';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import AppDatePicker from 'app/components/datePicker';
import Table from 'app/components/table';
import fa from 'app/lib/fa.json';
import AbsentStatus from './absentStatus';
import { GradeRoute } from 'app/lib/routes';
import { AbsentsType } from 'app/types/common.type';
import Button from 'app/components/button';
import JustifyRenderer from './justifyRenderer';

const AbsentsTable: React.FC<{ jalaliDate: string; tag: string; data: AbsentsType[] }> = ({
  data,
  jalaliDate,
  tag,
}) => {
  const router = useRouter();
  const { gradeId } = useParams();
  const emptyMessage = fa.absents.noAbsents;

  const rowData = data.flatMap((classroom) => [
    {
      classroom: classroom.classroom,
      classroom_id: classroom.classroom_id,
      fatherPhone: '', // Empty for classroom row
      action: '',
      student: classroom.classroom, // Classroom name displayed
      bells: classroom.students[0]?.bells, // Empty bells for classroom row
    },
    ...classroom.students.map((student) => ({
      classroom: '',
      classroom_id: '',
      fatherPhone: student.fatherPhone,
      student: student.student,
      student_id: student.student_id,
      bells: student.bells,
    })),
  ]);
  const bells = Object.keys(data[0]?.students[0]?.bells || {});

  const columns = [
    {
      headerName: fa.absents.studentName,
      field: 'student',
      lockPosition: 'right',
      minWidth: 150,
      width: 150,
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
    {
      headerName: fa.absents.justify,
      cellRenderer: JustifyRenderer,
      cellRendererParams: { jalaliDate, tag },
      pinned: 'left',
      lockPosition: 'left',
      width: 100,
      minWidth: 100,
      resizable: false,
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center w-full mb-6">
        <div className="flex gap-3">
          <AppDatePicker
            className="w-52"
            value={jalaliDate}
            onChange={(date) => router.push(GradeRoute(gradeId, 'absents', `?date=${date}`))}
          />
        </div>
        <Link href={GradeRoute(gradeId, 'absents', '/reports')}>
          <Button className="btn btn-outline btn-primary w-28">{fa.absents.reports}</Button>
        </Link>
      </div>
      <div className="grid grid-cols-2">
        {['presentReporter', 'notRegistered', 'justifiedStudents', 'absentReporter'].map((key) => (
          <div key={key} className="font-light text-12 text-berry80 flex items-center">
            <i className="icon-info-circle text-16 ml-1" />
            {fa.absents[key]}
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
