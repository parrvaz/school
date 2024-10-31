'use client';

import React from 'react';
import { ScoreType } from 'app/types/common.type';
import fa from 'app/lib/fa.json';
import Table from 'app/components/table';

const LastScores: React.FC<{ data: ScoreType[] }> = ({ data }) => {
  const emptyMessage = fa.dashboard.noScore;

  const columns = ['course', 'score', 'totalScore', 'type', 'date'].map((item) => ({
    headerName: fa.global[item === 'type' ? 'examType' : item],
    field: item,
    valueFormatter: (params) =>
      params.colDef.field === 'type' ? fa.global[params.value.label] : params.value,
  }));

  return (
    <div className="mb-3">
      <div className="font-bold text-14 mb-1">{fa.dashboard.lastScores}</div>
      <Table
        {...{ columns, data, emptyMessage }}
        defaultColDef={{ sortable: false }}
        className="h-full w-full"
      />
    </div>
  );
};

export default LastScores;
