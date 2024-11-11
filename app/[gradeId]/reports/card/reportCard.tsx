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
import CardTable from './cardTable';
import PdfDownload from './pdfDownload';

const ReportCard: React.FC<{
  students: StudentType[] | null;
  exams: ExamType[];
  gradeId: number;
}> = ({ students, exams, gradeId }) => {
  const [data, setData] = useState<{
    table: ProgressType[] | ReportCardType[] | undefined;
    date: GroupDateType;
  }>();

  return (
    <div>
      <Filter {...{ students, exams, setData }} isCard />

      {data?.table?.map((value) => <CardTable key={value.name} data={value} />)}
      {!!data && (
        <PdfDownload gradeId={gradeId} data={data.table as ReportCardType[]} date={data.date} />
      )}
    </div>
  );
};

export default ReportCard;
