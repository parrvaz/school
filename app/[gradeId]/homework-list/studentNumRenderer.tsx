import React from 'react';

import fa from 'app/lib/fa.json';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const StudentNumRenderer: React.FC = (props: any) => {
  const { submitStdNumber, totalStdNumber } = props.node.data;

  return (
    <div className="flex items-center gap-2 h-full">
      {submitStdNumber} {fa.global.from} {totalStdNumber} {fa.global.person}
    </div>
  );
};

export default StudentNumRenderer;
