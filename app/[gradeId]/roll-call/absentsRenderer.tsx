import React from 'react';

const AbsentsRenderer: React.FC<{ value: boolean }> = ({ value }) => {
  return (
    <div className="mt-1">
      {!value ? (
        <i className="icon-check text-20 text-green70" />
      ) : (
        <i className="icon-close text-red70 text-24" />
      )}
    </div>
  );
};
export default AbsentsRenderer;
