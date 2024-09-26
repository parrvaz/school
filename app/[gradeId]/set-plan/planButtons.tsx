import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import Button from 'app/components/button';
import { GradeRoute } from 'app/lib/routes';
import fa from 'app/lib/fa.json';
import { UpdatePlanListAction } from 'app/lib/actions';
import { tagRevalidate } from 'app/lib/server.util';
import { PlansType } from 'app/types/common.type';

const PlanButtons: React.FC<{
  tag: string;
  data: PlansType[];
  onClear: () => void;
  hasChange: boolean;
}> = ({ tag, data, onClear, hasChange }) => {
  const router = useRouter();
  const { gradeId } = useParams();

  const { mutate, isPending } = useMutation({
    mutationFn: () => UpdatePlanListAction(data, gradeId.toString()),
    onSuccess: (ok) => ok && tagRevalidate(tag),
  });

  return (
    <div className="flex justify-between mt-4">
      <Button
        type="button"
        onClick={() => router.push(GradeRoute(gradeId, 'set-plan', `new`))}
        className="btn btn-primary btn-outline"
      >
        {fa.plan.createNewPlan}
      </Button>
      {hasChange && (
        <div className="flex gap-2">
          <Button onClick={onClear} type="button" className="btn btn-ghost">
            {fa.plan.clearChange}
          </Button>
          <Button isLoading={isPending} onClick={() => mutate()} className="btn btn-primary">
            {fa.global.submit}
          </Button>
        </div>
      )}
    </div>
  );
};

export default PlanButtons;
