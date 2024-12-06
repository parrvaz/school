'use client';

import { useMutation } from '@tanstack/react-query';
import React, { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useRouter } from 'next/navigation';
import Button from 'app/components/button';
import fa from 'app/lib/fa.json';
import FormInput from 'app/components/formInput';
import FormDatePiker from 'app/components/formDatePiker';
import {
  ClassroomType,
  CourseType,
  CreateHomeworkFormType,
  HomeworkType,
} from 'app/types/common.type';
import FormSelect from 'app/components/formSelect';
import {
  getClassOption,
  getCoursesOption,
  initializeFiles,
  numberValidation,
  valueValidation,
} from 'app/utils/common.util';
import FormUpload from 'app/components/formUpload';
import FormRecord from 'app/components/formRecord';
import { CreateHomeworkAction } from 'app/lib/actions';
import { GradeRoute } from 'app/lib/routes';
import { tagRevalidate } from 'app/lib/server.util';

const CreateHomework: React.FC<{
  courses: CourseType[];
  classes: ClassroomType[];
  homework?: HomeworkType;
  tag: string;
}> = ({ courses, classes, homework, tag }) => {
  const router = useRouter();
  const { gradeId } = useParams();
  const rules = { required: true };
  const classOptions = useMemo(() => getClassOption(classes), [classes]);

  const {
    watch,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<CreateHomeworkFormType>({
    defaultValues: {
      title: homework?.title || '',
      date: homework?.date || '',
      classrooms:
        homework?.classrooms.map((k) => ({ value: k.id, label: k.title, fieldId: k.field_id })) ||
        [],
      course: homework ? { value: homework.course_id, label: homework.course } : null,
      totalScore: homework?.score || null,
      expected: homework?.expected || null,
      description: homework?.description || '',
      link: homework?.link || '',
      files: [],
      voice: '',
    },
  });

  const fields = watch('classrooms').map((k) => k.fieldId);

  useEffect(() => {
    if (homework?.files) {
      initializeFiles(homework?.files.map((k) => k.file) || []).then((files) => {
        setValue('files', files); // Set the converted files into the form
      });
    }
  }, [homework]);

  const { mutate, isPending } = useMutation({
    mutationFn: (e: CreateHomeworkFormType) =>
      CreateHomeworkAction(e, gradeId.toString(), homework?.id),
    onSuccess: (ok) => {
      if (ok) {
        tagRevalidate(tag);
        router.push(GradeRoute(gradeId, 'homework-list'));
      }
    },
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
          options={useMemo(() => getCoursesOption(courses, fields), [fields])}
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
          name="files"
          type={['img', 'pdf']}
          control={control}
          isMultiple
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
        <Button
          onClick={() => router.push(GradeRoute(gradeId, 'homework-list'))}
          type="button"
          className="btn btn-primary btn-outline w-48"
        >
          {fa.homework.return2list}
        </Button>
        <Button isLoading={isPending} className="btn btn-primary w-48">
          {fa.global.submit}
        </Button>
      </div>
    </form>
  );
};

export default CreateHomework;
