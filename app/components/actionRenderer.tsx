import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import DeleteModal from './deleteModal';
import fa from 'app/lib/fa.json';
import { tagRevalidate } from 'app/lib/server.util';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ActionRenderer: React.FC = (props: any) => {
  const { api, node, setEditData, deleteAction, tag } = props;
  const [deleteId, setDeleteId] = useState(false);
  const { gradeId } = useParams();

  const { mutate, isPending } = useMutation({
    mutationFn: () => deleteAction(gradeId, Number(deleteId)),
    onSuccess: (ok) => {
      if (ok) {
        api.applyTransaction({ remove: [node.data] });
        setDeleteId(false);
        tagRevalidate(tag);
      }
    },
  });

  const handleDelete = (): void => setDeleteId(node.data.id);
  const handleEdit = (): void => {
    setEditData(node.data);
  };

  return (
    <div className="isCenter h-full">
      {!!setEditData && (
        <i className="icon-edit text-berry60 text-20 p-2 cursor-pointer" onClick={handleEdit} />
      )}
      {deleteAction && (
        <i className="icon-trash text-red70 text-20 p-2 cursor-pointer" onClick={handleDelete} />
      )}
      <DeleteModal
        open={!!deleteId}
        setOpen={setDeleteId}
        title={fa.home.deleteConfirm1}
        onDelete={(): void => mutate()}
        isPending={isPending}
        id={`${tag}-${node.data.id}`}
      />
    </div>
  );
};

export default ActionRenderer;
