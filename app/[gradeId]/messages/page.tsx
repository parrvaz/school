import React from 'react';
import { Metadata } from 'next';
import fa from 'app/lib/fa.json';
// import { fetchData, studentTag } from 'app/lib/server.util';
// import { ShowStudentUrl } from 'app/lib/urls';
import { PageType } from 'app/types/common.type';

export const metadata: Metadata = { title: fa.sidebar.messages };

const MessagesPage: React.FC<PageType> = async () => {
  // const [data] = await Promise.all([
  //   fetchData<StudentType[]>(ShowStudentUrl(params.gradeId), await studentTag()),
  // ]);

  return (
    <div className="">
      <h1 className="font-bold text-berry100 text-24 mb-10">{fa.sidebar.messages}</h1>
    </div>
  );
};

export default MessagesPage;
