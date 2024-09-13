'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { useMutation } from '@tanstack/react-query';
// import { useRouter, useSearchParams } from 'next/navigation';
import { RegisterRoute } from 'app/lib/routes';
// import request from 'app/lib/request';
import fa from 'app/lib/fa.json';
import FormInput from 'app/components/formInput';
import Button from 'app/components/button';
// import { ResponseType } from 'app/types/common.type';
// import { setCookie } from 'app/utils/common.util';
// import useClearCacheData from 'app/hooks/useClearCacheData';

type FormType = { auth: string; password: string };

const LoginPage: React.FC = () => {
  const rules = { required: true };
  // const router = useRouter();
  // const searchParams = useSearchParams();
  // const clearData = useClearCacheData();
  // const { refetch } = useQuery(USER_KEY, getUser, { enabled: false });

  const PostLogin = async (e: FormType): Promise<boolean> => {
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

  const { mutate, isPending } = useMutation({ mutationFn: PostLogin });
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormType>({ defaultValues: { auth: '', password: '' } });
  return (
    <form
      onSubmit={handleSubmit((e) => mutate(e))}
      className="flex h-full w-full flex-col items-center px-5"
    >
      <div className="my-3 font-semibold text-18 text-black70 md:my-12">{fa.account.login}</div>
      <span className="icon-taalei2 my-10 text-[6.4rem] md:hidden" />

      <div className="flex w-full flex-col md:w-64 xl:w-80">
        <FormInput {...{ errors, control, rules }} name="auth" placeholder={fa.account.phone} />
        <FormInput
          {...{ errors, control }}
          name="password"
          type="password"
          className="mt-10"
          rules={{ required: true }}
          placeholder={fa.account.password}
        />
        {/* <Link className="mt-5 font-regular text-10 text-black60" href={ForgetPasswordRoute()}>
          {fa.account.forgotPassword}
        </Link> */}
      </div>

      <div className="mt-auto flex w-full max-w-xs flex-col items-center md:mt-12">
        <div className="mb-6 text-12 text-black70">
          {fa.account.noAccount}{' '}
          <Link className=" text-berry50" href={RegisterRoute()}>
            {fa.account.doRegister}
          </Link>
        </div>

        <Button className="btn btn-primary mb-10 w-full" isLoading={isPending}>
          {fa.account.enter}
        </Button>
      </div>
    </form>
  );
};

export default LoginPage;
