'use client';

import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';

type TableType = {
  data: any[]; // eslint-disable-line
  columns: any[]; // eslint-disable-line
  className?: string;
};

const Table: React.FC<TableType> = ({ data, columns, className }) => {
  return (
    <div className={`ag-theme-quartz ${className}`}>
      <AgGridReact
        enableRtl
        domLayout="autoHeight"
        autoSizeStrategy={{ type: 'fitGridWidth' }}
        rowData={data}
        columnDefs={columns}
      />
    </div>
  );
};

export default Table;
