import { Metadata } from 'next';
import ClassTable from './classTable';
import fa from 'app/lib/fa.json';

export const metadata: Metadata = { title: fa.sidebar.classroom };

const ClassroomPage: React.FC = () => {
  const data = [
    {
      id: 9,
      title: 'ریاضی ۱۰۱',
      number: 101,
      floor: 2,
      user_grade_id: 2,
      field_id: 1,
      field: 'ریاضی و فیزیک',
    },
    {
      id: 10,
      title: 'ریاضی ۱۰۲',
      number: 102,
      floor: 2,
      user_grade_id: 2,
      field_id: 1,
      field: 'ریاضی و فیزیک',
    },
    {
      id: 11,
      title: 'تجربی ۱۰۳',
      number: 103,
      floor: 3,
      user_grade_id: 2,
      field_id: 2,
      field: 'تجربی',
    },
  ];

  return (
    <div className="">
      <h1 className="font-bold text-berry100 text-24 mb-10">{fa.sidebar.classroom}</h1>
      <ClassTable data={data} />
    </div>
  );
};

export default ClassroomPage;
