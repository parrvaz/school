import React from 'react';
import fa from 'app/lib/fa.json';
import { MessagesType } from 'app/types/common.type';
import Message from 'app/components/message';

const LastMessages: React.FC<{ inbox: MessagesType[] }> = ({ inbox }) => {
  return (
    <div className="">
      <div className="font-bold text-14 mb-1">{fa.dashboard.lastMessages}</div>
      <div className="rounded-lg overflow-hidden bg-white">
        {!inbox.length ? (
          <div className="p-2 font-light text-14">{fa.global.noMessage}</div>
        ) : (
          inbox.map((k) => <Message isDashboard key={k.id} message={k} />)
        )}
      </div>{' '}
    </div>
  );
};

export default LastMessages;
