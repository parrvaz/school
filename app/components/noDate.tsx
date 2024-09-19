import React from 'react';
import Image from 'next/legacy/image';
import fa from 'app/lib/fa.json';

const NoData: React.FC<{
  width?: number;
  message?: string;
  message2?: string;
  className?: string;
}> = ({ width = 200, className = '', message, message2 }) => (
  <div className={`flex flex-col items-center ${className}`}>
    <Image src="/no-data.png" width={width} height={width} alt="no-data" />{' '}
    <div className="mt-8 font-regular text-black60">{message || fa.global.noData}</div>
    {message2 && <div className="mt-1 font-regular text-black60">{message2}</div>}
  </div>
);

export default NoData;
