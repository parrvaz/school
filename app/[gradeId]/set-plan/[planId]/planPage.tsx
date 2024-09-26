'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import FormInput from 'app/components/formInput';
import fa from 'app/lib/fa.json';
import Button from 'app/components/button';
import { CourseType, PlanDataType, PlanPageType } from 'app/types/common.type';
import MyCalendar from 'app/components/appCalendar';
import { UpdatePlanAction } from 'app/lib/actions';
import { GradeRoute } from 'app/lib/routes';
import { tagRevalidate } from 'app/lib/server.util';

type PlanFormType = { name: string };

const PlanPage: React.FC<{
  courses: CourseType[];
  data: PlanPageType | null;
  tag: string;
}> = ({ data, courses, tag }) => {
  const rules = { required: true };
  const router = useRouter();
  const { gradeId, planId } = useParams();
  const [events, setEvents] = useState<PlanDataType[]>(data?.plan || []);

  const defaultValues = { name: data?.title || '' };
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<PlanFormType>({ defaultValues });

  const { mutate, isPending } = useMutation({
    mutationFn: ({ name }: PlanFormType) =>
      UpdatePlanAction(name, events, gradeId.toString(), planId.toString()),
    onSuccess: (ok) => {
      if (ok) {
        tagRevalidate(tag);
        router.push(GradeRoute(gradeId, 'set-plan'));
      }
    },
  });

  return (
    <form onSubmit={handleSubmit((e) => mutate(e))}>
      <FormInput
        {...{ errors, control, rules }}
        name="name"
        className="w-44 mb-5"
        rtl
        placeholder={fa.plan.planName}
      />

      <MyCalendar {...{ courses, events, setEvents }} />

      <Button
        type="submit"
        className="btn btn-primary w-32 fixed right-64 bottom-4"
        isLoading={isPending}
      >
        {fa.global.submit}
      </Button>
    </form>
  );
};

export default PlanPage;
