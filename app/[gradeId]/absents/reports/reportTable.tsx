'use client';

import { useParams } from 'next/navigation';
import React, { useState } from 'react';
import AppDatePicker from 'app/components/datePicker';
import { GradeRoute } from 'app/lib/routes';
import GroupDatePicker from 'app/components/groupDatePicker';

const ReportTable: React.FC = () => {
  const { gradeId } = useParams();
  const [date, setDate] = useState();
  console.log(1, date);
  return (
    <div>
      <div className="">
        <GroupDatePicker className="w-80" values={date} onChange={setDate} />
      </div>
    </div>
  );
};

export default ReportTable;
