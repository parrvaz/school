import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DeleteRow: React.FC = (props: any) => {
  const { api, node } = props;

  const handleDelete = (): void => {
    // Call grid API to delete the row
    api.applyTransaction({ remove: [node.data] });
  };

  return (
    <i
      className="icon-trash text-red70 text-20 isCenter h-full cursor-pointer"
      onClick={handleDelete}
    />
  );
};

export default DeleteRow;
