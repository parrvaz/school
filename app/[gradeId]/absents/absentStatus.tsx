import React from 'react';

const AbsentStatus: React.FC<{
  value: Record<string, { reporter: string; status: string }>;
  bell: string;
}> = ({ value, bell }) => {
  if (!value) return '-';
  const { status, reporter } = value?.[Number(bell)];
  const style = {
    absent: 'bg-red10 text-red80',
    justified: 'text-berry90 bg-berry10',
    present: 'text-green80 bg-green10',
    notRegistered: 'text-sun80 bg-sun20',
  };
  return (
    <div className={`h-full pr-1 ${style[status]}`}>
      {status === 'present' ? (
        <i className="icon-check text-18" />
      ) : status === 'absent' || status === 'justified' ? (
        reporter
      ) : (
        '-'
      )}
    </div>
  );
};
export default AbsentStatus;
