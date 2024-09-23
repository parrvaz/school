import React from 'react';
import fa from 'app/lib/fa.json';

const LastMessages: React.FC = () => {
  return (
    <div className="bg-white mt-3 rounded-lg p-3">
      <div className="font-regular text-16">{fa.dashboard.lastMessages}</div>
    </div>
  );
};

export default LastMessages;
