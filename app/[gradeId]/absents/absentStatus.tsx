import React from 'react';

const AbsentStatus: React.FC<{ value: Record<string, boolean>; bell: string }> = ({
  value,
  bell,
}) => {
  return (
    <div className="py-1">
      {value[bell] ? (
        <i className="icon-check text-20 text-green70" />
      ) : (
        <i className="icon-close text-red70 h-full text-24" />
      )}
    </div>
  );
};
export default AbsentStatus;
