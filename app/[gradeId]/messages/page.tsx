import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import fa from 'app/lib/fa.json';
import { fetchData } from 'app/lib/server.util';
import { InboxMessageUrl } from 'app/lib/urls';
import { MessagesType, PageType } from 'app/types/common.type';
import { GradeRoute } from 'app/lib/routes';
import Inbox from './inbox';
import SendMessage from './sendMessage';

export const metadata: Metadata = { title: fa.sidebar.messages };

const MessagesPage: React.FC<PageType> = async ({ params, searchParams }) => {
  const activeTab = searchParams?.tab || 'inbox';
  const [inbox] = await Promise.all([fetchData<MessagesType[]>(InboxMessageUrl(params.gradeId))]);

  const tabs = ['inbox', 'sentMessages', 'sendMessage'];
  return (
    <div className="">
      <div role="tablist" className="tabs tabs-boxed w-fit bg-white">
        {tabs.map((tab) => (
          <Link
            href={GradeRoute(params.gradeId, 'messages', `?tab=${tab}`)}
            key={tab}
            role="tab"
            className={`${activeTab === tab ? 'tab-active' : ''} tab`}
          >
            {fa.messages[tab as keyof typeof fa.messages]}
          </Link>
        ))}
      </div>

      {/* <Inbox {...{ inbox }} /> */}
      <SendMessage />
    </div>
  );
};

export default MessagesPage;
