import React from 'react';
import fa from 'app/lib/fa.json';
import { faNumber } from 'app/utils/common.util';

const Absents: React.FC = () => {
  return (
    <div className="bg-white flex items-center justify-between rounded-lg p-3">
      <div className="font-regular text-16">{fa.dashboard.absentsTody}</div>
      <div className="font-bold text-18">{faNumber(3)}</div>
    </div>
  );
};

export default Absents;
