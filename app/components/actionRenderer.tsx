import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ActionRenderer: React.FC = (props: any) => {
  const { api, node, setEditData } = props;

  const handleDelete = (): void => {
    api.applyTransaction({ remove: [node.data] });
  };

  const handleEdit = (): void => {
    setEditData(node.data);
  };

  return (
    <div className="isCenter h-full">
      <i className="icon-edit text-berry60 text-20 p-2 cursor-pointer" onClick={handleEdit} />
      <i className="icon-trash text-red70 text-20 p-2 cursor-pointer" onClick={handleDelete} />
    </div>
  );
};

export default ActionRenderer;
