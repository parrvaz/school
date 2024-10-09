'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React from 'react';
import Cookies from 'js-cookie';
import fa from 'app/lib/fa.json';
import { LogoutAction } from 'app/lib/actions';
import { LoginRoute } from 'app/lib/routes';

const Logout: React.FC = () => {
  const router = useRouter();
  const { mutate } = useMutation({
    mutationFn: LogoutAction,
    onSuccess: (ok) => {
      if (ok) {
        Cookies.remove('token');
        router.replace(LoginRoute());
      }
    },
  });
  return (
    <div className="tooltip tooltip-bottom" data-tip={fa.global.logout}>
      <i
        onClick={() => mutate()}
        className="icon-logout text-20 text-black70 cursor-pointer hover:text-red70"
      />
    </div>
  );
};

export default Logout;
