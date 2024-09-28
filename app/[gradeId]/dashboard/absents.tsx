import React from 'react';
import fa from 'app/lib/fa.json';
import { faNumber } from 'app/utils/common.util';

const Absents: React.FC = () => {
  return (
    <div className="">
      <div className="font-bold text-14 mb-1 mt-3">{fa.dashboard.absentsTody}</div>
      <div className="font-bold text-16 bg-white flex items-center justify-end rounded-lg px-3 py-2">
        {faNumber('3')}
      </div>
    </div>
  );
};

export default Absents;
