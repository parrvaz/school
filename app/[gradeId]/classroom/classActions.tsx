import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ClassActions: React.FC = (props: any) => {
  const { api, node, setOpenModal } = props;

  const handleDelete = (): void => {
    setOpenModal(true);
    api.applyTransaction({ remove: [node.data] });
  };

  const handleEdit = (): void => {
    setOpenModal(node.data);
  };

  return (
    <div className="isCenter h-full">
      <i className="icon-edit text-berry60 text-20 p-2 cursor-pointer" onClick={handleEdit} />
      <i className="icon-trash text-red70 text-20 p-2 cursor-pointer" onClick={handleDelete} />
    </div>
  );
};

export default ClassActions;
