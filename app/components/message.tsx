'use client';

import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useParams, usePathname } from 'next/navigation';
import { MessagesType } from 'app/types/common.type';
import Modal from './modal';
import { ReadMessageAction } from 'app/lib/actions';
import { revalidatePage } from 'app/lib/server.util';

const Message: React.FC<{
  message: MessagesType;
  onClick?: () => void;
  isActive?: boolean;
  disabled?: boolean;
  isDashboard?: boolean;
}> = ({ message, onClick, isActive, disabled, isDashboard }) => {
  const [selectedMessage, setSelectedMessage] = useState<MessagesType | null>(null);
  const { gradeId } = useParams();
  const path = usePathname();

  const { mutate } = useMutation({
    mutationFn: (id: number) => ReadMessageAction(gradeId.toString(), id),
    onSuccess: (ok) => ok && revalidatePage(path),
  });

  return (
    <div
      key={message.id}
      onClick={() => {
        onClick?.();
        !message.isRead && mutate(message.id);
        isDashboard && setSelectedMessage(message);
      }}
      className={`${disabled ? '' : ' cursor-pointer hover:bg-black20'} px-3 py-1 border-b border-b-black20 last:border-b-none duration-300 ${isActive ? 'bg-berry20' : !message.isRead ? 'font-bold  bg-black10' : 'font-regular bg-white'}`}
    >
      <div className="overflow-hidden mb-0.5 text-14 whitespace-nowrap text-ellipsis">
        {message.sender}
      </div>
      <div className="text-13 overflow-hidden whitespace-nowrap text-ellipsis">
        {message.subject}
      </div>

      <Modal
        open={!!selectedMessage}
        setOpen={() => setSelectedMessage(null)}
        id={`message-${selectedMessage?.id}`}
      >
        <div className="">
          <div className="font-bold">{selectedMessage?.sender}</div>
          <div className="font-regular text-14 mt-3">{selectedMessage?.body}</div>
        </div>
      </Modal>
    </div>
  );
};

export default Message;
