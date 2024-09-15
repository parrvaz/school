'use client';

import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import fa from 'app/lib/fa.json';
import FormInput from './formInput';
import Button from './button';
import { GradeType, ResponseType } from 'app/types/common.type';
import request from 'app/lib/request';
import { CreateGradeUrl } from 'app/lib/urls';
import { GradeRoute } from 'app/lib/routes';
import FormSelect from './formSelect';
import { useEffect } from 'react';

type FormType = { title: string; grade: { label: string; value: number } };

const gradeOptions = [
  { label: fa.global.grade10, value: 10 },
  { label: fa.global.grade11, value: 11 },
  { label: fa.global.grade12, value: 12 },
];

const CreateGradeForm: React.FC<{ grades: GradeType[] }> = ({ grades }) => {
  const rules = { required: true };
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormType>({ defaultValues: { title: '', grade: undefined } });

  useEffect(() => {
    if (id) {
      console.log(id, grades);
    }
  }, [id]);

  const PostCreateGrade = async (value: FormType): Promise<boolean> => {
    const body = { title: value.title, grade_id: value.grade.value };
    const res: ResponseType<{ data: GradeType }> = await request.post(CreateGradeUrl(), body);
    console.log('submit', body, res);
    if (res.ok) router.replace(GradeRoute(res.data?.data.id || 1, 'dashboard'));

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
          <FormSelect
            {...{ errors, control, rules }}
            name="grade"
            options={gradeOptions}
            className="mt-8"
            placeholder={fa.home.chooseGrade}
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
