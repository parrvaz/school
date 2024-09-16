import { Metadata } from 'next';
import ClassTable from './classTable';
import fa from 'app/lib/fa.json';
import { classroomTag, fetchData } from 'app/lib/server.util';
import { ClassroomType, PageType } from 'app/types/common.type';
import { ShowClassUrl } from 'app/lib/urls';

export const metadata: Metadata = { title: fa.sidebar.classroom };

const ClassroomPage: React.FC<PageType> = async ({ params }) => {
  const data = await fetchData<{ data: ClassroomType[] }>(
    ShowClassUrl(params?.gradeId),
    classroomTag()
  );

  console.log(1, data.data.length);
  return (
    <div className="">
      <h1 className="font-bold text-berry100 text-24 mb-10">{fa.sidebar.classroom}</h1>
      <ClassTable data={data.data} />
    </div>
  );
};

export default ClassroomPage;
