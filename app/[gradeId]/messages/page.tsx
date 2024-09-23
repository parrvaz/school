import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import fa from 'app/lib/fa.json';
import { fetchData, studentTag, teacherTag } from 'app/lib/server.util';
import { InboxMessageUrl, SentMessagesUrl, ShowStudentUrl, ShowTeacherUrl } from 'app/lib/urls';
import { MessagesType, PageType, StudentType, TeacherType } from 'app/types/common.type';
import { GradeRoute } from 'app/lib/routes';
import Inbox from './inbox';
import SendMessage from './sendMessage';
import SentMessages from './sentMessages';

export const metadata: Metadata = { title: fa.sidebar.messages };

const MessagesPage: React.FC<PageType> = async ({ params, searchParams }) => {
  const activeTab = searchParams?.tab || 'inbox';
  const [inbox, sentMessages, students, teachers] = await Promise.all([
    fetchData<MessagesType[]>(InboxMessageUrl(params.gradeId)),
    fetchData<MessagesType[]>(SentMessagesUrl(params.gradeId)),
    fetchData<StudentType[]>(ShowStudentUrl(params.gradeId), await studentTag()),
    fetchData<TeacherType[]>(ShowTeacherUrl(params.gradeId), await teacherTag()),
  ]);

  const studentsOption = students.map((k) => ({ value: k.user_id, label: k.name }));
  const parentOption = students.map((k) => ({
    value: k.parent_id,
    label: fa.messages.parents + ' ' + k.name,
  }));
  const teachersOption = teachers
    .filter((k) => !k.isAssistant)
    .map((k) => ({ value: k.user_id, label: k.name }));
  const assistantOption = teachers
    .filter((k) => k.isAssistant)
    .map((k) => ({ value: k.user_id, label: k.name }));

  const options = { 1: studentsOption, 2: parentOption, 3: teachersOption, 4: assistantOption };

  const tabs = ['inbox', 'sentMessages', 'sendMessage'];
  const components = {
    inbox: <Inbox {...{ inbox }} />,
    sentMessages: <SentMessages {...{ sentMessages }} />,
    sendMessage: <SendMessage options={options} />,
  };
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

      {components[activeTab as keyof typeof components]}
    </div>
  );
};

export default MessagesPage;
