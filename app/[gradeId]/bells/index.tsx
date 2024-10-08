'use client';

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import BellsTime from './bellsTime';
import { BellsType, ClassroomType, CourseType, ScheduleDataType } from 'app/types/common.type';
import Schedule from './schedule';
import { getRole } from 'app/lib/actions';
import { roleAccess, ROLES } from 'app/utils/common.util';
import fa from 'app/lib/fa.json';

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
  const { data: role } = useQuery({ queryKey: ['role'], queryFn: () => getRole() });
  return (
    <div>
      {roleAccess([ROLES.manager], role) && showBells ? (
        <BellsTime {...{ bells, bellsTag, setShowBells }} />
      ) : showBells ? (
        <div className="">{fa.bells.defineBells}</div>
      ) : (
        <Schedule
          {...{ classes, courses, setShowBells, schedules, scheduleTag, bells, coursesTag, role }}
        />
      )}
    </div>
  );
};

export default Bells;
