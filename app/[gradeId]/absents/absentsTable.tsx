'use client';

import React, { useState } from 'react';
import AppDatePicker from 'app/components/datePicker';
import ReactSelect from 'app/components/select';
import Table from 'app/components/table';
import { ClassroomType } from 'app/types/common.type';
import { getOption, getTody } from 'app/utils/common.util';
import fa from 'app/lib/fa.json';
import AbsentStatus from './absentStatus';

const AbsentsTable: React.FC<{ classes: ClassroomType[] }> = ({ classes }) => {
  const [selectedDate, setSelectedDate] = useState(getTody());
  const [selectedClass, setSelectedClass] = useState({
    value: classes[0]?.id,
    label: classes[0]?.title,
  });
  const data = [
    {
      student: 'علی',
      student_id: 1,
      fatherPhone: '09234234323',
      bells: { bell1: true, bell2: true, bell3: true, bell4: false, bell5: true, bell6: true },
    },
    {
      student: 'ییب علی',
      student_id: 2,
      fatherPhone: '09234234323',
      bells: { bell1: false, bell2: false, bell3: true, bell4: false, bell5: true, bell6: true },
    },
    {
      student: 'بثی علی',
      student_id: 3,
      fatherPhone: '09234234323',
      bells: { bell1: true, bell2: true, bell3: true, bell4: true, bell5: true, bell6: true },
    },
  ];
  const bells = Object.keys(data[0].bells);

  const columns = [
    {
      headerName: fa.absents.studentName,
      field: 'student',
      pinned: 'right',
      lockPosition: 'right',
      minWidth: 110,
    },
    ...bells.map((bell) => ({
      headerName: fa.global[bell as keyof typeof fa.global],
      field: 'bells',
      cellRenderer: AbsentStatus,
      cellRendererParams: { bell },
    })),
    // { headerName: fa.global.sun, field: 'sun', cellRenderer: RenderBoolean },
    // { headerName: fa.global.mon, field: 'mon', cellRenderer: RenderBoolean },
    // { headerName: fa.global.tue, field: 'tue', cellRenderer: RenderBoolean },
    // { headerName: fa.global.wed, field: 'wed', cellRenderer: RenderBoolean },
    // { headerName: fa.global.thu, field: 'thu', cellRenderer: RenderBoolean },
    { headerName: fa.absents.fatherPhone, field: 'fatherPhone', minWidth: 130 },
  ];
  return (
    <div>
      <div className="flex gap-3 mx-auto mb-6">
        <ReactSelect
          className="w-52"
          value={selectedClass}
          onChange={(e: any) => setSelectedClass(e)} // eslint-disable-line
          options={getOption(classes, 'title')}
        />
        <AppDatePicker className="w-52" value={selectedDate} onChange={setSelectedDate} />
      </div>
      <Table {...{ columns, data }} className="h-full w-full" />
    </div>
  );
};

export default AbsentsTable;
