'use client';

import React, { useState } from 'react';
import { CourseType, StudyPageType, StudyType } from 'app/types/common.type';
import StudyCalendar from 'app/components/studyCalendar';
import { useMutation } from '@tanstack/react-query';
import Button from 'app/components/button';
import fa from 'app/lib/fa.json';
import { useParams } from 'next/navigation';
import { UpdateStudyAction } from 'app/lib/actions';

const Study: React.FC<{ data: StudyPageType | null; courses: CourseType[] }> = ({
  data,
  courses,
}) => {
  const [events, setEvents] = useState<StudyType[]>(data?.plan || []);
  const { gradeId } = useParams();

  const { mutate, isPending } = useMutation({
    mutationFn: () => UpdateStudyAction(events, gradeId.toString()),
  });
  return (
    <div className="relative pb-8">
      <StudyCalendar {...{ courses, events, setEvents }} />

      <Button
        onClick={() => mutate()}
        className="btn btn-primary fixed right-64 bottom-4"
        isLoading={isPending}
      >
        {fa.global.submit}
      </Button>
    </div>
  );
};

export default Study;
