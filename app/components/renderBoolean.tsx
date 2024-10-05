import React from 'react';

const RenderBoolean: React.FC<{ value: boolean }> = ({ value }) => (
  <div className="h-full isCenter">
    {value ? <i className="icon-check text-20" /> : <i className="icon-close text-24" />}
  </div>
);
export default RenderBoolean;
