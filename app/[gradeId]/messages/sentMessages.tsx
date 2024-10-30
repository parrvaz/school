'use client';

import React, { useState } from 'react';
import { SentMessagesType } from 'app/types/common.type';
import fa from 'app/lib/fa.json';
import NoData from 'app/components/noDate';

const SentMessages: React.FC<{ sentMessages: SentMessagesType[] }> = ({ sentMessages }) => {
  const [selectedMessage, setSelectedMessage] = useState<SentMessagesType>();

  return (
    <div className="flex gap-2 mt-10">
      <div className="w-72">
        <div className="font-bold text-14 text-black70 mb-1">{fa.messages.list}</div>
        <div className="min-h-52 h-[calc(100vh-11rem)] overflow-auto bg-white rounded-lg flex flex-col">
          {sentMessages.length ? (
            sentMessages.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedMessage(item)}
                className={`px-3 cursor-pointer border-b border-b-black20 py-2 duration-300 font-regular hover:bg-black20 hover:shadow-note ${item.id === selectedMessage?.id ? 'bg-berry20' : 'bg-white'}`}
              >
                <div className="text-14 overflow-hidden whitespace-nowrap text-ellipsis">
                  {item.subject}
                </div>
                <div className="text-10 overflow-hidden text-ellipsis whitespace-nowrap text-black60">
                  {fa.messages.sentTo} : {item.recipients.map((k) => k.name).join(', ')}
                </div>
              </div>
            ))
          ) : (
            <div className="font-light text-16 m-auto">{fa.messages.noMessage}</div>
          )}
        </div>
      </div>
      <div className="flex-1">
        <div className="font-bold text-14 text-black70 mb-1">{fa.messages.info}</div>
        <div className="min-h-52 h-[calc(100vh-11rem)] overflow-auto bg-white rounded-lg p-4 flex flex-col">
          {selectedMessage ? (
            <div className="">
              <div className="font-bold">{selectedMessage.subject}</div>
              <div className="font-regular text-14 mt-3">{selectedMessage.body}</div>
            </div>
          ) : (
            <NoData className="my-6" />
          )}
        </div>
      </div>
    </div>
  );
};

export default SentMessages;
