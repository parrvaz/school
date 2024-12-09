'use client';

import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import Filter from '../filter';
import Button from 'app/components/button';
import fa from 'app/lib/fa.json';
import { DownloadCardExcelAction } from 'app/lib/actions';
import {
  ExamType,
  GroupDateType,
  ProgressType,
  ReportCardType,
  StudentType,
} from 'app/types/common.type';
import CardTable from './cardTable';

const ReportCard: React.FC<{
  students: StudentType[] | null;
  exams: ExamType[];
  grade: number;
}> = ({ students, exams }) => {
  const { gradeId } = useParams();
  const [data, setData] = useState<{
    table: ProgressType[] | ReportCardType[] | undefined;
    date: GroupDateType;
  }>();

  const { mutate: downloadExcel, isPending: excelPending } = useMutation({
    mutationFn: () =>
      DownloadCardExcelAction(
        gradeId.toString(),
        data?.date || {},
        `${fa.reports.card.personCardExcel}-${data?.date?.startDate}-${data?.date?.endDate}}`
      ),
  });

  return (
    <div>
      <Filter {...{ students, exams, setData }} isCard />

      {data?.table?.map((value) => <CardTable key={value.name} data={value} />)}
      {!!data?.table && (
        <div className="fixed bottom-0 flex justify-end left-0 text-end bg-white w-screen p-3 z-[2]">
          {/* <PdfDownload gradeId={grade} data={data.table as ReportCardType[]} date={data.date} /> */}
          <Button
            isLoading={excelPending}
            onClick={() => downloadExcel()}
            className="btn btn-primary"
          >
            <i className="icon-excel text-20" />
            {fa.reports.card.personCardExcel}
          </Button>
        </div>
      )}
    </div>
  );
};

export default ReportCard;
