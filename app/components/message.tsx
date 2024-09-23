import { MessagesType } from 'app/types/common.type';
import React from 'react';

const Message: React.FC<{ message: MessagesType; onClick?: () => void; isActive?: boolean }> = ({
  message,
  onClick,
  isActive,
}) => {
  return (
    <div
      key={message.id}
      onClick={onClick}
      className={`px-3 cursor-pointer py-1 duration-300 hover:bg-black20 ${isActive ? 'bg-berry20' : !message.isRead ? 'font-bold  bg-black10' : 'font-regular bg-white'}`}
    >
      <div className="overflow-hidden mb-0.5 text-14 whitespace-nowrap text-ellipsis">
        {message.sender}
      </div>
      <div className="text-13 overflow-hidden whitespace-nowrap text-ellipsis">
        {message.subject}
      </div>
    </div>
  );
};

export default Message;