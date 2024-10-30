'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import Button from 'app/components/button';
import fa from 'app/lib/fa.json';

const ReturnButton: React.FC = () => {
  const router = useRouter();

  return (
    <Button onClick={() => router.back()} className="btn mt-4 btn-ghost">
      {fa.global.return}
    </Button>
  );
};

export default ReturnButton;
