import React, { useState } from 'react';
import Link from 'next/link';
import { useMutation } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import Button from 'app/components/button';
import fa from 'app/lib/fa.json';
import { GradeRoute } from 'app/lib/routes';
import DeleteModal from 'app/components/deleteModal';
import { DeleteHomeworkAction } from 'app/lib/actions';
import { tagRevalidate } from 'app/lib/server.util';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const HomeworkActionRenderer: React.FC = (props: any) => {
  const { node, tag, api } = props;
  const { gradeId } = useParams();
  const router = useRouter();
  const [deleteId, setDeleteId] = useState(false);

  const handleEdit = (): void =>
    router.push(GradeRoute(gradeId, 'homework-list', `?tab=create&homeworkId=${node.data.id}`));

  const handleDelete = (): void => setDeleteId(node.data.id);

  const { mutate, isPending } = useMutation({
    mutationFn: () => DeleteHomeworkAction(gradeId.toString(), Number(deleteId)),
    onSuccess: (ok) => {
      if (ok) {
        api.applyTransaction({ remove: [node.data] });
        setDeleteId(false);
        tagRevalidate(tag);
      }
    },
  });

  return (
    <div className="flex items-center gap-2 h-full">
      <Button disabled={!node.data.submitStdNumber} className="btn btn-primary btn-outline btn-xs">
        <Link href={GradeRoute(gradeId, 'homework-list', `/give-score/${node.data.id}`)}>
          {fa.homework.giveScore}
        </Link>
      </Button>
      <Link href={GradeRoute(gradeId, 'homework-list', '?tab=score-report')}>
        <Button className="btn btn-primary btn-outline btn-xs">{fa.homework.scoreReport}</Button>
      </Link>
      <i className="icon-edit text-berry60 text-20 cursor-pointer" onClick={handleEdit} />
      <i className="icon-trash text-red70 text-20 cursor-pointer" onClick={handleDelete} />

      <DeleteModal
        open={!!deleteId}
        setOpen={setDeleteId}
        title={fa.homework.deleteConfirm}
        onDelete={(): void => mutate()}
        isPending={isPending}
        id={`${tag}-${node.data.id}`}
      />
    </div>
  );
};

export default HomeworkActionRenderer;
