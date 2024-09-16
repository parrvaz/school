import { redirect } from 'next/navigation';
import CreateGradeForm from './components/createGradeForm';
import { fetchData } from './lib/server.util';
import { GradeUrl } from './lib/urls';
import { GradeRoute } from './lib/routes';
import { GradeType } from './types/common.type';

const Home: React.FC = async () => {
  const data = await fetchData<{ data: GradeType[] }>(GradeUrl(), 'grades');

  console.log(4, data);
  if (!!data.data.length) redirect(GradeRoute(data.data[0].id, 'dashboard'));

  return <CreateGradeForm grades={data.data} />;
};

export default Home;
