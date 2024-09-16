/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { ReactNode, useEffect } from 'react';

const Modal: React.FC<{
  id: string; // Always set Id to modal work
  children: ReactNode;
  open: boolean;
  setOpen: (status: boolean) => void;
  className?: string;
}> = ({ children, id, open, setOpen, className }) => {
  useEffect(() => {
    const modalElement = document.getElementById(id);

    const handleEscapeKey = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') setOpen(false);
    };

    if (open) {
      // @ts-ignore
      modalElement?.showModal();
      document.addEventListener('keydown', handleEscapeKey);
    } else {
      // @ts-ignore
      modalElement?.close();
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [id, open]);

  return (
    <dialog id={id} className="modal">
      <div className={`modal-box ${className}`}>
        {children}
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button
            onClick={(): void => setOpen(false)}
            className="btn btn-circle btn-ghost btn-sm absolute left-2 top-2"
          >
            ✕
          </button>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={(): void => setOpen(false)}>close</button>
      </form>
    </dialog>
  );
};

export default Modal;
