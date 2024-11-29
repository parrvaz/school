import React from 'react';
import Modal from './modal';
import Button from './button';
import fa from 'app/lib/fa.json';

const SaveModal: React.FC<{
  isPending: boolean;
  setNextAction: (value: (() => void) | null) => void;
  onSave: () => void;
  nextAction: (() => void) | null;
}> = ({ isPending, setNextAction, onSave, nextAction }) => {
  return (
    <Modal open={!!nextAction} setOpen={() => setNextAction(null)} id="save-modal">
      <div className="font-regular mb-3">{fa.global.saveChanges}</div>
      <div className=" mt-5 justify-end flex gap-2">
        <Button
          className="btn btn-ghost"
          onClick={(): void => {
            nextAction?.();
            setNextAction(null);
          }}
        >
          {fa.global.no}
        </Button>
        <Button
          isLoading={isPending}
          className="btn btn-error w-24"
          onClick={async () => {
            await onSave();
            nextAction?.();
            setNextAction(null);
          }}
        >
          {fa.global.save}
        </Button>
      </div>
    </Modal>
  );
};

export default SaveModal;
