import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const EmojiRenderer: React.FC = (props: any) => {
  const { node } = props;

  return <div className="text-24 mt-1 text-center">{node.data.status}</div>;
};

export default EmojiRenderer;
