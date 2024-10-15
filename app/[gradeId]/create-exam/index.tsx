'use client';

import React, { useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import {
  ClassroomType,
  CourseType,
  CreateExamFormType,
  ExamType,
  StudentType,
} from 'app/types/common.type';
import fa from 'app/lib/fa.json';
import FormRadio from 'app/components/formRadio';
import Button from 'app/components/button';
import FormDatePiker from 'app/components/formDatePiker';
import {
  getClassOption,
  getCoursesOption,
  getTody,
  numberValidation,
  valueValidation,
} from 'app/utils/common.util';
import FormInput from 'app/components/formInput';
import FormSelect from 'app/components/formSelect';
import FormCheckbox from 'app/components/formCheckbox';
import StudentsList from './studentsList';
import { UpdateExamAction } from 'app/lib/actions';
import { tagRevalidate } from 'app/lib/server.util';
import { GradeRoute } from 'app/lib/routes';

const typeOptions = [
  { value: 1, title: fa.createExam.written },
  { value: 2, title: fa.createExam.oral },
  { value: 3, title: fa.createExam.test },
];

const CreateExam: React.FC<{
  classes: ClassroomType[];
  courses: CourseType[];
  students: StudentType[];
  tag: string;
  data?: ExamType;
}> = ({ classes, courses, students, tag, data }) => {
  const rules = { required: true };
  const { gradeId } = useParams();
  const router = useRouter();
  const id = data?.id || undefined;

  const defaultValues = {
    date: data?.date.replace(/-/g, '/') || getTody(),
    contents: data?.contents.map((k) => ({ value: k.id, label: k.content })) || [],
    course: data ? { value: data?.course_id, label: data?.course } : null,
    classroom: !classes.length
      ? null
      : {
          value: data?.classroom_id || classes[0].id,
          label: data?.classroom || classes[0].title,
          fieldId: data
            ? classes.find((k) => k.id === data.classroom_id)?.field_id
            : classes[0].field_id,
        },
    expected: data?.expected || undefined,
    totalScore: data?.totalScore || undefined,
    type: data?.type.id || 1,
    isFinal: data?.isFinal || false,
    isGeneral: data?.isGeneral || false,
    students:
      data?.students.map((k) => ({
        name: { value: k.student_id, label: k.name },
        score: k.score,
      })) || [],
  };

  const methods = useForm<CreateExamFormType>({ defaultValues });
  const {
    handleSubmit,
    formState: { errors },
    control,
    watch,
    setValue,
  } = methods;
  const isFinal = watch('isFinal');
  const examScore = watch('totalScore');
  const { mutate, isPending } = useMutation({
    mutationFn: (e: CreateExamFormType) => UpdateExamAction(e, gradeId.toString(), id),
    onSuccess: (ok) => {
      if (ok) {
        tagRevalidate(tag);
        id && router.push(GradeRoute(gradeId, 'exams'));
        setValue('students', []);
        setValue('contents', []);
      }
    },
  });

  const contentsOption = useMemo(
    () =>
      courses
        ?.find((k) => k.id === watch('course.value'))
        ?.contents?.map((k) => ({ value: k.id, label: k.content })) || [],
    [watch('course')]
  );

  return (
    <FormProvider {...methods}>
      <form className="relative flex gap-8" onSubmit={handleSubmit((e) => mutate(e))}>
        <div className="bg-white w-80 rounded-xl p-4 gap-6 items-center right-72 top-28 flex flex-col">
          <div className="text-berry100 font-bold text-18">{fa.createExam.examInfo}</div>

          <FormRadio
            {...{ control, errors }}
            onChange={(value) => setValue('totalScore', value === 3 ? 100 : null)}
            className="mt-3"
            options={typeOptions}
            name="type"
          />
          <FormDatePiker name="date" {...{ control, errors, rules }} />
          <div className="flex gap-2">
            <FormInput
              {...{ errors, control }}
              name="totalScore"
              disabled={watch('type') === 3}
              placeholder={fa.createExam.totalScore}
              rules={numberValidation({ ...valueValidation(0, 100), required: isFinal }, true)}
            />
            <FormInput
              {...{ errors, control }}
              name="expected"
              placeholder={fa.createExam.expectedNumber}
              rules={numberValidation(
                {
                  ...valueValidation(0, Number(examScore) || 100),
                  required: isFinal,
                },
                true
              )}
            />
          </div>
          <FormSelect
            {...{ errors, control, rules }}
            name="classroom"
            options={useMemo(() => getClassOption(classes), [classes])}
            placeholder={fa.global.classroom}
            onChange={(): void => (setValue('students', []), setValue('course', null))}
          />
          <FormSelect
            {...{ errors, control, rules }}
            name="course"
            options={useMemo(
              () => getCoursesOption(courses, watch('classroom.fieldId')),
              [watch('classroom')]
            )}
            placeholder={fa.global.course}
            onChange={(): void => setValue('contents', [])}
          />
          <FormSelect
            {...{ errors, control }}
            name="contents"
            isMulti
            options={contentsOption}
            placeholder={fa.createExam.content}
          />

          <div className="flex justify-around mt-1 w-full">
            <div className="flex items-center">
              <FormCheckbox {...{ control, errors }} label={fa.createExam.isFinal} name="isFinal" />
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
