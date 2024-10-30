'use client';

import { useEffect, useState } from 'react';
import { faNumber, getTody } from 'app/utils/common.util';

const DateTimeDisplay: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date): string =>
    date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
  const today = getTody();

  return (
    <div className="flex items-center text-black70 font-light text-14">
      <div>{isClient ? faNumber(formatTime(currentTime)) : null}</div>
      <div className="h-6 border-r border-r-black30 mx-2" />
      <div>{faNumber(today)}</div>
    </div>
  );
};

export default DateTimeDisplay;
