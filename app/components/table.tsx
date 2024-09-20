'use client';

import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { CellClickedEvent } from 'ag-grid-community';

type TableType = {
  data: any[]; // eslint-disable-line
  columns: any[]; // eslint-disable-line
  className?: string;
  emptyMessage?: string;
  onCellClicked?: (e: CellClickedEvent) => void;
};

const Table: React.FC<TableType> = ({ data, columns, className, emptyMessage, onCellClicked }) => {
  return (
    <div className={`ag-theme-quartz ${className}`}>
      <AgGridReact
        enableRtl
        domLayout="autoHeight"
        autoSizeStrategy={{ type: 'fitGridWidth' }}
        rowData={data}
        columnDefs={columns}
        onCellClicked={onCellClicked}
        overlayNoRowsTemplate={`${emptyMessage || 'No rows to display'}`}
      />
    </div>
  );
};

export default Table;
