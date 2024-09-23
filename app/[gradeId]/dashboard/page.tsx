import React from 'react';
import { Metadata } from 'next';
import fa from 'app/lib/fa.json';
import { fetchData } from 'app/lib/server.util';
import { InboxMessageUrl } from 'app/lib/urls';
import { MessagesType, PageType } from 'app/types/common.type';
import Absents from './absents';
import LastMessages from './lastMessages';

export const metadata: Metadata = { title: fa.sidebar.dashboard };

const DashboardPage: React.FC<PageType> = async ({ params }) => {
  const [inbox] = await Promise.all([fetchData<MessagesType[]>(InboxMessageUrl(params.gradeId))]);

  return (
    <div className="">
      <h1 className="font-bold text-berry100 text-24 mb-10">{fa.sidebar.dashboard}</h1>
      <div className="flex gap-3">
        <div className="flex-grow-1">
          <Absents />
          <LastMessages inbox={inbox} />
        </div>
        <div className="flex-grow-3">2</div>
      </div>
    </div>
  );
};

export default DashboardPage;
