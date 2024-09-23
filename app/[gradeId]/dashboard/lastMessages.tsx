import React from 'react';
import fa from 'app/lib/fa.json';
import { MessagesType } from 'app/types/common.type';
import Message from 'app/components/message';

const LastMessages: React.FC<{ inbox: MessagesType[] }> = ({ inbox }) => {
  return (
    <div className="bg-white mt-3 rounded-lg overflow-hidden pt-3">
      <div className="font-regular text-16 mb-2 px-3">{fa.dashboard.lastMessages}</div>
      <div className="">
        {inbox.slice(0, 3).map((k) => (
          <Message message={k} />
        ))}
      </div>
    </div>
  );
};

export default LastMessages;
