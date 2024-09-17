import React, { useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useParams } from 'next/navigation';
import Button from 'app/components/button';
import fa from 'app/lib/fa.json';
import Modal from 'app/components/modal';
import FormInput from 'app/components/formInput';
import { maxLengthMessage, minLengthMessage, numberValidation } from 'app/utils/common.util';
import { TeacherFormType, TeacherType } from 'app/types/common.type';
import { UpdateTeacherAction } from 'app/lib/actions';
import { tagRevalidate, teacherTag } from 'app/lib/server.util';

const defaultValues = {
  firstName: '',
  lastName: '',
  nationalId: undefined,
  personalId: '',
  degree: '',
  phone: undefined,
};

const CreateNewTeacher: React.FC<{
  teacherData: TeacherType | boolean;
  setTeacherData: (data: TeacherType | boolean) => void;
}> = ({ teacherData, setTeacherData }) => {
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
        tagRevalidate(teacherTag());
      }
    },
  });

  return (
    <div className="flex justify-end mt-6">
      <Button onClick={(): void => setTeacherData(true)} className="btn btn-primary">
        <i className="icon-plus text-32" />
        {fa.teacher.newTeacher}
      </Button>

      <Modal open={!!teacherData} setOpen={handleCloseModal} id="create-class">
        <div className="flex flex-col items-center">
          <div className="font-bold text-20 mt-4 text-berry90">
            {fa.teacher[id ? 'updateTeacher' : 'newTeacher']}
          </div>
          <form
            className="w-full px-14 flex flex-col gap-8 mt-6"
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
              rules={numberValidation({
                minLength: { value: 11, message: minLengthMessage(11) },
                maxLength: { value: 11, message: maxLengthMessage(11) },
              })}
              placeholder={fa.teacher.phone}
            />
            <FormInput {...{ errors, control }} name="degree" rtl placeholder={fa.teacher.degree} />
            <FormInput
              {...{ errors, control }}
              name="personalId"
              rtl
              placeholder={fa.teacher.personalId}
            />
            <Button type="submit" className="btn btn-primary w-full" isLoading={isPending}>
              {fa.teacher[id ? 'submit' : 'submitNewTeacher']}
            </Button>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default CreateNewTeacher;
