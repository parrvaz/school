import React from 'react';
import { Metadata } from 'next';
import fa from 'app/lib/fa.json';
import { classroomTag, fetchData } from 'app/lib/server.util';
import { ShowClassUrl } from 'app/lib/urls';
import { ClassroomType, PageType } from 'app/types/common.type';
import ReportTable from './reportTable';

export const metadata: Metadata = { title: fa.sidebar.absents };

const AbsentsReportPage: React.FC<PageType> = async ({ params }) => {
  const classes = await fetchData<ClassroomType[]>(
    ShowClassUrl(params?.gradeId),
    await classroomTag()
  );

  return (
    <div className="">
      <h1 className="font-bold text-berry100 text-24 mb-10">{fa.absents.reportAbsents}</h1>
      <ReportTable classes={classes} />
    </div>
  );
};

export default AbsentsReportPage;
