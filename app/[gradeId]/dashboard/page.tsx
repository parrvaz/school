import React from 'react';
import { Metadata } from 'next';
import fa from 'app/lib/fa.json';
import {
  absentsTag,
  examTag,
  fetchData,
  getUserRole,
  schedulesTag,
  scoreTag,
} from 'app/lib/server.util';
import {
  CardUrl,
  InboxMessageUrl,
  ShowAbsentsUrl,
  ShowExamUrl,
  ShowSchedulesUrl,
  ShowScoreUrl,
} from 'app/lib/urls';
import {
  AbsentsType,
  ExamType,
  MessagesType,
  PageType,
  ReportCardType,
  ScheduleDataType,
  ScoreType,
} from 'app/types/common.type';
import Absents from './absents';
import LastMessages from './lastMessages';
import Schedule from './schedule';
import LastExams from './lastExams';
import { getTody, roleAccess, ROLES } from 'app/utils/common.util';
import LastScores from './lastScores';
import MonthCard from './monthCard';

export const metadata: Metadata = { title: fa.sidebar.dashboard };

const DashboardPage: React.FC<PageType> = async ({ params }) => {
  const role = (await getUserRole()) || '';
  const admin = roleAccess([ROLES.student, ROLES.parent], role, true);
  const [inbox, schedules, exams, absents, scores, card] = await Promise.all([
    fetchData<MessagesType[]>(InboxMessageUrl(params.gradeId)),
    fetchData<ScheduleDataType[]>(ShowSchedulesUrl(params.gradeId), await schedulesTag()),
    fetchData<ExamType[]>(ShowExamUrl(params?.gradeId), await examTag()),
    admin
      ? fetchData<AbsentsType[]>(ShowAbsentsUrl(params.gradeId, getTody()), await absentsTag())
      : null,
    role === ROLES.parent
      ? fetchData<ScoreType[]>(ShowScoreUrl(params.gradeId), await scoreTag())
      : null,
    !admin
      ? fetchData<ReportCardType>(CardUrl(params.gradeId, getTody(false, false, 30), getTody()))
      : null,
  ]);

  const absentsCount = absents?.reduce((a, b) => a + b.count, 0);

  return (
    <div className="">
      <h1 className="font-bold text-berry100 text-24 mb-10">{fa.sidebar.dashboard}</h1>
      <div className="flex gap-3">
        <div className="flex-grow-1">
          <LastMessages inbox={role === ROLES.parent ? inbox : inbox.slice(0, 5)} />
          {admin && <Absents absentsCount={absentsCount || 0} />}
          {!admin && card && <MonthCard card={card} />}
        </div>
        <div className="flex-grow-5">
          {scores && <LastScores data={scores} />}
          <Schedule
            adminData={admin ? schedules : undefined}
            studentData={!admin ? (schedules as any).schedule : undefined}
          />
          <LastExams data={exams.sort((a, b) => (a.date < b.date ? 1 : -1)).slice(0, 5)} />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
