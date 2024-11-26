import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { GradeRoute } from 'app/lib/routes';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ShowHomeworkRenderer: React.FC = (props: any) => {
  const { node } = props;
  const { gradeId } = useParams();

  return (
    <div className="flex items-center gap-2 h-full text-berry70">
      <Link
        className="h-7"
        href={GradeRoute(gradeId, 'homework-delivery', `?homeworkId=${node.data.id}&show=true`)}
      >
        <i className="icon-eye text-24" />
      </Link>
      <Link
        className="h-7"
        href={GradeRoute(gradeId, 'homework-delivery', `?homeworkId=${node.data.id}`)}
      >
        <i className="icon-edit text-24" />
      </Link>
    </div>
  );
};

export default ShowHomeworkRenderer;
