import React from 'react';
import { useParams } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import Button from 'app/components/button';
import fa from 'app/lib/fa.json';
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
    <div className="text-center">
      {node.data.classroom ? null : (
        <Button
          isLoading={isPending}
          onClick={() => mutate()}
          className={`btn btn-sm ${hasAbsent ? 'btn-success' : 'btn-error'}`}
        >
          {fa.absents[hasAbsent ? 'justify' : 'notJustify']}
        </Button>
      )}
    </div>
  );
};

export default JustifyRenderer;
