'use client';

import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import fa from 'app/lib/fa.json';
import FormInput from './components/formInput';
import Button from './components/button';

type FormType = { title: string };

const Home: React.FC = () => {
  const rules = { required: true };

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormType>({ defaultValues: { title: '' } });

  const PostCreateGrade = async (e: FormType): Promise<boolean> => {
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

export default Home;
