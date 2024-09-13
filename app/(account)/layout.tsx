import React from 'react';

const AccountLayout = ({ children }: { children: React.ReactNode }): React.ReactNode => (
  <div className="isCenter h-screen  bg-berry10  ">
    <div className="flex flex-col items-center rounded-2xl border-2 w-96 border-white md:bg-white50">
      {children}
    </div>
  </div>
);

export default AccountLayout;
