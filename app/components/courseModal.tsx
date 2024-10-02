import React from 'react';
import Modal from 'app/components/modal';
import fa from 'app/lib/fa.json';
import { CourseType } from 'app/types/common.type';

const CourseModal: React.FC<{
  courses: CourseType[];
  open: boolean;
  setOpen: () => void;
  onSelectLesson: (k: CourseType) => void;
  isPending?: boolean;
}> = ({ courses, open, setOpen, onSelectLesson, isPending }) => {
  return (
    <Modal open={open} setOpen={setOpen} id="choose-course">
      <div className="font-bold text-berry100 text-center">{fa.bells.chooseCourse}</div>
      <div className="flex flex-wrap justify-center gap-2 mt-6">
        {[...courses, { id: null, name: fa.bells.empty }].map((k) => (
          <div
            onClick={(): void => onSelectLesson(k as CourseType)}
            key={k.id}
            className="font-light bg-berry05 flex items-center py-2 px-4 rounded-lg cursor-pointer hover:bg-berry10 duration-300"
          >
            {isPending && <span className="loading loading-spinner loading-sm mr-2" />}
            {k.name}
          </div>
        ))}
      </div>
    </Modal>
  );
};

export default CourseModal;
