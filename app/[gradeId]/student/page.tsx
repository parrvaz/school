import React from 'react';
import { Metadata } from 'next';
import fa from 'app/lib/fa.json';
import StudentsTable from './studentsTable';
// import { fetchData } from 'app/lib/server.util';
// import { ShowStudentUrl } from 'app/lib/urls';
import { PageType } from 'app/types/common.type';

export const metadata: Metadata = { title: fa.sidebar.student };

const StudentPage: React.FC<PageType> = async ({ params }) => {
  // const data = await fetchData<{ data: GradeType[] }>(ShowStudentUrl(params.gradeId), 'students');

  const data = [
    {
      id: 100,
      firstName: 'خداداد',
      lastName: 'خداداد22',
      classroom: 'تیرداد',
      nationalId: 1234567892,
      classroom_id: 9,
      birthday: '',
      isOnlyChild: false,
      address: '',
      phone: 383851962,
      socialMediaID: 34543,
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
      nationalId: 1234567892,
      classroom_id: 9,
      birthday: '',
      isOnlyChild: false,
      address: '',
      phone: 9383851962,
      socialMediaID: 3432,
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
      nationalId: 1234567892,
      classroom_id: 9,
      birthday: '',
      isOnlyChild: false,
      address: '',
      phone: 9383851962,
      socialMediaID: 3432,
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
