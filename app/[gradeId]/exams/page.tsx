import React from 'react';
import { Metadata } from 'next';
import fa from 'app/lib/fa.json';
import { ExamType, PageType } from 'app/types/common.type';
import { examTag, fetchData } from 'app/lib/server.util';
import { ShowExamUrl } from 'app/lib/urls';
import ExamsTable from './examsTable';

export const metadata: Metadata = { title: fa.sidebar.teacher };

const ExamPage: React.FC<PageType> = async ({ params }) => {
  const data = await fetchData<ExamType[]>(ShowExamUrl(params?.gradeId), await examTag());

  return (
    <div className="">
      <h1 className="font-bold text-berry100 text-24 mb-10">{fa.sidebar.exams}</h1>
      <ExamsTable {...{ data }} tag={await examTag()} />
    </div>
  );
};

export default ExamPage;
