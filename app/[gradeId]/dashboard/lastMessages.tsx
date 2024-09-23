import React from 'react';
import fa from 'app/lib/fa.json';
import { MessagesType } from 'app/types/common.type';

const LastMessages: React.FC<{ inbox: MessagesType[] }> = ({ inbox }) => {
  return (
    <div className="bg-white mt-3 rounded-lg p-3">
      <div className="font-regular text-16">{fa.dashboard.lastMessages}</div>
      <div className="">
        {inbox.slice(0, 3).map((k) => (
          <div className="" key={k.id}>
            {k.sender}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LastMessages;
