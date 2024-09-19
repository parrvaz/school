'use client';

import React, { useMemo } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { AssignFormType, ClassroomType, CourseType, TeacherType } from 'app/types/common.type';
import FormSelect from 'app/components/formSelect';
import fa from 'app/lib/fa.json';
import Button from 'app/components/button';
import { UpdateAssignmentAction } from 'app/lib/actions';
import { tagRevalidate } from 'app/lib/server.util';
import { getOption } from 'app/utils/common.util';

const rawRow = { class: null, course: null, teacher: null };

const AssignList: React.FC<{
  classes: ClassroomType[];
  teachers: TeacherType[];
  courses: CourseType[];
  assign: AssignFormType;
  tag: string;
}> = ({ classes, teachers, courses, assign, tag }) => {
  const { gradeId } = useParams();
  const rules = { required: true };

  const {
    handleSubmit,
    formState: { errors },
    control,
    watch,
  } = useForm<AssignFormType>({ defaultValues: assign });

  const hasChange = JSON.stringify(assign.assignments) !== JSON.stringify(watch('assignments'));
  const { fields, append, remove } = useFieldArray({ control, name: 'assignments' });

  const { mutate, isPending } = useMutation({
    mutationFn: (e: AssignFormType) => UpdateAssignmentAction(e, gradeId.toString()),
    onSuccess: (ok) => ok && tagRevalidate(tag),
  });

  const classOptions = useMemo(() => getOption(classes, 'title'), [classes]);
  const teacherOptions = useMemo(() => getOption(teachers), [teachers]);
  const courseOptions = useMemo(() => getOption(courses), [courses]);

  return (
    <div>
      <form className="flex flex-col gap-6 pb-20" onSubmit={handleSubmit((e) => mutate(e))}>
        {fields.map((field, index) => (
          <div className="flex gap-2 items-center" key={field.id}>
            <FormSelect
              {...{ errors, control, rules }}
              name={`assignments.${index}.class`}
              options={classOptions}
              className="flex-1"
              placeholder={fa.assign.chooseClass}
            />
            <FormSelect
              {...{ errors, control, rules }}
              name={`assignments.${index}.course`}
              options={courseOptions}
              className="flex-1"
              placeholder={fa.assign.chooseCourse}
            />
            <FormSelect
              {...{ errors, control, rules }}
              name={`assignments.${index}.teacher`}
              options={teacherOptions}
              className="flex-1"
              placeholder={fa.assign.chooseTeacher}
            />

            <i
              className="icon-trash text-24 text-red70 cursor-pointer"
              onClick={() => (remove(index), fields.length === 1 && append(rawRow))}
            />
          </div>
        ))}
        <Button type="button" className="btn btn-sm btn-accent w-44" onClick={() => append(rawRow)}>
          <i className="icon-plus text-24" />
          {fa.assign.addNewRow}
        </Button>

        {hasChange && (
          <div className="fixed bottom-0 w-full bg-white50 p-3 left-0 text-left">
            <Button isLoading={isPending} className="btn btn-primary w-40" type="submit">
              {fa.assign.submit}
            </Button>
          </div>
        )}
      </form>
    </div>
  );
};

export default AssignList;
