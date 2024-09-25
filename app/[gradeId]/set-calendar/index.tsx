'use client';

import React from 'react';
import MyCalendar from 'app/components/appCalendar';
import { CourseType } from 'app/types/common.type';

const SetCalendar: React.FC<{ courses: CourseType[] }> = ({ courses }) => {
  return (
    <div>
      <MyCalendar courses={courses} />
    </div>
  );
};

export default SetCalendar;
