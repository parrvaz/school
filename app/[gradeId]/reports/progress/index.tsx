'use client';

import React, { useState } from 'react';

import Filter from '../filter';
import {
  ExamType,
  GroupDateType,
  ProgressType,
  ReportCardType,
  StudentType,
} from 'app/types/common.type';
import LineChart from 'app/components/lineChart';
import fa from 'app/lib/fa.json';

const Progress: React.FC<{
  students: StudentType[] | null;
  exams: ExamType[];
}> = ({ students, exams }) => {
  const i18n = fa.reports.progress;
  const [data, setData] = useState<{
    table: ProgressType[] | ReportCardType[] | undefined;
    date: GroupDateType;
  }>();

  const keys = {
    labelKey: 'date',
    dataKeys: [
      { key: 'score', label: i18n.score },
      { key: 'expected', label: i18n.expected },
      { key: 'average', label: i18n.average },
    ],
  };

  return (
    <div>
      <Filter {...{ students, exams, setData }} />

      <div className="bg-white w-[50rem] mt-10 text-center mx-auto rounded-lg">
        <LineChart
          data={(data?.table as ProgressType[]) || []}
          keys={keys}
          title={i18n.chartTitle}
        />
      </div>
    </div>
  );
};

export default Progress;
