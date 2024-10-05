import React, { useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useParams } from 'next/navigation';
import Button from 'app/components/button';
import fa from 'app/lib/fa.json';
import Modal from 'app/components/modal';
import FormInput from 'app/components/formInput';
import {
  maxLengthMessage,
  minLengthMessage,
  numberValidation,
  phoneValidation,
} from 'app/utils/common.util';
import { TeacherFormType, TeacherType } from 'app/types/common.type';
import { UpdateTeacherAction } from 'app/lib/actions';
import { tagRevalidate } from 'app/lib/server.util';
import FormCheckbox from 'app/components/formCheckbox';

const defaultValues = {
  firstName: '',
  lastName: '',
  nationalId: undefined,
  personalId: '',
  degree: '',
  phone: undefined,
  isAssistant: false,
};

const CreateNewTeacher: React.FC<{
  teacherData: TeacherType | boolean;
  setTeacherData: (data: TeacherType | boolean) => void;
  tag: string;
}> = ({ teacherData, setTeacherData, tag }) => {
  const rules = { required: true };
  const { gradeId } = useParams();
  const id = typeof teacherData !== 'boolean' ? teacherData?.id : undefined;

  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<TeacherFormType>({ defaultValues });

  useEffect(() => {
    if (typeof teacherData !== 'boolean' && teacherData.firstName) {
      const newData = { ...teacherData };
      reset(newData);
    } else reset(defaultValues);
  }, [teacherData]);

  const handleCloseModal = (): void => {
    setTeacherData(false);
    reset();
  };

  const { mutate, isPending } = useMutation({
    mutationFn: (e: TeacherFormType) => UpdateTeacherAction(e, gradeId.toString(), id),
    onSuccess: (ok) => {
      if (ok) {
        setTeacherData(false);
        tagRevalidate(tag);
      }
    },
  });

  return (
    <div className="flex justify-end mt-6">
      <Button onClick={(): void => setTeacherData(true)} className="btn btn-primary">
        <i className="icon-add text-32" />
        {fa.teacher.newTeacher}
      </Button>

      <Modal open={!!teacherData} setOpen={handleCloseModal} mustConfirm id="create-class">
        <div className="flex flex-col items-center">
          <div className="font-bold text-20 mt-4 text-berry90">
            {fa.teacher[id ? 'updateTeacher' : 'newTeacher']}
          </div>
          <form
            className="w-full px-14 flex flex-col gap-5 mt-6"
            onSubmit={handleSubmit((e) => mutate(e))}
          >
            <FormInput
              {...{ errors, control, rules }}
              name="firstName"
              rtl
              placeholder={fa.teacher.firstName}
            />
            <FormInput
              {...{ errors, control, rules }}
              name="lastName"
              rtl
              placeholder={fa.teacher.lastName}
            />
            <FormInput
              {...{ errors, control }}
              name="nationalId"
              rules={numberValidation({
                minLength: { value: 10, message: minLengthMessage(10) },
                maxLength: { value: 10, message: maxLengthMessage(10) },
              })}
              placeholder={fa.teacher.nationalId}
            />
            <FormInput
              {...{ errors, control }}
              name="phone"
              rules={phoneValidation()}
              placeholder={fa.teacher.phone}
            />
            <FormInput {...{ errors, control }} name="degree" rtl placeholder={fa.teacher.degree} />
            <FormInput
              {...{ errors, control }}
              name="personalId"
              rtl
              placeholder={fa.teacher.personalId}
            />

            <FormCheckbox
              {...{ control, errors }}
              label={fa.teacher.isAssistant}
              name="isAssistant"
            />

            <div className="flex gap-2">
              <Button
                type="button"
                className="btn btn-ghost text-red70"
                onClick={(): void => setTeacherData(false)}
              >
                {fa.global.cancel}
              </Button>
              <Button type="submit" className="btn btn-primary flex-1" isLoading={isPending}>
                {fa.teacher[id ? 'submit' : 'submitNewTeacher']}
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default CreateNewTeacher;
