'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import ReactSelect from 'app/components/select';
import { GradeRoute } from 'app/lib/routes';

const GradeSelect: React.FC<{ options: { label: string; value: number }[] }> = ({ options }) => {
  const { gradeId } = useParams();
  const router = useRouter();
  const activeGrade = options.find((k) => k.value === Number(gradeId));

  return (
    <div className="w-48 mb-10">
      <ReactSelect
        options={options}
        value={activeGrade}
        onChange={(e) => router.push(GradeRoute(e?.value || Number(gradeId), 'dashboard'))}
      />
    </div>
  );
};

export default GradeSelect;
