import React from 'react';
import { MessagesType } from 'app/types/common.type';

const Message: React.FC<{
  message: MessagesType;
  onClick?: () => void;
  isActive?: boolean;
  disabled?: boolean;
}> = ({ message, onClick, isActive, disabled }) => {
  return (
    <div
      key={message.id}
      onClick={onClick}
      className={`${disabled ? '' : ' cursor-pointer hover:bg-black20'} px-3 py-1 border-b border-b-black20 last:border-b-none duration-300 ${isActive ? 'bg-berry20' : !message.isRead ? 'font-bold  bg-black10' : 'font-regular bg-white'}`}
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
