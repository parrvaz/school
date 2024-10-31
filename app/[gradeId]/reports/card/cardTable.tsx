'use client';

import React from 'react';
import fa from 'app/lib/fa.json';
import Table from 'app/components/table';
import { ReportCardType } from 'app/types/common.type';

const CardTable: React.FC<{ data: ReportCardType }> = ({ data }) => {
  const footerRowData = [{ course: fa.reports.card.average, factor: data?.average || '-' }];

  const columns = [
    {
      headerName: fa.global.course,
      field: 'course',
      pinned: 'right',
      lockPosition: 'right',
      minWidth: 120,
    },
    { headerName: fa.reports.card.factor, field: 'factor' },
    { headerName: fa.global.score, field: 'score' },
  ];

  return (
    <div className="mb-4" key={'3'}>
      {data?.classroom && (
        <div className="flex font-regular text-14 mr-2">
          {data?.name} - {data?.classroom}
        </div>
      )}

      <Table
        pinnedBottomRowData={footerRowData}
        {...{ columns }}
        defaultColDef={{ sortable: false }}
        data={data?.scores || []}
        className="h-full w-full"
      />
    </div>
  );
};

export default CardTable;
