'use client';

import { useMutation } from '@tanstack/react-query';
import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'next/navigation';
import Button from 'app/components/button';
import fa from 'app/lib/fa.json';
import FormInput from 'app/components/formInput';
import FormDatePiker from 'app/components/formDatePiker';
import { ClassroomType, CourseType, CreateHomeworkFormType } from 'app/types/common.type';
import FormSelect from 'app/components/formSelect';
import {
  getClassOption,
  getCoursesOption,
  numberValidation,
  valueValidation,
} from 'app/utils/common.util';
import FormUpload from 'app/components/formUpload';
import FormRecord from 'app/components/formRecord';
import { CreateHomeworkAction } from 'app/lib/actions';

const CreateHomework: React.FC<{ courses: CourseType[]; classes: ClassroomType[] }> = ({
  courses,
  classes,
}) => {
  const { gradeId } = useParams();
  const rules = { required: true };
  const classOptions = useMemo(() => getClassOption(classes), [classes]);

  const {
    reset,
    watch,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<CreateHomeworkFormType>({
    defaultValues: {
      title: '',
      date: '',
      classrooms: [],
      course: null,
      totalScore: null,
      expected: null,
      description: '',
      link: '',
      photos: [],
      voice: '',
    },
  });
  const fields = watch('classrooms').map((k) => k.fieldId);

  const { mutate, isPending } = useMutation({
    mutationFn: (e: CreateHomeworkFormType) => CreateHomeworkAction(e, gradeId.toString()),
    onSuccess: (ok) => ok && reset(),
  });

  return (
    <form className="flex gap-6 pb-20" onSubmit={handleSubmit((e) => mutate(e))}>
      <div className="flex flex-col gap-6 flex-1">
        <FormInput {...{ errors, control, rules }} name="title" rtl placeholder={fa.global.title} />
        <FormSelect
          {...{ errors, control, rules }}
          name="classrooms"
          isMulti
          options={classOptions}
          placeholder={fa.global.classroom}
          onChange={() => setValue('course', null, { shouldValidate: true })}
        />
        <FormSelect
          {...{ errors, control, rules }}
          name="course"
          options={useMemo(() => getCoursesOption(courses, fields), [])}
          placeholder={fa.global.course}
        />
        <FormInput
          {...{ errors, control }}
          name="totalScore"
          placeholder={fa.createExam.totalScore}
          rules={numberValidation({ ...valueValidation(0, 100), required: true }, true)}
        />
        <FormInput
          {...{ errors, control }}
          name="expected"
          placeholder={fa.createExam.expectedNumber}
          rules={numberValidation(
            {
              ...valueValidation(0, Number(watch('totalScore')) || 100),
              required: true,
            },
            true
          )}
        />
        <FormUpload
          title={fa.homework.uploadFile}
          name="photos"
          type={['img', 'pdf']}
          control={control}
          errors={errors}
        />
      </div>
      <div className="flex flex-col gap-6 flex-1">
        <FormDatePiker
          name="date"
          {...{ control, errors, rules }}
          placeholder={fa.homework.deliverTime}
        />
        <FormInput {...{ errors, control }} name="link" rtl placeholder={fa.homework.link} />
        <FormInput
          {...{ errors, control }}
          name="description"
          rtl
          textarea
          className="h-44"
          placeholder={fa.global.description}
        />
        <FormRecord
          name="voice"
          control={control}
          errors={errors}
          title={fa.homework.createVoices}
        />
      </div>

      <div className="flex justify-end mt-6 fixed bottom-0 bg-white90 w-full left-0 p-3 gap-4">
        <Button isLoading={isPending} className="btn btn-primary w-48">
          {fa.global.submit}
        </Button>
      </div>
    </form>
  );
};

export default CreateHomework;
