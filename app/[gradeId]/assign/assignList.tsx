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
import { getClassOption, getCoursesOption, getOption } from 'app/utils/common.util';

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

  const classOptions = useMemo(() => getClassOption(classes), [classes]);
  const teacherOptions = useMemo(() => getOption(teachers), [teachers]);

  return (
    <div>
      <form className="flex flex-col gap-6 pb-20" onSubmit={handleSubmit((e) => mutate(e))}>
        {fields.length ? (
          fields.map((item, index) => (
            <div className="flex gap-2 items-center" key={item.id}>
              <FormSelect
                {...{ errors, control, rules }}
                name={`assignments.${index}.class`}
                options={classOptions}
                className="flex-1"
                placeholder={fa.assign.chooseClass}
              />
              <FormSelect
                isDisabled={!watch(`assignments.${index}.class.fieldId`)}
                {...{ errors, control, rules }}
                name={`assignments.${index}.course`}
                options={getCoursesOption(courses, watch(`assignments.${index}.class.fieldId`))}
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
          ))
        ) : (
          <div className="bg-white p-3 text-black70 text-14 font-light rounded-lg">
            {fa.global.noData}
          </div>
        )}
        <Button
          type="button"
          className="btn btn-sm btn-primary btn-outline w-44"
          onClick={() => append(rawRow)}
        >
          <i className="icon-add text-24" />
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
