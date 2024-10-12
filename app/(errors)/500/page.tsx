'use client';

import { useRouter } from 'next/navigation';
import { faNumber } from 'app/utils/common.util';
import fa from 'app/lib/fa.json';
import Button from 'app/components/button';

const ForbiddenPage: React.FC = () => {
  const router = useRouter();
  return (
    <div className="bg-berry05 h-screen isCenter">
      <div className="bg-white p-10 text-center border border-berry10 rounded-lg">
        <div className="text-48 font-bold text-berry100">{faNumber(500)}</div>
        <div className="font-light text-20 mt-4">{fa.global.serverError}</div>
        <Button onClick={() => router.back()} className="btn mt-4 btn-ghost">
          {fa.global.return}
        </Button>
      </div>
    </div>
  );
};

export default ForbiddenPage;
