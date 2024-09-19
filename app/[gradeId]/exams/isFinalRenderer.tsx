import React from 'react';
import fa from 'app/lib/fa.json';

const IsFinalRenderer: React.FC<{ value: boolean }> = ({ value }) =>
  value ? (
    <div className="text-green70 h-full flex items-center">
      <i className="icon-check text-20 ml-1" />
      {fa.createExam.isFinal}
    </div>
  ) : (
    <div className="text-red70 h-full flex items-center">
      <i className="icon-close ml-.5 text-24" />
      {fa.createExam.isNotFinal}
    </div>
  );
export default IsFinalRenderer;
