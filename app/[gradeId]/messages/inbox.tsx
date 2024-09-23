'use client';

import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useParams, usePathname } from 'next/navigation';
import { MessagesType } from 'app/types/common.type';
import fa from 'app/lib/fa.json';
import NoData from 'app/components/noDate';
import { ReadMessageAction } from 'app/lib/actions';
import { revalidatePage } from 'app/lib/server.util';
import Message from 'app/components/message';

const Inbox: React.FC<{ inbox: MessagesType[] }> = ({ inbox }) => {
  const { gradeId } = useParams();
  const path = usePathname();
  const [selectedMessage, setSelectedMessage] = useState<MessagesType>();

  const { mutate } = useMutation({
    mutationFn: (id: number) => ReadMessageAction(gradeId.toString(), id),
    onSuccess: (ok) => ok && revalidatePage(path),
  });

  return (
    <div className="flex gap-2 mt-10">
      <div className="w-72">
        <div className="font-bold text-14 text-black70 mb-1">{fa.messages.list}</div>
        <div className="min-h-52 max-h-[calc(100vh-12rem)] overflow-auto bg-white rounded-lg flex flex-col">
          {inbox.length ? (
            inbox.map((item) => (
              <Message
                message={item}
                onClick={() => {
                  setSelectedMessage(item);
                  !item.isRead && mutate(item.id);
                }}
                isActive={item.id === selectedMessage?.id}
              />
            ))
          ) : (
            <div className="font-light text-16 m-auto">{fa.messages.noMessage}</div>
          )}
        </div>
      </div>
      <div className="flex-1">
        <div className="font-bold text-14 text-black70 mb-1">{fa.messages.info}</div>
        <div className="min-h-52 max-h-[calc(100vh-12rem)] overflow-auto bg-white rounded-lg p-4 flex flex-col">
          {selectedMessage ? (
            <div className="">
              <div className="font-bold">{selectedMessage.sender}</div>
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

export default Inbox;
