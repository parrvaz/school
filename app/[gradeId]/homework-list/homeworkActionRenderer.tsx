import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Button from 'app/components/button';
import fa from 'app/lib/fa.json';
import { GradeRoute } from 'app/lib/routes';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const HomeworkActionRenderer: React.FC = (props: any) => {
  const { node } = props;
  const { gradeId } = useParams();

  const handleEdit = (): void => {
    console.log('edit');
  };

  const handleDelete = (): void => {
    console.log('delete');
  };

  console.log(1, node.data);
  return (
    <div className="flex items-center gap-2 h-full">
      <Link href={GradeRoute(gradeId, 'homework-list', '?tab=give-score')}>
        <Button className="btn btn-primary btn-outline btn-xs">{fa.homework.giveScore}</Button>
      </Link>
      <Link href={GradeRoute(gradeId, 'homework-list', '?tab=score-report')}>
        <Button className="btn btn-primary btn-outline btn-xs">{fa.homework.scoreReport}</Button>
      </Link>
      <i className="icon-edit text-berry60 text-20 cursor-pointer" onClick={handleEdit} />
      <i className="icon-trash text-red70 text-20 cursor-pointer" onClick={handleDelete} />
    </div>
  );
};

export default HomeworkActionRenderer;
