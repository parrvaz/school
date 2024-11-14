'use client';

import { useMutation } from '@tanstack/react-query';
import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import Button from 'app/components/button';
import fa from 'app/lib/fa.json';
import FormInput from 'app/components/formInput';
import FormDatePiker from 'app/components/formDatePiker';
import { ClassOptionType, ClassroomType, CourseType, OptionType } from 'app/types/common.type';
import FormSelect from 'app/components/formSelect';
import {
  getClassOption,
  getCoursesOption,
  numberValidation,
  valueValidation,
} from 'app/utils/common.util';

type FormType = {
  title: string;
  date: string;
  classrooms: ClassOptionType[];
  course: OptionType | null;
  totalScore: number | null;
  expected: number | null;
};

const CreateHomework: React.FC<{ courses: CourseType[]; classes: ClassroomType[] }> = ({
  courses,
  classes,
}) => {
  const rules = { required: true };
  const classOptions = useMemo(() => getClassOption(classes), [classes]);

  const {
    watch,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<FormType>({
    defaultValues: {
      title: '',
      date: '',
      classrooms: [],
      course: null,
      totalScore: null,
      expected: null,
    },
  });
  const fields = watch('classrooms').map((k) => k.fieldId);

  const { mutate, isPending } = useMutation({
    // mutationFn: (e: FormType) => console.log('s', e),
    // onSuccess: (ok) => {
    //   if (ok) {
    //     tagRevalidate(coursesTag);
    //     reset();
    //   }
    // },
  });

  console.log(courses, fields, getCoursesOption(courses, fields));
  return (
    <form className="grid grid-cols-2 gap-6" onSubmit={handleSubmit(() => mutate())}>
      <FormInput {...{ errors, control, rules }} name="title" rtl placeholder={fa.global.title} />
      <FormDatePiker
        name="date"
        {...{ control, errors, rules }}
        placeholder={fa.homework.deliverTime}
      />
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
      <FormInput
        {...{ errors, control, rules }}
        name="discription"
        rtl
        placeholder={fa.global.title}
      />

      <Button isLoading={isPending} className="btn btn-primary mt-4">
        {fa.global.submit}
      </Button>
    </form>
  );
};

export default CreateHomework;
