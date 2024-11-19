import React from 'react';
import { useParams } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { JustifyAbsentAction } from 'app/lib/actions';
import { tagRevalidate } from 'app/lib/server.util';

const JustifyRenderer: React.FC = (props: any) => {
  const { node, jalaliDate, tag } = props;
  const { gradeId } = useParams();

  const { mutate, isPending } = useMutation({
    mutationFn: () =>
      JustifyAbsentAction(gradeId.toString(), {
        date: jalaliDate,
        student_id: node.data.student_id,
      }),
    onSuccess: (ok) => ok && tagRevalidate(tag),
  });

  const hasAbsent = !!Object.values(node.data.bells).find((item: any) => item.status === 'absent');
  return (
    <div className="flex items-center justify-center h-full">
      {node.data.classroom ? null : (
        <i
          onClick={() => !isPending && mutate()}
          className={`${isPending ? 'loading loading-spinner text-berry70' : hasAbsent ? 'icon-close text-24 text-red70' : 'icon-check text-20 text-green70'} cursor-pointer`}
        />
      )}
    </div>
  );
};

export default JustifyRenderer;
