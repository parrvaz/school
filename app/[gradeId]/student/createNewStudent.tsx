import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import React, { useMemo } from 'react';
import Button from 'app/components/button';
import { StudentType } from 'app/types/common.type';
import fa from 'app/lib/fa.json';
import Modal from 'app/components/modal';
import FormInput from 'app/components/formInput';
import FormSelect from 'app/components/formSelect';
import {
  justNumber,
  maxLengthMessage,
  minLengthMessage,
  numberValidation,
} from 'app/utils/common.util';

type FormType = {
  firstName: string;
  lastName: string;
  nationalId: number;
  phone: number;
  birthday: string;
  socialMediaID: string;
  religion: string;
  specialDisease: string;
  address: string;
  field: { label: string; value: number };
};

const defaultValues = {
  firstName: '',
  lastName: '',
  nationalId: undefined,
  phone: undefined,
  birthday: '',
  socialMediaID: '',
  religion: '',
  specialDisease: '',
  address: '',
  field: { label: '', value: undefined },
};

const data = [
  { id: 1, title: 'ریاضی و فیزیک' },
  { id: 2, title: 'تجربی' },
  { id: 3, title: 'انسانی' },
];

const CreateNewStudent: React.FC<{
  studentData: StudentType | boolean;
  setStudentData: (data: StudentType | boolean) => void;
}> = ({ studentData, setStudentData }) => {
  const rules = { required: true };
  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<FormType>({ defaultValues });

  // useEffect(() => {
  //     if (typeof classData !== 'boolean' && classData.title) {
  //       setValue('title', classData.title);
  //       setValue('floor', classData.floor);
  //       setValue('number', classData.number);
  //       setValue('field', { label: classData.field, value: classData.field_id });
  //     }
  //   }, [classData]);

  const PostCreate = async (e: FormType): Promise<boolean> => {
    console.log('submit', e);
    // const isMobile = !auth.includes('@');
    // const body = isMobile ? { mobile: auth, password } : { email: auth, password };
    // const url = isMobile ? LoginMobileUrl() : LoginEmailUrl();
    // const res: ResponseType<{ user: UserType }> = await request.post(url, body);
    // if (res.ok) {
    //   setCookie(res.data?.user.token);
    //   // refetch();
    //   clearData();
    //   // router.replace(searchParams.get('next') || HomeRoute());
    // }
    return true;
  };

  const handleCloseModal = (): void => {
    setStudentData(false);
    reset();
  };

  const { mutate, isPending } = useMutation({ mutationFn: PostCreate });
  const fieldOptions = useMemo(() => data.map((k) => ({ value: k.id, label: k.title })), [data]);

  return (
    <div className="flex justify-end mt-6">
      <Button onClick={(): void => setStudentData(true)} className="btn btn-primary">
        <i className="icon-plus text-32" />
        {fa.classroom.newClass}
      </Button>

      {/* <AppDatePicker /> */}

      <form className="w-full px-14" onSubmit={handleSubmit((e) => mutate(e))}>
        <div className="w-[800px] bg-green10 flex">
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
              placeholder={fa.student.firstName}
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
              rules={numberValidation()}
              placeholder={fa.student.phone}
            />
            <FormSelect
              {...{ errors, control, rules }}
              name="filed"
              options={fieldOptions}
              className="mt-8"
              placeholder={(studentData as StudentType)?.classroom || fa.classroom.field}
            />
          </div>
          <div className="flex-1 px-5">
            <FormInput
              {...{ errors, control, rules }}
              name="floor"
              className="mt-8"
              rules={{ required: true, pattern: justNumber }}
              placeholder={fa.classroom.floor}
            />
          </div>
        </div>
        <Button type="submit" className="btn btn-primary mt-10 w-full" isLoading={isPending}>
          {fa.classroom.submitClass}
        </Button>
      </form>

      <Modal open={!!studentData} setOpen={handleCloseModal} id="create-class">
        <div className="flex flex-col items-center">
          <div className="font-bold text-20 mt-4 text-berry90">{fa.student.newStudent}</div>
        </div>
      </Modal>
    </div>
  );
};

export default CreateNewStudent;
