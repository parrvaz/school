import React from 'react';

const AbsentStatus: React.FC<{
  value: Record<string, { reporter: string; status: string }>;
  bell: string;
}> = ({ value, bell }) => {
  const { status, reporter } = value[bell];
  console.log(value[bell]);
  return (
    <div
      className={`h-full pr-1 ${status === 'absent' ? 'bg-red10 text-red80' : status === 'present' ? 'text-green80 bg-green10' : 'text-sun80 bg-sun20'}`}
    >
      {reporter}
    </div>
  );
};
export default AbsentStatus;
