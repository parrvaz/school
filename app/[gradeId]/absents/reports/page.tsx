import React from 'react';
import { redirect } from 'next/navigation';
import { Metadata } from 'next';
import fa from 'app/lib/fa.json';
import { absentsTag, fetchData } from 'app/lib/server.util';
import { ShowAbsentsUrl } from 'app/lib/urls';
import { AbsentsType, PageType } from 'app/types/common.type';
import AbsentsTable from './absentsTable';
import { getTody } from 'app/utils/common.util';
import { GradeRoute } from 'app/lib/routes';
import ReportTable from './reportTable';

export const metadata: Metadata = { title: fa.sidebar.absents };

const AbsentsReportPage: React.FC<PageType> = async ({ params, searchParams }) => {
  const date = searchParams?.date;

  //   if (!date) redirect(GradeRoute(params.gradeId, 'absents', `?date=${getTody()}`));
  //   const jalaliDate = date || '';

  //   const data = await fetchData<AbsentsType[]>(
  //     ShowAbsentsUrl(params.gradeId, date),
  //     await absentsTag()
  //   );

  return (
    <div className="">
      <h1 className="font-bold text-berry100 text-24 mb-10">{fa.absents.reportAbsents}</h1>
      <ReportTable />
    </div>
  );
};

export default AbsentsReportPage;
