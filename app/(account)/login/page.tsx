'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { useMutation } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import { HomeRoute, RegisterRoute } from 'app/lib/routes';
import fa from 'app/lib/fa.json';
import FormInput from 'app/components/formInput';
import Button from 'app/components/button';
import { LoginUrl } from 'app/lib/urls';
import request from 'app/lib/request';
import { setCookie } from 'app/utils/common.util';
import { ResponseType } from 'app/types/common.type';
import useClearCacheData from 'app/hooks/useClearCacheData';

type FormType = { phone: string; password: string };

const LoginPage: React.FC = () => {
  const rules = { required: true };
  const router = useRouter();
  const searchParams = useSearchParams();
  const clearData = useClearCacheData();

  const PostLogin = async (e: FormType): Promise<boolean> => {
    const res: ResponseType<{ token: string }> = await request.post(LoginUrl(), e);
    if (res.ok) {
      setCookie(res.data?.token);
      router.push(HomeRoute());
      clearData();
      router.replace(searchParams.get('next') || HomeRoute());
    }
    return true;
  };

  const { mutate, isPending } = useMutation({ mutationFn: PostLogin });
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormType>({ defaultValues: { phone: '', password: '' } });
  return (
    <form
      onSubmit={handleSubmit((e) => mutate(e))}
      className="flex h-full w-full flex-col items-center px-5"
    >
      <div className="my-3 font-semibold text-18 text-black70 md:my-12">{fa.account.login}</div>

      <div className="flex w-full flex-col md:w-64 xl:w-80">
        <FormInput {...{ errors, control, rules }} name="phone" placeholder={fa.account.phone} />
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
