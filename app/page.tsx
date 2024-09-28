import React from 'react';
import { redirect } from 'next/navigation';
import CreateGradeForm from './components/createGradeForm';
import { fetchData, gradesTag } from './lib/server.util';
import { GradeUrl } from './lib/urls';
import { GradeRoute } from './lib/routes';
import { GradeType, PageType } from './types/common.type';

const Home: React.FC<PageType> = async ({ searchParams }) => {
  const tag = await gradesTag();
  const data = await fetchData<GradeType[]>(GradeUrl(), tag);

  if (!!data?.length && !(searchParams?.isCreate || searchParams?.id))
    redirect(GradeRoute(data[0].code, 'dashboard'));

  return <CreateGradeForm grades={data} tag={tag} />;
};

export default Home;
