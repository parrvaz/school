'use client';

import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Button from 'app/components/button';
import fa from 'app/lib/fa.json';

const ReturnButton: React.FC = () => {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    mounted && (
      <Button onClick={() => router.back()} className="btn mt-4 btn-ghost">
        {fa.global.return}
      </Button>
    )
  );
};

export default ReturnButton;
