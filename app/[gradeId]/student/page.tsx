import { Metadata } from 'next';
import fa from 'app/lib/fa.json';
import StudentsTable from './studentsTable';

export const metadata: Metadata = { title: fa.sidebar.student };

const StudentPage: React.FC = () => {
  const data = [
    {
      id: 100,
      firstName: 'خداداد',
      lastName: 'خداداد22',
      classroom: 'تیرداد',
      nationalId: '1234567892',
      classroom_id: 9,
      birthday: '',
      isOnlyChild: false,
      address: '',
      phone: '09383851962',
      socialMediaID: '',
      numberOfGlasses: '',
      isLeftHand: false,
      religion: '',
      specialDisease: '',
    },
    {
      id: 101,
      firstName: 'خ4fdداداد',
      lastName: 'خدffاداد22',
      classroom: 'تیرداد',
      nationalId: '1234567892',
      classroom_id: 9,
      birthday: '',
      isOnlyChild: false,
      address: '',
      phone: '09383851962',
      socialMediaID: '',
      numberOfGlasses: '',
      isLeftHand: false,
      religion: '',
      specialDisease: '',
    },
    {
      id: 102,
      firstName: 'خداsdداد',
      lastName: 'خدادffdاد22',
      classroom: 'تیرdsfداد',
      nationalId: '1234567892',
      classroom_id: 9,
      birthday: '',
      isOnlyChild: false,
      address: '',
      phone: '09383851962',
      socialMediaID: '',
      numberOfGlasses: '',
      isLeftHand: false,
      religion: '',
      specialDisease: '',
    },
  ];
  return (
    <div className="">
      <h1 className="font-bold text-berry100 text-32 mb-10">{fa.sidebar.student}</h1>
      <StudentsTable data={data} />
    </div>
  );
};

export default StudentPage;
