import React from 'react';
import { Metadata } from 'next';
import fa from 'app/lib/fa.json';
import { fetchData, studentHomeworkTag } from 'app/lib/server.util';
import { ShowStudentHomeworkUrl } from 'app/lib/urls';
import { PageType, SingleStudentHomeworkType, StudentHomeworkType } from 'app/types/common.type';
import StudentHomeworkList from '.';

export const metadata: Metadata = { title: fa.sidebar.homeworkList };

const HomeworkDeliveryListPage: React.FC<PageType> = async ({ params, searchParams }) => {
  const homeworkId = searchParams?.homeworkId || '';

  const [homework] = await Promise.all([
    fetchData<StudentHomeworkType[] | SingleStudentHomeworkType>(
      ShowStudentHomeworkUrl(params?.gradeId, homeworkId),
      await studentHomeworkTag(homeworkId)
    ),
  ]);

  return (
    <div className="pb-20">
      <h1 className="font-bold text-berry100 text-24 mb-10">
        {fa.homework[homeworkId ? 'deliverHomework' : 'homeworkList']}
      </h1>

      <StudentHomeworkList data={homework as StudentHomeworkType[]} />
    </div>
  );
};

export default HomeworkDeliveryListPage;
