'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { useMutation } from '@tanstack/react-query';
import fa from 'app/lib/fa.json';
import { LoginRoute } from 'app/lib/routes';
import FormInput from 'app/components/formInput';
import Button from 'app/components/button';
import { minLengthMessage } from 'app/utils/common.util';

type FormType = { phone: string; name: string; password: string; confirmPassword: string };

const RegisterPage: React.FC = () => {
  const rules = { required: true };
  //   const router = useRouter();
  // const { refetch } = useQuery(USER_KEY, getUser, { enabled: false });

  const PostRegister = async (data: FormType): Promise<boolean> => {
    console.log(data);
    // const body = { type: data.auth.includes('@') ? 'email' : 'mobile', ...data };
    // const res = await request.post(RegisterUrl(), body);
    // if (res.ok) {
    //   router.push(VerifyRoute());
    // }
    // refetch();
    return true;
  };

  const { mutate, isPending } = useMutation({ mutationFn: PostRegister });
  const {
    handleSubmit,
    formState: { errors },
    control,
    watch,
  } = useForm<FormType>({
    defaultValues: { phone: '', name: '', password: '', confirmPassword: '' },
  });
  return (
    <form onSubmit={handleSubmit((e) => mutate(e))} className="flex flex-col items-center px-5">
      <div className="my-3 font-semibold text-black70 md:my-10">{fa.account.register}</div>
      <span className="icon-taalei2 mb-20 mt-12 text-[6.4rem] md:hidden" />

      <div className="w-full mb-7 md:w-64 xl:w-80">
        <FormInput {...{ errors, control, rules }} rtl name="name" placeholder={fa.account.name} />
      </div>

      <div className="w-full mb-7 md:w-64 xl:w-80">
        <FormInput
          {...{ errors, control, rules }}
          name="phone"
          type="phone"
          placeholder={fa.account.phone}
        />
      </div>

      <div className="w-full mb-7 md:w-64 xl:w-80">
        <FormInput
          {...{ errors, control }}
          name="password"
          type="password"
          rules={{ required: true, minLength: { value: 8, message: minLengthMessage(8) } }}
          placeholder={fa.account.password}
        />
      </div>
      <div className="w-full mb-7 md:w-64 xl:w-80">
        <FormInput
          {...{ errors, control }}
          name="confirmPassword"
          type="password"
          placeholder={fa.account.confirmPassword}
          rules={{
            required: true,
            validate: (value: string) =>
              value === watch('password') || fa.global.rules.passwordsNotMatch,
          }}
        />
      </div>

      <div className="flex w-full max-w-xs flex-col items-center md:mt-4">
        <div className="mb-6 text-10 text-black70">
          {fa.account.haveAccount}{' '}
          <Link className=" text-berry50" href={LoginRoute()}>
            {fa.account.doLogin}
          </Link>
        </div>

        <Button className="btn btn-primary mb-10 w-full" isLoading={isPending}>
          {fa.account.register}
        </Button>
      </div>
    </form>
  );
};

export default RegisterPage;
