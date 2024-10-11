import React from 'react';
import { Metadata } from 'next';
import fa from 'app/lib/fa.json';
import { absentsTag, examTag, fetchData, getUserRole, schedulesTag } from 'app/lib/server.util';
import { InboxMessageUrl, ShowAbsentsUrl, ShowExamUrl, ShowSchedulesUrl } from 'app/lib/urls';
import {
  AbsentsType,
  ExamType,
  MessagesType,
  PageType,
  ScheduleDataType,
} from 'app/types/common.type';
import Absents from './absents';
import LastMessages from './lastMessages';
// import { getTody } from 'app/utils/common.util';
import Schedule from './schedule';
import LastExams from './lastExams';
import { getTody, roleAccess, ROLES } from 'app/utils/common.util';

export const metadata: Metadata = { title: fa.sidebar.dashboard };

const DashboardPage: React.FC<PageType> = async ({ params }) => {
  const role = (await getUserRole()) || '';
  const accessAbsents = roleAccess([ROLES.manager, ROLES.assistant], role);
  const [inbox, schedules, exams, absents] = await Promise.all([
    fetchData<MessagesType[]>(InboxMessageUrl(params.gradeId)),
    fetchData<ScheduleDataType[]>(ShowSchedulesUrl(params.gradeId), await schedulesTag()),
    fetchData<ExamType[]>(ShowExamUrl(params?.gradeId), await examTag()),
    accessAbsents
      ? fetchData<AbsentsType[]>(ShowAbsentsUrl(params.gradeId, getTody()), await absentsTag())
      : null,
  ]);

  const absentsCount = absents?.reduce((a, b) => a + b.count, 0);

  return (
    <div className="">
      <h1 className="font-bold text-berry100 text-24 mb-10">{fa.sidebar.dashboard}</h1>
      <div className="flex gap-3">
        <div className="flex-grow-1">
          <LastMessages inbox={inbox} />
          {accessAbsents && <Absents absentsCount={absentsCount || 0} />}
        </div>
        <div className="flex-grow-5">
          <Schedule
            adminData={accessAbsents ? schedules : undefined}
            studentData={!accessAbsents ? (schedules as any).schedule : undefined}
            role={role}
          />
          <LastExams data={exams.slice(0, 3)} />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
