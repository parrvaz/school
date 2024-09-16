import { redirect } from 'next/navigation';
import CreateGradeForm from './components/createGradeForm';
import { fetchData, gradesTag } from './lib/server.util';
import { GradeUrl } from './lib/urls';
import { GradeRoute } from './lib/routes';
import { GradeType, PageType } from './types/common.type';

const Home: React.FC<PageType> = async ({ searchParams }) => {
  const data = await fetchData<{ data: GradeType[] }>(GradeUrl(), gradesTag());

  if (!!data.data.length && !(searchParams?.isCreate || searchParams?.id))
    redirect(GradeRoute(data.data[0].code, 'dashboard'));

  return <CreateGradeForm grades={data.data} />;
};

export default Home;
