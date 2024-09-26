'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { ClassroomType, PlansType, SelectOptionType, StudentType } from 'app/types/common.type';
import fa from 'app/lib/fa.json';
import { faNumber, getOption, handleDuplicatePlan } from 'app/utils/common.util';
import ReactSelect from 'app/components/select';
import StudentsModal from './studentsModal';
import PlanNameModal from './planNameModal';
import ChangeClassModal from './changeClassModal';
import Actions from './actions';
import PlanButtons from './planButtons';
import { pl } from 'date-fns/locale';

const SetCalendar: React.FC<{
  students: StudentType[];
  classes: ClassroomType[];
  plans: PlansType[];
  tag: string;
}> = ({ students, classes, plans, tag }) => {
  const [data, setData] = useState<PlansType[]>(plans);
  const classOptions = useMemo(() => getOption(classes, 'title'), [classes]);
  const [selectedPlan, setSelectedPlan] = useState<PlansType | null>(null);
  const [openPlanNameModal, setOpenPlanNameModal] = useState<number | null>(null);
  const [classModalId, setClassModalId] = useState<{
    name: string;
    newClass: SelectOptionType;
  } | null>(null);
  const studentsWithPlan = data
    .map((k) => k.students)
    .flat()
    .map((k) => k?.id || 0);

  const noPlanStudents = students.length - studentsWithPlan.length;

  const hasChange = JSON.stringify(data) !== JSON.stringify(plans);

  useEffect(() => {
    setData(plans);
  }, [plans]);

  console.log(plans, data);

  const handleSelectClass = (name: string, option: SelectOptionType | null): void => {
    const newClass = { classroom: option?.label, classroom_id: Number(option?.value) };
    const newData = data.map((k) => (k.title === name ? { ...k, ...newClass, students: [] } : k));
    setData(newData);
  };

  const handleChangeStudents = (newPlan: PlansType): void => {
    const newData = data.map((k) => (k.title === newPlan.title ? newPlan : k));
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
        {data.length ? (
          data.map((plan) => (
            <div
              key={plan.title}
              className="font-light  text-16 p-1 border-t items-center border-t-black20 grid grid-cols-[10rem_8rem_11rem_1fr]"
            >
              <div className="pr-1">{plan.title}</div>

              <Actions {...{ plan, setData, setOpenPlanNameModal, data }} />

              <ReactSelect
                onChange={(e) => {
                  e.label !== plan.classroom && plan.students?.length
                    ? setClassModalId({ newClass: e, name: plan.title })
                    : handleSelectClass(plan.title, e);
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
          ))
        ) : (
          <div className="p-4 font-regular text-14">{fa.plan.noPlan}</div>
        )}
      </div>

      {!!noPlanStudents && (
        <div className="font-light text-12 text-sun70 mt-1">
          {faNumber(noPlanStudents)} {fa.plan.noPlanStudents}
        </div>
      )}
      <PlanButtons {...{ tag, data, hasChange }} onClear={() => setData(plans)} />

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
        onYes={(value) => handleSelectClass(value?.name || '', value?.newClass || null)}
        info={classModalId}
        setInfo={setClassModalId}
      />
    </div>
  );
};

export default SetCalendar;
