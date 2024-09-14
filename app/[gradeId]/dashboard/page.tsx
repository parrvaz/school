'use client';

import { useQuery } from '@tanstack/react-query';
import request from 'app/lib/request';
import { GradeUrl } from 'app/lib/urls';

const DashboardPage: React.FC = () => {
  const getData = async (): Promise<void> => {
    const res = await request.get(GradeUrl());
    console.log('aa', res);
  };
  const { data } = useQuery({ queryKey: ['todos'], queryFn: getData });
  return <div className="">Dashboard</div>;
};

export default DashboardPage;
