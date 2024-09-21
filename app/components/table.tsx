'use client';

import React from 'react';
import { AgGridReact, AgGridReactProps } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';

type TableType = {
  data: any[]; // eslint-disable-line
  columns: any[]; // eslint-disable-line
  className?: string;
  emptyMessage?: string;
} & AgGridReactProps;

const Table: React.FC<TableType> = ({ data, columns, className, emptyMessage, ...rest }) => {
  return (
    <div className={`ag-theme-quartz ${className}`}>
      <AgGridReact
        enableRtl
        domLayout="autoHeight"
        autoSizeStrategy={{ type: 'fitGridWidth' }}
        rowData={data}
        columnDefs={columns}
        {...rest}
        overlayNoRowsTemplate={`${emptyMessage || 'No rows to display'}`}
      />
    </div>
  );
};

export default Table;
