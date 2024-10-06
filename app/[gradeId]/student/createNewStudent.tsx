import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import React, { useEffect, useMemo } from 'react';
import { useParams } from 'next/navigation';
import Button from 'app/components/button';
import { ClassroomType, StudentFormType, StudentType } from 'app/types/common.type';
import fa from 'app/lib/fa.json';
import Modal from 'app/components/modal';
import FormInput from 'app/components/formInput';
import FormSelect from 'app/components/formSelect';
import {
  maxLengthMessage,
  minLengthMessage,
  numberValidation,
  phoneValidation,
} from 'app/utils/common.util';
import FormDatePiker from 'app/components/formDatePiker';
import { UpdateStudentAction } from 'app/lib/actions';
import { tagRevalidate } from 'app/lib/server.util';

const defaultValues = {
  firstName: '',
  lastName: '',
  fatherPhone: '',
  motherPhone: '',
  nationalId: undefined,
  phone: undefined,
  birthday: '',
  socialMediaID: '',
  religion: '',
  specialDisease: '',
  address: '',
  classroom: null,
};

const CreateNewStudent: React.FC<{
  studentData: StudentType | boolean;
  setStudentData: (data: StudentType | boolean) => void;
  classes: ClassroomType[];
  tag: string;
}> = ({ studentData, setStudentData, classes, tag }) => {
  const rules = { required: true };
  const { gradeId } = useParams();
  const id = typeof studentData !== 'boolean' ? studentData?.id : undefined;
  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<StudentFormType>({ defaultValues });

  useEffect(() => {
    if (typeof studentData !== 'boolean') {
      const newData = {
        ...studentData,
        classroom: { label: studentData.classroom, value: studentData.classroom_id },
      };
      reset(newData);
    } else reset(defaultValues);
  }, [studentData]);

  const handleCloseModal = (): void => {
    setStudentData(false);
    reset();
  };

  const { mutate, isPending } = useMutation({
    mutationFn: (e: StudentFormType) => UpdateStudentAction(e, gradeId.toString(), id),
    onSuccess: (ok) => {
      if (ok) {
        setStudentData(false);
        tagRevalidate(tag);
      }
    },
  });
  const classOptions = useMemo(
    () => classes?.map((k) => ({ value: k.id, label: k.title })) || [],
    [classes]
  );

  return (
    <>
      <Button onClick={(): void => setStudentData(true)} className="btn btn-primary">
        <i className="icon-add text-32" />
        {fa.student.newStudent}
      </Button>

      <Modal
        mustConfirm
        open={!!studentData}
        className="w-11/12 max-w-2xl overflow-visible"
        setOpen={handleCloseModal}
        id="create-class"
      >
        <div className="flex flex-col items-center">
          <div className="font-bold mb-6 text-20 mt-4 text-berry90">
            {fa.student[id ? 'updateStudent' : 'newStudent']}
          </div>
          <form className="w-[37rem] text-center" onSubmit={handleSubmit((e) => mutate(e))}>
            <div className="flex">
              <div className="flex-1 flex flex-col gap-8 border-l px-5 border-l-berry10">
                <FormInput
                  {...{ errors, control, rules }}
                  name="firstName"
                  rtl
                  placeholder={fa.student.firstName}
                />
                <FormInput
                  {...{ errors, control, rules }}
                  name="lastName"
                  rtl
                  placeholder={fa.student.lastName}
                />
                <FormSelect
                  {...{ errors, control, rules }}
                  name="classroom"
                  options={classOptions}
                  placeholder={(studentData as StudentType)?.classroom || fa.student.classroom}
                />
                <FormInput
                  {...{ errors, control }}
                  name="nationalId"
                  rules={numberValidation({
                    minLength: { value: 10, message: minLengthMessage(10) },
                    maxLength: { value: 10, message: maxLengthMessage(10) },
                  })}
                  placeholder={fa.student.nationalId}
                />
                <FormInput
                  {...{ errors, control }}
                  name="phone"
                  rules={phoneValidation()}
                  placeholder={fa.student.phone}
                />
                <FormInput
                  {...{ errors, control, rules }}
                  name="fatherPhone"
                  rules={phoneValidation()}
                  placeholder={fa.student.fatherPhone}
                />
              </div>
              <div className="flex-1 flex flex-col gap-8 px-5">
                <FormDatePiker {...{ errors, control }} disableFuture name="birthday" />
                <FormInput
                  {...{ errors, control }}
                  name="motherPhone"
                  placeholder={fa.student.motherPhone}
                />
                <FormInput
                  {...{ errors, control }}
                  name="socialMediaID"
                  rtl
                  placeholder={fa.student.socialMediaID}
                />
                <FormInput
                  {...{ errors, control }}
                  name="religion"
                  rtl
                  placeholder={fa.student.religion}
                />
                <FormInput
                  {...{ errors, control }}
                  name="specialDisease"
                  rtl
                  placeholder={fa.student.specialDisease}
                />
                <FormInput
                  {...{ errors, control }}
                  name="address"
                  rtl
                  placeholder={fa.student.address}
                />
              </div>
            </div>

            <div className="mt-10 flex gap-2 justify-center">
              <Button
                type="button"
                className="btn btn-ghost text-red70"
                onClick={(): void => setStudentData(false)}
              >
                {fa.global.cancel}
              </Button>
              <Button type="submit" className="btn btn-primary w-52" isLoading={isPending}>
                {fa.student[id ? 'submit' : 'submitNewStudent']}
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default CreateNewStudent;
