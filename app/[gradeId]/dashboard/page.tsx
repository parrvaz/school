import React from 'react';
import { Metadata } from 'next';
import fa from 'app/lib/fa.json';
import { fetchData, schedulesTag } from 'app/lib/server.util';
import { InboxMessageUrl, ShowAbsentsUrl, ShowSchedulesUrl } from 'app/lib/urls';
import { AbsentsType, MessagesType, PageType, ScheduleDataType } from 'app/types/common.type';
import Absents from './absents';
import LastMessages from './lastMessages';
import { getTody } from 'app/utils/common.util';
import Schedule from './schedule';

export const metadata: Metadata = { title: fa.sidebar.dashboard };

const DashboardPage: React.FC<PageType> = async ({ params }) => {
  const [inbox, schedules] = await Promise.all([
    fetchData<MessagesType[]>(InboxMessageUrl(params.gradeId)),
    fetchData<ScheduleDataType[]>(ShowSchedulesUrl(params.gradeId), await schedulesTag()),
    // fetchData<AbsentsType[]>(ShowAbsentsUrl(params.gradeId, getTody(true))),
  ]);

  console.log(schedules);
  return (
    <div className="">
      <h1 className="font-bold text-berry100 text-24 mb-10">{fa.sidebar.dashboard}</h1>
      <div className="flex gap-3">
        <div className="flex-grow-1">
          <Absents />
          <LastMessages inbox={inbox} />
        </div>
        <div className="flex-grow-3">
          <Schedule schedules={schedules} />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
