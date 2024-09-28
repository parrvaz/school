import React from 'react';
import { Metadata } from 'next';
import fa from 'app/lib/fa.json';
import { examTag, fetchData, schedulesTag } from 'app/lib/server.util';
import { InboxMessageUrl, ShowExamUrl, ShowSchedulesUrl } from 'app/lib/urls';
import { ExamType, MessagesType, PageType, ScheduleDataType } from 'app/types/common.type';
import Absents from './absents';
import LastMessages from './lastMessages';
// import { getTody } from 'app/utils/common.util';
import Schedule from './schedule';
import LastExams from './lastExams';

export const metadata: Metadata = { title: fa.sidebar.dashboard };

const DashboardPage: React.FC<PageType> = async ({ params }) => {
  const [inbox, schedules, exams] = await Promise.all([
    fetchData<MessagesType[]>(InboxMessageUrl(params.gradeId)),
    fetchData<ScheduleDataType[]>(ShowSchedulesUrl(params.gradeId), await schedulesTag()),
    fetchData<ExamType[]>(ShowExamUrl(params?.gradeId), await examTag()),
    // fetchData<AbsentsType[]>(ShowAbsentsUrl(params.gradeId, getTody(true))),
  ]);

  return (
    <div className="">
      <h1 className="font-bold text-berry100 text-24 mb-10">{fa.sidebar.dashboard}</h1>
      <div className="flex gap-3">
        <div className="flex-grow-1">
          <LastMessages inbox={inbox} />
          <Absents />
        </div>
        <div className="flex-grow-3">
          <Schedule schedules={schedules} />
          <LastExams data={exams.slice(0, 3)} />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
