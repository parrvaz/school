'use client';

import React, { useState } from 'react';
import { ScoreType } from 'app/types/common.type';
import fa from 'app/lib/fa.json';
import Table from 'app/components/table';
import Modal from 'app/components/modal';
import Button from 'app/components/button';

const LastScores: React.FC<{ data: ScoreType[] }> = ({ data }) => {
  const emptyMessage = fa.dashboard.noScore;
  const [openModal, setOpenModal] = useState(false);

  const columns = ['course', 'score', 'totalScore', 'type', 'date'].map((item) => ({
    headerName: fa.global[item === 'type' ? 'examType' : item],
    field: item,
    valueFormatter: (params) =>
      params.colDef.field === 'type' ? fa.global[params.value.label] : params.value,
  }));

  return (
    <div className="mb-3">
      <div className="flex font-bold text-14 mb-1 justify-between">
        <div className="">{fa.dashboard.lastScores}</div>
        <div onClick={() => setOpenModal(true)} className="cursor-pointer">
          {fa.dashboard.seeAllScores}
        </div>
      </div>
      <Table
        data={data.slice(0, 5)}
        {...{ columns, emptyMessage }}
        defaultColDef={{ sortable: false }}
        className="h-full w-full"
      />
      <Modal
        className="min-w-[44rem] flex flex-col"
        open={openModal}
        setOpen={setOpenModal}
        id="all-scores"
      >
        <div className="text-center font-bold mb-4">{fa.dashboard.allScoresList}</div>
        <Table
          data={data}
          {...{ columns, emptyMessage }}
          defaultColDef={{ sortable: false }}
          className="h-full w-full"
        />

        <Button className="btn btn-primary mt-3 self-end" onClick={() => setOpenModal(false)}>
          {fa.global.return}
        </Button>
      </Modal>
    </div>
  );
};

export default LastScores;
