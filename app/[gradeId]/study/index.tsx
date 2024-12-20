'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import ReactSelect from 'react-select';
import {
  CourseType,
  SingleOptionType,
  StudentType,
  StudyPageType,
  StudyType,
} from 'app/types/common.type';
import StudyCalendar from 'app/components/studyCalendar';
import fa from 'app/lib/fa.json';
import { CreateStudyAction, DeleteStudyAction } from 'app/lib/actions';
import { getOption, ROLES } from 'app/utils/common.util';
import { GradeRoute } from 'app/lib/routes';
import { tagRevalidate } from 'app/lib/server.util';

const Study: React.FC<{
  data: StudyPageType | null;
  courses: CourseType[];
  students: StudentType[] | null;
  studentId?: string;
  tag: string;
  role: string;
}> = ({ data, courses, students, studentId, tag, role }) => {
  const router = useRouter();
  const { gradeId } = useParams();
  const [events, setEvents] = useState<StudyType[]>(data?.plan || []);
  const studentsOption = useMemo(() => getOption(students || []), [students]);
  const selectedStudent = useMemo(
    () => students?.find((k) => k.id === Number(studentId)),
    [studentId, students]
  );

  const { mutateAsync: mutate, isPending } = useMutation({
    mutationFn: (event: StudyType) =>
      CreateStudyAction(event, gradeId.toString(), selectedStudent?.id.toString() || ''),
    onSuccess: (ok) => {
      if (ok) {
        tagRevalidate(tag);
      }
    },
  });

  const { mutateAsync: deleteMutate, isPending: deleteLoading } = useMutation({
    mutationFn: (id: number) => DeleteStudyAction(id, gradeId.toString()),
    onSuccess: (ok) => {
      if (ok) {
        tagRevalidate(tag);
      }
    },
  });

  useEffect(() => {
    setEvents(data?.plan || []);
  }, [data]);
  return (
    <div className="relative pb-8">
      {role !== ROLES.student && (
        <ReactSelect
          className="mb-6 w-80"
          onChange={(e: SingleOptionType) => {
            router.push(GradeRoute(gradeId, 'study', `?id=${e?.value}`));
          }}
          value={{
            value: selectedStudent?.id || '',
            label: studentId ? selectedStudent?.name || '' : fa.plan.chooseStudent,
          }}
          options={studentsOption}
        />
      )}
      {data ? (
        <StudyCalendar
          filedId={data.field_id}
          {...{ courses, events, setEvents, isPending, deleteLoading }}
          createPlan={(e) => mutate(e)}
          deletePlan={(e) => deleteMutate(e)}
        />
      ) : (
        <div className="font-light text-black70 text-14 bg-white p-3 rounded-lg">
          {studentId ? fa.plan.noPlanForStudent : fa.global.noData}
        </div>
      )}
    </div>
  );
};

export default Study;
