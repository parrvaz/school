import React from 'react';
import fa from 'app/lib/fa.json';
import { MessagesType } from 'app/types/common.type';
import Message from 'app/components/message';

const LastMessages: React.FC<{ inbox: MessagesType[] }> = ({ inbox }) => {
  return (
    <div className="">
      <div className="font-bold text-14 mb-1">{fa.dashboard.lastMessages}</div>
      <div className="rounded-lg overflow-hidden">
        {inbox.slice(0, 3).map((k) => (
          <Message key={k.id} message={k} disabled />
        ))}
      </div>{' '}
    </div>
  );
};

export default LastMessages;
