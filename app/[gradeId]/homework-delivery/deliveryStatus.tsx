import React from 'react';
import fa from 'app/lib/fa.json';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const DeliveryStatus: React.FC = (props: any) => {
  const { status } = props.node.data;

  const titles = {
    okSubmitted: <i className="icon-check text-24 text-green70 block my-1.5" />,
    notSubmitted: fa.homework.notSubmitted,
  };

  return (
    <div className={`${!titles[status] && 'text-red70'}`}>
      {titles[status] || `${status} ${fa.homework.delay}`}
    </div>
  );
};

export default DeliveryStatus;
