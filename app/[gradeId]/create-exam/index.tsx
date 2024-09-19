'use client';

import React, { useEffect, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { ClassroomType, CourseType, CreateExamFormType, StudentType } from 'app/types/common.type';
import fa from 'app/lib/fa.json';
import FormRadio from 'app/components/formRadio';
import Button from 'app/components/button';
import FormDatePiker from 'app/components/formDatePiker';
import { getOption, getTody, numberValidation, valueValidation } from 'app/utils/common.util';
import FormInput from 'app/components/formInput';
import FormSelect from 'app/components/formSelect';
import FormCheckbox from 'app/components/formCheckbox';
import StudentsList from './studentsList';
import { CreateExamAction } from 'app/lib/actions';

const typeOptions = [
  { value: 1, title: fa.createExam.written },
  { value: 2, title: fa.createExam.oral },
  { value: 3, title: fa.createExam.test },
];

const CreateExam: React.FC<{
  classes: ClassroomType[];
  courses: CourseType[];
  students: StudentType[];
}> = ({ classes, courses, students }) => {
  const rules = { required: true };
  const { gradeId } = useParams();

  const defaultValues = {
    date: getTody(),
    content: '',
    course: null,
    classroom: !classes.length ? null : { value: classes[0].id, label: classes[0].title },
    expected: undefined,
    totalScore: undefined,
    type: 1,
    status: false,
    isGeneral: false,
    students: [{ name: null, score: null }],
  };

  const methods = useForm<CreateExamFormType>({ defaultValues });
  const {
    handleSubmit,
    formState: { errors },
    control,
    watch,
    setValue,
  } = methods;
  const isFinal = watch('status');
  const examScore = watch('totalScore');
  const { mutate, isPending } = useMutation({
    mutationFn: (e: CreateExamFormType) => CreateExamAction(e, gradeId.toString()),
  });

  useEffect(() => {
    watch('type') === 3 && setValue('totalScore', 100);
  }, [watch('type')]);
  useEffect(() => {
    setValue('students', [{ name: null, score: null }]);
  }, [watch('classroom')]);

  return (
    <FormProvider {...methods}>
      <form className="relative" onSubmit={handleSubmit((e) => mutate(e))}>
        <div className="bg-white w-80 rounded-xl p-4 fixed gap-6 items-center left-8 top-24 flex flex-col">
          <div className="text-berry100 font-bold text-18">{fa.createExam.examInfo}</div>

          <FormRadio {...{ control, errors }} className="mt-3" options={typeOptions} name="type" />
          <FormDatePiker name="date" {...{ control, errors, rules }} />
          <FormInput
            {...{ errors, control }}
            name="totalScore"
            disabled={watch('type') === 3}
            placeholder={fa.createExam.totalScore}
            rules={numberValidation({ ...valueValidation(0, 100), required: isFinal })}
          />
          <FormSelect
            {...{ errors, control, rules }}
            name="classroom"
            options={useMemo(() => getOption(classes, 'title'), [classes])}
            placeholder={fa.global.classroom}
          />
          <FormSelect
            {...{ errors, control, rules }}
            name="course"
            options={useMemo(() => getOption(courses), [courses])}
            placeholder={fa.global.course}
          />

          <FormInput
            {...{ errors, control }}
            name="expected"
            placeholder={fa.createExam.expectedNumber}
            rules={numberValidation({
              ...valueValidation(0, Number(examScore) || 100),
              required: isFinal,
            })}
          />

          <div className="flex justify-around mt-1 w-full">
            <div className="flex items-center">
              <FormCheckbox {...{ control, errors }} label={fa.createExam.isFinal} name="status" />
              <div className="tooltip" data-tip={fa.createExam.isFinalInfo}>
                <i className="icon-info-circle text-24 text-berry60" />
              </div>
            </div>
            <div className="flex items-center">
              <FormCheckbox
                {...{ control, errors }}
                label={fa.createExam.isGeneral}
                name="isGeneral"
              />
              <div className="tooltip tooltip-right" data-tip={fa.createExam.isGeneralInfo}>
                <i className="icon-info-circle text-24 text-berry60" />
              </div>
            </div>
          </div>

          <Button className="btn btn-primary w-full" isLoading={isPending}>
            {fa.global.approve}
          </Button>
        </div>

        <StudentsList {...{ classes, students, errors }} />
      </form>
    </FormProvider>
  );
};

export default CreateExam;
