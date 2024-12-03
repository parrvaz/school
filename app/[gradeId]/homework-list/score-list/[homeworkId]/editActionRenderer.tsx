import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { GradeRoute } from 'app/lib/routes';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const EditActionRenderer: React.FC = (props: any) => {
  const { id } = props.node.data;
  const { gradeId, homeworkId } = useParams();

  return (
    <Link
      href={GradeRoute(gradeId, 'homework-list', `/give-score/${homeworkId}?id=${id}`)}
      className="block"
    >
      <i className="icon-edit text-24 text-berry60 p-2 block" />
    </Link>
  );
};

export default EditActionRenderer;
