import React from 'react';

const CellRenderer: React.FC<{ value: string }> = ({ value }) => {
  return <div className="cursor-pointer">{value || '-'}</div>;
};

export default CellRenderer;
