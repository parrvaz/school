import React from 'react';
import { redirect } from 'next/navigation';
import { Metadata } from 'next';
import fa from 'app/lib/fa.json';
import { fetchData } from 'app/lib/server.util';
import { ShowAbsentsUrl } from 'app/lib/urls';
import { PageType, StudentType } from 'app/types/common.type';
import AbsentsTable from './absentsTable';
import { convertToJalali, getTody } from 'app/utils/common.util';
import { GradeRoute } from 'app/lib/routes';

export const metadata: Metadata = { title: fa.sidebar.absents };

const AbsentsPage: React.FC<PageType> = async ({ params, searchParams }) => {
  const date = searchParams?.date;

  if (!date) redirect(GradeRoute(params.gradeId, 'absents', `?date=${getTody(true)}`));
  const jalaliDate = convertToJalali(date || '');

  const data = await fetchData<StudentType[]>(ShowAbsentsUrl(params.gradeId, date));

  return (
    <div className="">
      <h1 className="font-bold text-berry100 text-24 mb-10">{fa.sidebar.absents}</h1>
      <AbsentsTable {...{ data, jalaliDate }} />
    </div>
  );
};

export default AbsentsPage;
