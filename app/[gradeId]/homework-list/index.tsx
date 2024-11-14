'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Button from 'app/components/button';
import fa from 'app/lib/fa.json';
import { GradeRoute } from 'app/lib/routes';

const HomeworkList: React.FC = () => {
  const { gradeId } = useParams();
  return (
    <div className="relative">
      HomeworkList
      <Link
        href={GradeRoute(gradeId, 'homework-list', '?tab=create')}
        className="bg-white fixed bottom-0 w-full left-0 p-3 text-left"
      >
        <Button className="btn btn-primary">{fa.homework.createNewHomework}</Button>
      </Link>
    </div>
  );
};

export default HomeworkList;
