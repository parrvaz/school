'use client';

import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import fa from 'app/lib/fa.json';
import FormInput from './formInput';
import Button from './button';
import { GradeType, ResponseType } from 'app/types/common.type';
import request from 'app/lib/request';
import { CreateGradeUrl } from 'app/lib/urls';
import { GradeRoute } from 'app/lib/routes';

type FormType = { title: string };

const CreateGradeForm: React.FC = () => {
  const rules = { required: true };
  const router = useRouter();
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormType>({ defaultValues: { title: '' } });

  const PostCreateGrade = async (e: FormType): Promise<boolean> => {
    const res: ResponseType<{ data: GradeType[] }> = await request.post(CreateGradeUrl(), e);
    console.log('submit', e, res);
    if (res.ok) router.replace(GradeRoute(res.data?.data[0].id || 12, 'dashboard'));

    return true;
  };

  const { mutate, isPending } = useMutation({ mutationFn: PostCreateGrade });
  return (
    <div className="isCenter h-screen  bg-berry10  ">
      <div className="flex flex-col w-[34rem] px-20 items-center rounded-2xl border-2  border-white md:bg-white50">
        <i className="icon-trend-up text-berry60 mt-10 text-48" />
        <div className="text-24 font-bold text-berry100 mt-6 mb-8">{fa.home.welcome}</div>
        <div className="text-16 font-regular text-black70 mb-1">{fa.home.info1}</div>
        <div className="text-16 font-regular text-black70">{fa.home.info2}</div>
        <form onSubmit={handleSubmit((e) => mutate(e))} className="w-full">
          <FormInput
            {...{ errors, control, rules }}
            name="title"
            rtl
            placeholder={fa.home.gradeName}
            className="mt-12 w-full"
          />

          <Button className="btn btn-primary mb-10 w-full mt-9" isLoading={isPending}>
            {fa.home.start}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateGradeForm;
