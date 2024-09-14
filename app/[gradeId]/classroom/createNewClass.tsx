import React, { useEffect, useMemo } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import Button from 'app/components/button';
import fa from 'app/lib/fa.json';
import Modal from 'app/components/modal';
import FormInput from 'app/components/formInput';
import { justNumber } from 'app/utils/common.util';
import FormSelect from 'app/components/formSelect';
import { ClassroomType } from 'app/types/common.type';

type FormType = {
  title: string;
  field: { label: string; value: number };
  floor: number;
  number: number;
};

const data = [
  { id: 1, title: 'ریاضی و فیزیک' },
  { id: 2, title: 'تجربی' },
  { id: 3, title: 'انسانی' },
];

const CreateNewClass: React.FC<{
  classData: ClassroomType | boolean;
  setClassData: (data: ClassroomType | boolean) => void;
}> = ({ classData, setClassData }) => {
  const rules = { required: true };
  const {
    setValue,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<FormType>({
    defaultValues: { title: '', field: undefined, floor: undefined, number: undefined },
  });

  useEffect(() => {
    if (typeof classData !== 'boolean' && classData.title) {
      setValue('title', classData.title);
      setValue('floor', classData.floor);
      setValue('number', classData.number);
      setValue('field', { label: classData.field, value: classData.field_id });
    }
  }, [classData]);

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
    setClassData(false);
    reset();
  };

  const { mutate, isPending } = useMutation({ mutationFn: PostCreate });
  const fieldOptions = useMemo(() => data.map((k) => ({ value: k.id, label: k.title })), [data]);

  return (
    <div className="flex justify-end mt-6">
      <Button onClick={(): void => setClassData(true)} className="btn btn-primary">
        <i className="icon-plus text-32" />
        {fa.classroom.newClass}
      </Button>

      <Modal open={!!classData} setOpen={handleCloseModal} id="create-class">
        <div className="flex flex-col items-center">
          <div className="font-bold text-20 mt-4 text-berry90">{fa.classroom.newClass}</div>
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
              name="filed"
              options={fieldOptions}
              className="mt-8"
              placeholder={(classData as ClassroomType)?.field || fa.classroom.field}
            />

            <FormInput
              {...{ errors, control, rules }}
              name="number"
              className="mt-8"
              rules={{ required: true, pattern: justNumber }}
              placeholder={fa.classroom.number}
            />
            <FormInput
              {...{ errors, control, rules }}
              name="floor"
              className="mt-8"
              rules={{ required: true, pattern: justNumber }}
              placeholder={fa.classroom.floor}
            />

            <Button type="submit" className="btn btn-primary mt-10 w-full" isLoading={isPending}>
              {fa.classroom.submitClass}
            </Button>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default CreateNewClass;
