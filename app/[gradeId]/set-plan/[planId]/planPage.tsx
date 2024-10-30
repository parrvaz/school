'use client';

import React, { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import FormInput from 'app/components/formInput';
import fa from 'app/lib/fa.json';
import Button from 'app/components/button';
import { ClassroomType, CourseType, PlanDataType, PlanPageType } from 'app/types/common.type';
import MyCalendar from 'app/components/appCalendar';
import { UpdatePlanAction } from 'app/lib/actions';
import { GradeRoute } from 'app/lib/routes';
import { tagRevalidate } from 'app/lib/server.util';
import FormSelect from 'app/components/formSelect';
import { getClassOption, getCourses } from 'app/utils/common.util';

type PlanFormType = { name: string; classroom: { label: string; value: number; fieldId: number } };

const PlanPage: React.FC<{
  courses: CourseType[];
  data: PlanPageType | null;
  tag: string;
  classrooms: ClassroomType[];
}> = ({ data, courses, tag, classrooms }) => {
  const rules = { required: true };
  const router = useRouter();
  const { gradeId, planId } = useParams();
  const [events, setEvents] = useState<PlanDataType[]>(data?.plan || []);

  const defaultValues = {
    name: data?.title || '',
    classroom: {
      label: classrooms.find((k) => k.id === data?.classroom_id)?.title || classrooms[0].title,
      value: data?.classroom_id || classrooms[0].id,
      fieldId: data?.field_id || classrooms[0].field_id,
    },
  };
  const {
    handleSubmit,
    formState: { errors },
    control,
    watch,
  } = useForm<PlanFormType>({ defaultValues });

  const { mutate, isPending } = useMutation({
    mutationFn: ({ name, classroom }: PlanFormType) =>
      UpdatePlanAction(name, classroom.value, events, gradeId.toString(), planId.toString()),
    onSuccess: (ok) => {
      if (ok) {
        tagRevalidate(tag);
        router.push(GradeRoute(gradeId, 'set-plan'));
      }
    },
  });

  const classOptions = useMemo(() => getClassOption(classrooms), [classrooms]);

  return (
    <form onSubmit={handleSubmit((e) => mutate(e))}>
      <div className="flex gap-4 mb-5">
        <FormSelect
          {...{ errors, control, rules }}
          name="classroom"
          className="w-52 shrink-0"
          options={classOptions}
          placeholder={fa.student.classroom}
          onChange={() => setEvents([])}
        />
        <FormInput
          {...{ errors, control, rules }}
          name="name"
          className="w-44"
          rtl
          placeholder={fa.plan.planName}
        />
      </div>

      <MyCalendar
        {...{ events, setEvents }}
        courses={getCourses(courses, watch('classroom.fieldId'))}
      />

      <Button
        type="submit"
        className="btn btn-primary fixed right-64 bottom-4"
        isLoading={isPending}
      >
        {fa.global.submit}
      </Button>
    </form>
  );
};

export default PlanPage;
