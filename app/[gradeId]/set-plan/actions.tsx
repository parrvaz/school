import { useParams, useRouter } from 'next/navigation';
import React from 'react';
import fa from 'app/lib/fa.json';
import { GradeRoute } from 'app/lib/routes';
import { PlansType } from 'app/types/common.type';

const Actions: React.FC<{
  plan: PlansType;
  setData: (value: PlansType[]) => void;
  setOpenPlanNameModal: (id: number | null) => void;
  data: PlansType[];
}> = ({ plan, setData, setOpenPlanNameModal, data }) => {
  const router = useRouter();
  const { gradeId } = useParams();

  return (
    <div className="flex items-center">
      {plan.isDuplicate ? (
        <div className="tooltip h-5" data-tip={fa.plan.disableAction}>
          <i className="icon-info-circle text-20 p-2 mt-1" />
        </div>
      ) : (
        <>
          <i
            onClick={() => setData(data.filter((k) => k.id !== plan.id))}
            className="icon-close text-24 cursor-pointer hover:bg-berry10 duration-300 p-1 rounded-full"
          />
          <i
            onClick={() => router.push(GradeRoute(gradeId, 'set-plan', plan.id))}
            className="icon-edit text-20 cursor-pointer hover:bg-berry10 duration-300 p-2 rounded-full"
          />
          <i
            onClick={() => setOpenPlanNameModal(plan.id || null)}
            className="icon-note text-20 cursor-pointer hover:bg-berry10 duration-300 p-2 rounded-full"
          />
        </>
      )}
    </div>
  );
};

export default Actions;
