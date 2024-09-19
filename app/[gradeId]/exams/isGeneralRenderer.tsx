import React from 'react';

const IsGeneralRenderer: React.FC<{ value: boolean }> = ({ value }) =>
  value ? <i className="icon-check text-20" /> : <i className="icon-close text-24" />;
export default IsGeneralRenderer;
