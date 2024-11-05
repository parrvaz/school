import React from 'react';
import RenderLayoutLink from './renderLayoutLink';

const ReportsLayout: React.FC<{ children: React.ReactNode }> = async ({ children }) => {
  return (
    <div className="pb-11">
      <RenderLayoutLink />

      <div className="mt-10">{children}</div>
    </div>
  );
};

export default ReportsLayout;
