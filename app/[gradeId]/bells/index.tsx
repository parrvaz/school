'use client';

import React, { useState } from 'react';
import BellsTime from './bellsTime';
import { BellsType, ClassroomType, CourseType } from 'app/types/common.type';
import Schedule from './schedule';

const Bells: React.FC<{
  bells: BellsType[];
  tag: string;
  classes: ClassroomType[];
  courses: CourseType[];
}> = ({ bells, tag, classes, courses }) => {
  const [showBells, setShowBells] = useState(!bells.length);
  return (
    <div>
      {showBells ? (
        <BellsTime {...{ bells, tag, setShowBells }} />
      ) : (
        <Schedule {...{ classes, courses, setShowBells }} />
      )}
    </div>
  );
};

export default Bells;
