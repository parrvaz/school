'use client';

import React, { useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { ClassroomType, PlansType, SelectOptionType, StudentType } from 'app/types/common.type';
import fa from 'app/lib/fa.json';
import { getOption, handleDuplicatePlan } from 'app/utils/common.util';
import ReactSelect from 'app/components/select';
import Button from 'app/components/button';
import { GradeRoute } from 'app/lib/routes';
import { tagRevalidate } from 'app/lib/server.util';
import { UpdatePlanListAction } from 'app/lib/actions';
import StudentsModal from './studentsModal';
import PlanNameModal from './planNameModal';
import ChangeClassModal from './changeClassModal';

const SetCalendar: React.FC<{
  students: StudentType[];
  classes: ClassroomType[];
  plans: PlansType[];
  tag: string;
}> = ({ students, classes, plans, tag }) => {
  const router = useRouter();
  const { gradeId } = useParams();
  const [data, setData] = useState<PlansType[]>(plans);
  const classOptions = useMemo(() => getOption(classes, 'title'), [classes]);
  const [selectedPlan, setSelectedPlan] = useState<PlansType | null>(null);
  const [openPlanNameModal, setOpenPlanNameModal] = useState<number | null>(null);
  const [classModalId, setClassModalId] = useState<{
    id: number;
    newClass: SelectOptionType;
  } | null>(null);
  const studentsWithPlan = data
    .map((k) => k.students)
    .flat()
    .map((k) => k?.id || 0);

  const { mutate, isPending } = useMutation({
    mutationFn: () => UpdatePlanListAction(data, gradeId.toString()),
    onSuccess: (ok) => ok && tagRevalidate(tag),
  });

  const handleSelectClass = (id: number, option: SelectOptionType | null): void => {
    const newData = data.map((k) =>
      k.id === id
        ? { ...k, classroom: option?.label, classroom_id: Number(option?.value), students: [] }
        : k
    );
    setData(newData);
  };

  const handleChangeStudents = (newPlan: PlansType): void => {
    const newData = data.map((k) => (k.id === newPlan.id ? newPlan : k));
    setData(newData);
  };

  return (
    <div className="">
      <div className="grid font-bold mb-1 pr-2 text-14 text-berry100 grid-cols-[10rem_8rem_11rem_1fr]">
        <div className="">{fa.plan.planName}</div>
        <div className="">{fa.global.action}</div>
        <div className="">{fa.global.className}</div>
        <div className="pr-4">{fa.global.studentsName}</div>
      </div>

      <div className="rounded-lg bg-white">
        {data.map((plan) => (
          <div
            key={plan.title}
            className="font-light  text-16 p-1 border-t items-center border-t-black20 grid grid-cols-[10rem_8rem_11rem_1fr]"
          >
            <div className="pr-1">{plan.title}</div>
            <div className="flex items-center">
              <i
                onClick={() => setData(data.filter((k) => k.id !== plan.id))}
                className="icon-close text-24 cursor-pointer hover:bg-berry10 duration-300 p-1 rounded-full"
              />
              {plan.isDuplicate && (
                <div className="tooltip h-5" data-tip={fa.plan.disableAction}>
                  <i className="icon-info-circle text-20 p-2 mt-1" />
                </div>
              )}
              {!plan.isDuplicate && (
                <i
                  onClick={() => router.push(GradeRoute(gradeId, 'set-plan', plan.id))}
                  className="icon-edit text-20 cursor-pointer hover:bg-berry10 duration-300 p-2 rounded-full"
                />
              )}
              {!plan.isDuplicate && (
                <i
                  onClick={() => setOpenPlanNameModal(plan.id || null)}
                  className="icon-note text-20 cursor-pointer hover:bg-berry10 duration-300 p-2 rounded-full"
                />
              )}
            </div>
            <ReactSelect
              onChange={(e) => {
                e.value !== plan.classroom_id && plan.students?.length
                  ? setClassModalId({ newClass: e, id: plan.id })
                  : handleSelectClass(plan.id, e);
              }}
              value={{
                value: Number(plan?.classroom_id),
                label: plan.classroom || fa.global.className,
              }}
              options={classOptions}
            />

            <div
              onClick={() => setSelectedPlan(plan)}
              className="mr-3 h-full text-12 flex items-center gap-2 cursor-pointer rounded-lg hover:bg-berry10 duration-300"
            >
              <i className="icon-edit text-20 " />
              <div className="">{plan?.students?.map((k) => k.name).join(', ') || '-'}</div>
            </div>
          </div>
        ))}
      </div>

      <Button
        onClick={() => router.push(GradeRoute(gradeId, 'set-plan', `new`))}
        className="btn btn-primary self-end mt-3"
      >
        {fa.plan.createNewPlan}
      </Button>
      <Button
        isLoading={isPending}
        onClick={() => mutate()}
        className="btn btn-primary self-end mt-3"
      >
        {fa.global.submit}
      </Button>

      <StudentsModal
        onChange={handleChangeStudents}
        {...{ selectedPlan, setSelectedPlan, students, studentsWithPlan }}
      />
      <PlanNameModal
        names={data.map((k) => k.title)}
        onSetName={(name, id) => handleDuplicatePlan(data, setData, Number(id), name)}
        id={openPlanNameModal}
        setId={setOpenPlanNameModal}
      />
      <ChangeClassModal
        onYes={(value) => handleSelectClass(Number(value?.id), value?.newClass || null)}
        info={classModalId}
        setInfo={setClassModalId}
      />
    </div>
  );
};

export default SetCalendar;
