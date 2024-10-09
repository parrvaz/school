import React from 'react';
import { UserType } from 'app/types/common.type';
import fa from 'app/lib/fa.json';
import DateTimeDisplay from './dateTimeDisplay';
import Logout from './logout';

const AppHeader: React.FC<{ user: UserType }> = ({ user }) => {
  return (
    <div className="bg-white border-b border-b-berry10 fixed px-7 top-0 justify-between left-0 w-screen z-10 h-14 flex items-center">
      <div className="">
        <div className="">
          <div className="text-14 font-bold">{user.name}</div>
          <div className="font-light text-12 -mt-2">{fa.global[user.role]}</div>
        </div>
      </div>
      <div className="flex gap-4 items-center">
        <DateTimeDisplay />
        <Logout />
      </div>
    </div>
  );
};

export default AppHeader;
