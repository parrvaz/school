import React from 'react';
import { Metadata } from 'next';
import fa from 'app/lib/fa.json';
import { fetchData } from 'app/lib/server.util';
import { ShowStudentHomeworkUrl } from 'app/lib/urls';
import { PageType, SingleStudentHomeworkType } from 'app/types/common.type';
import DeliverHomework from './deliverHomework';

export const metadata: Metadata = { title: fa.sidebar.homeworkList };

const HomeworkDeliveryFormPage: React.FC<PageType> = async ({ params, searchParams }) => {
  const homeworkId = params?.homeworkId || '';
  const justShow = searchParams?.show === 'true';

  const [homework] = await Promise.all([
    fetchData<SingleStudentHomeworkType>(ShowStudentHomeworkUrl(params?.gradeId, homeworkId)),
  ]);

  return (
    <div className="pb-20">
      <h1 className="font-bold text-berry100 text-24 mb-10">{fa.homework.deliverHomework}</h1>

      <DeliverHomework data={homework as SingleStudentHomeworkType} justShow={justShow} />
    </div>
  );
};

export default HomeworkDeliveryFormPage;
