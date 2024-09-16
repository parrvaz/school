import React from 'react';
import Modal from './modal';
import Button from './button';
import fa from 'app/lib/fa.json';

const DeleteModal: React.FC<{
  open: boolean;
  setOpen: (value: boolean) => void;
  onDelete: () => void;
  isPending: boolean;
  title: string;
  id?: string;
  component?: JSX.Element;
}> = ({ open, setOpen, isPending, onDelete, title, component, id }) => {
  return (
    <Modal open={!!open} setOpen={setOpen} id={id || 'delete-modal'}>
      <div className="font-regular mb-3">{title}</div>
      {component}
      <div className=" mt-5 justify-end flex gap-2">
        <Button className="btn btn-ghost" onClick={(): void => setOpen(false)}>
          {fa.global.cancel}
        </Button>
        <Button isLoading={isPending} className="btn btn-error w-24" onClick={onDelete}>
          {fa.global.yes}
        </Button>
      </div>
    </Modal>
  );
};

export default DeleteModal;
