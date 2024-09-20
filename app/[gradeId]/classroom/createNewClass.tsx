import React, { useEffect, useMemo } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useParams } from 'next/navigation';
import Button from 'app/components/button';
import fa from 'app/lib/fa.json';
import Modal from 'app/components/modal';
import FormInput from 'app/components/formInput';
import { numberValidation } from 'app/utils/common.util';
import FormSelect from 'app/components/formSelect';
import { ClassFormType, ClassroomType } from 'app/types/common.type';
import { fieldsKey, getFields, UpdateClassAction } from 'app/lib/actions';
import { tagRevalidate } from 'app/lib/server.util';

const defaultValues = {
  title: '',
  field: undefined,
  floor: undefined,
  number: undefined,
};

const CreateNewClass: React.FC<{
  classData: ClassroomType | boolean;
  setClassData: (data: ClassroomType | boolean) => void;
  tag: string;
}> = ({ classData, setClassData, tag }) => {
  const rules = { required: true };
  const { gradeId } = useParams();
  const id = typeof classData !== 'boolean' ? classData?.id : undefined;

  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<ClassFormType>({ defaultValues });

  useEffect(() => {
    if (typeof classData !== 'boolean' && classData.title) {
      const newData = {
        ...classData,
        number: classData.number.toString(),
        field: { label: classData.field, value: classData.field_id },
      };
      reset(newData);
    } else reset(defaultValues);
  }, [classData]);

  const handleCloseModal = (): void => {
    setClassData(false);
    reset();
  };

  const { data } = useQuery({
    queryKey: fieldsKey(gradeId.toString()),
    queryFn: () => getFields(gradeId.toString()),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (e: ClassFormType) => UpdateClassAction(e, gradeId.toString(), id),
    onSuccess: (ok) => {
      if (ok) {
        setClassData(false);
        tagRevalidate(tag);
      }
    },
  });
  const classOptions = useMemo(
    () => data?.map((k) => ({ value: k.id, label: k.title })) || [],
    [data]
  );

  return (
    <div className="flex justify-end mt-6">
      <Button onClick={(): void => setClassData(true)} className="btn btn-primary">
        <i className="icon-add text-32" />
        {fa.classroom.newClass}
      </Button>

      <Modal open={!!classData} setOpen={handleCloseModal} id="create-class">
        <div className="flex flex-col items-center">
          <div className="font-bold text-20 mt-4 text-berry90">
            {fa.classroom[id ? 'updateClass' : 'newClass']}
          </div>
          <form className="w-full px-14" onSubmit={handleSubmit((e) => mutate(e))}>
            <FormInput
              {...{ errors, control, rules }}
              name="title"
              rtl
              className="mt-8"
              placeholder={fa.classroom.title}
            />
            <FormSelect
              {...{ errors, control, rules }}
              name="field"
              options={classOptions}
              className="mt-8"
              placeholder={(classData as ClassroomType)?.field || fa.classroom.field}
            />

            <FormInput
              {...{ errors, control, rules }}
              name="number"
              className="mt-8"
              rules={numberValidation()}
              placeholder={fa.classroom.number}
            />
            <FormInput
              {...{ errors, control, rules }}
              name="floor"
              className="mt-8"
              rules={numberValidation()}
              placeholder={fa.classroom.floor}
            />

            <Button type="submit" className="btn btn-primary mt-10 w-full" isLoading={isPending}>
              {fa.classroom[id ? 'submit' : 'submitClass']}
            </Button>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default CreateNewClass;
