'use client';

import React from 'react';
import BellsTime from './bellsTime';
import { BellsType, ClassroomType, CourseType } from 'app/types/common.type';
import Schedule from './schedule';

const Bells: React.FC<{
  bells: BellsType[];
  tag: string;
  classes: ClassroomType[];
  courses: CourseType[];
}> = ({ bells, tag, classes, courses }) => {
  return (
    <div>
      <BellsTime {...{ bells, tag }} />
      <Schedule {...{ classes, courses }} />
    </div>
  );
};

export default Bells;
