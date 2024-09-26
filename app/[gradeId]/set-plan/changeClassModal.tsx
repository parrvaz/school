import React from 'react';
import Modal from 'app/components/modal';
import fa from 'app/lib/fa.json';
import Button from 'app/components/button';
import { SelectOptionType } from 'app/types/common.type';

type infoType = { name: string; newClass: SelectOptionType } | null;

const ChangeClassModal: React.FC<{
  info: infoType;
  setInfo: (value: infoType) => void;
  onYes: (value: infoType) => void;
}> = ({ info, setInfo, onYes }) => {
  return (
    <Modal open={!!info} setOpen={() => setInfo(null)} id="class-change">
      <div className="font-bold text-14 mb-6 text-red70">{fa.plan.removeStudents}</div>

      <div className="flex justify-end gap-2 mt-4">
        <Button onClick={() => setInfo(null)} className="btn btn-outline btn-error">
          {fa.global.cancel}
        </Button>
        <Button onClick={() => (onYes(info), setInfo(null))} className="btn btn-primary">
          {fa.global.approve}
        </Button>
      </div>
    </Modal>
  );
};

export default ChangeClassModal;
