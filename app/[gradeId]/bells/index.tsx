'use client';

import React, { useState } from 'react';
import BellsTime from './bellsTime';
import { BellsType, ClassroomType, CourseType, ScheduleDataType } from 'app/types/common.type';
import Schedule from './schedule';

const Bells: React.FC<{
  bells: BellsType[];
  bellsTag: string;
  coursesTag: string;
  scheduleTag: string;
  classes: ClassroomType[];
  courses: CourseType[];
  schedules: ScheduleDataType[];
}> = ({ bells, bellsTag, classes, courses, schedules, scheduleTag, coursesTag }) => {
  const [showBells, setShowBells] = useState(!bells.length);
  return (
    <div>
      {showBells ? (
        <BellsTime {...{ bells, bellsTag, setShowBells }} />
      ) : (
        <Schedule
          {...{ classes, courses, setShowBells, schedules, scheduleTag, bells, coursesTag }}
        />
      )}
    </div>
  );
};

export default Bells;
