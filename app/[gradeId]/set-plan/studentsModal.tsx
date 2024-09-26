import React, { memo, useEffect, useState } from 'react';
import Modal from 'app/components/modal';
import { PlansType, StudentType } from 'app/types/common.type';
import fa from 'app/lib/fa.json';
import Checkbox from 'app/components/checkbox';
import Button from 'app/components/button';

const StudentsModal: React.FC<{
  studentsWithPlan: number[];
  selectedPlan: PlansType | null;
  setSelectedPlan: (value: null) => void;
  onChange: (value: PlansType) => void;
  students: StudentType[];
}> = ({ selectedPlan, setSelectedPlan, students, studentsWithPlan, onChange }) => {
  const [selectedId, setSelectedId] = useState<number[]>([]);
  const classStudents = students.filter((k) => k.classroom_id === selectedPlan?.classroom_id);
  const planStudentsId = selectedPlan?.students?.map((k) => k.id) || [];
  const showStudents = classStudents.filter(
    (k) => !(studentsWithPlan.includes(k.id) && !planStudentsId.includes(k.id))
  );

  const allSelected = showStudents.every((student) => selectedId.includes(student.id));
  const someSelected =
    showStudents.some((student) => selectedId.includes(student.id)) && !allSelected;

  const handleSelectAll = (): void => {
    if (allSelected) {
      // Uncheck all
      const remainingSelected = selectedId.filter(
        (id) => !showStudents.some((student) => student.id === id)
      );
      setSelectedId(remainingSelected);
    } else {
      // Select all
      const newSelected = [
        ...selectedId,
        ...showStudents
          .filter((student) => !selectedId.includes(student.id))
          .map((student) => student.id),
      ];
      setSelectedId(newSelected);
    }
  };

  useEffect(() => {
    setSelectedId(selectedPlan?.students?.map((k) => k.id) || []);
  }, [selectedPlan]);

  const handleSubmit = (): void => {
    const newStudents = showStudents.filter((k) => selectedId.includes(k.id));
    const newPlan = { ...selectedPlan, students: newStudents };
    onChange(newPlan as any); // eslint-disable-line
    setSelectedPlan(null);
  };
  return (
    <Modal
      className="min-w-[44rem] flex flex-col"
      open={!!selectedPlan}
      setOpen={() => setSelectedPlan(null)}
      id="select-student"
    >
      <div className="text-center font-bold text-14 text-berry100">
        {fa.plan.choosePlan} {selectedPlan?.title} {fa.plan.forClass} {selectedPlan?.classroom}
      </div>

      {showStudents.length ? (
        <div className="border-b border-b-black20 pb-2 mb-2 mt-5">
          <Checkbox
            className="w-fit"
            label={fa.global.selectAll}
            checked={allSelected}
            indeterminate={someSelected}
            onChange={handleSelectAll}
          />
        </div>
      ) : (
        <div className="mt-8">{fa.plan.allStudentsHasPlan}</div>
      )}
      <div className="grid grid-cols-4 ">
        {showStudents.map((k) => (
          <Checkbox
            className="w-fit"
            key={k.id}
            checked={selectedId.includes(k.id)}
            label={k.name}
            onChange={(check) =>
              setSelectedId((prev) => (check ? [...prev, k.id] : prev.filter((id) => id !== k.id)))
            }
          />
        ))}
      </div>

      <div className="flex justify-between gap-6 mt-5">
        <div className="font-light flex leading-4 items-center text-12 text-sun70">
          <i className="icon-info-circle ml-1 text-16" /> {fa.plan.showStudents}
        </div>
        <Button onClick={handleSubmit} className="btn btn-primary w-44">
          {showStudents.length ? fa.global.submit : fa.global.return}
        </Button>
      </div>
    </Modal>
  );
};

export default memo(StudentsModal);
