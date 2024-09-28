'use client';

import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';
import fa from 'app/lib/fa.json';
import FormInput from './formInput';
import Button from './button';
import { GradeFormType, GradeType } from 'app/types/common.type';
import { GradeRoute } from 'app/lib/routes';
import FormSelect from './formSelect';
import { PostCreateGrade } from 'app/lib/actions';
import { tagRevalidate } from 'app/lib/server.util';

const gradeOptions = [
  { label: fa.global.grade10, value: 10 },
  { label: fa.global.grade11, value: 11 },
  { label: fa.global.grade12, value: 12 },
];

const CreateGradeForm: React.FC<{ grades: GradeType[]; tag: string }> = ({ grades, tag }) => {
  const rules = { required: true };
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const isCreate = searchParams.get('isCreate');
  const targetGrade = grades.find((k) => k.code === id);
  const targetOption = gradeOptions.find((k) => k.value === targetGrade?.grade_id);
  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<GradeFormType>({ defaultValues: { title: '', grade: undefined } });

  useEffect(() => {
    targetGrade && reset({ title: targetGrade.title, grade: targetOption });
  }, []);

  const { mutate, isPending } = useMutation({
    mutationFn: (e: GradeFormType) => PostCreateGrade(e, id || ''),
    onSuccess: (code) => {
      if (code) {
        tagRevalidate(tag);
        router.replace(GradeRoute(code, 'dashboard'));
      }
    },
  });
  return (
    <div className="isCenter h-screen  bg-berry10  ">
      <div className="flex flex-col w-[34rem] px-20 items-center rounded-2xl border-2  border-white md:bg-white50">
        <i className="icon-trend-up text-berry60 mt-10 text-48" />
        <div className="text-24 font-bold text-berry100 mt-6 mb-8">
          {fa.home[isCreate ? 'createNewGrade' : id ? 'updateGrade' : 'welcome']}
        </div>
        {!(isCreate || id) && (
          <div className="text-16 font-regular text-black70 mb-1">{fa.home.info1}</div>
        )}
        {!(isCreate || id) && (
          <div className="text-16 font-regular text-black70">{fa.home.info2}</div>
        )}
        <form onSubmit={handleSubmit((e) => mutate(e))} className="w-full">
          <FormInput
            {...{ errors, control, rules }}
            name="title"
            rtl
            placeholder={fa.home.gradeName}
            className="mt-12 w-full"
          />
          <FormSelect
            {...{ errors, control, rules }}
            name="grade"
            options={gradeOptions}
            className="mt-8"
            placeholder={fa.home.chooseGrade}
          />

          <Button className="btn btn-primary mb-10 w-full mt-9" isLoading={isPending}>
            {fa.home[isCreate || id ? 'save' : 'start']}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateGradeForm;
