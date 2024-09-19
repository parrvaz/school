import { FieldErrors, useFieldArray, useFormContext } from 'react-hook-form';
import React, { useMemo } from 'react';
import NoData from 'app/components/noDate';
import { ClassroomType, CreateExamFormType, StudentType } from 'app/types/common.type';
import fa from 'app/lib/fa.json';
import FormSelect from 'app/components/formSelect';
import FormInput from 'app/components/formInput';
import { numberValidation, valueValidation } from 'app/utils/common.util';
import Button from 'app/components/button';

const StudentsList: React.FC<{
  classes: ClassroomType[];
  students: StudentType[];
  errors: FieldErrors<CreateExamFormType>;
}> = ({ classes, students, errors }) => {
  const { control, watch, setValue } = useFormContext<CreateExamFormType>();
  const { fields, append, remove } = useFieldArray({ control, name: 'students' });
  const selectedClassId = watch('classroom')?.value;
  const studentList = watch('students');
  const examScore = watch('totalScore');

  const classStudents = useMemo(
    () =>
      students
        .filter((k) => k.classroom_id === selectedClassId)
        .map((k) => ({ value: k.id, label: k.name })),
    [selectedClassId]
  );

  const selectedIds = useMemo(
    () => studentList.filter((item) => item.name !== null).map((item) => item.name?.value),
    [studentList]
  );

  const studentOptions = useMemo(
    () => classStudents.filter((item) => !selectedIds.includes(item.value)),
    [classStudents, selectedIds]
  );

  const handleAddAllStudents = (): void => {
    const newList = classStudents.map((k) => ({ name: k, score: null }));
    setValue('students', newList);
  };

  return (
    <div className="ml-96 relative">
      {!classes.length ? (
        <NoData
          className="mt-20"
          message={fa.createExam.noClass}
          message2={fa.createExam.createClass}
        />
      ) : !classStudents.length ? (
        <NoData className="mt-20" message={fa.createExam.noStudent} />
      ) : (
        <div className="relative">
          <div className="flex flex-col gap-5">
            {fields.map((field, index) => (
              <div className="flex gap-2 items-center" key={field.id}>
                <FormSelect
                  {...{ errors, control }}
                  name={`students.${index}.name`}
                  options={studentOptions}
                  placeholder={fa.global.studentName}
                  rules={{ required: true }}
                />
                <FormInput
                  {...{ errors, control }}
                  name={`students.${index}.score`}
                  placeholder={fa.createExam.score}
                  rules={numberValidation({ ...valueValidation(0, Number(examScore) || 100) })}
                />

                <i
                  className="icon-trash text-24 text-red70 cursor-pointer"
                  onClick={() => remove(index)}
                />
              </div>
            ))}
          </div>
          {studentList.length < classStudents.length ? (
            <Button
              type="button"
              className="btn btn-sm btn-accent w-60 mt-5"
              onClick={() => append({ name: null, score: null })}
            >
              <i className="icon-plus text-24" />
              {fa.createExam.addNewStudent}
            </Button>
          ) : (
            <div className="text-green70 flex items-center text-12 mt-5">
              <i className="icon-verify text-18 ml-1" />
              {fa.createExam.allAdded}
            </div>
          )}

          <Button
            type="button"
            onClick={handleAddAllStudents}
            className="btn btn-success fixed left-96 bottom-10"
          >
            {fa.createExam.fillStudents}
          </Button>
        </div>
      )}
    </div>
  );
};

export default StudentsList;
