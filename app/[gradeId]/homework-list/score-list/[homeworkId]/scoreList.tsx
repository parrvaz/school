'use client';

import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ScoreListType } from 'app/types/common.type';
import fa from 'app/lib/fa.json';
import { faNumber } from 'app/utils/common.util';
import EditActionRenderer from './editActionRenderer';
import Table from 'app/components/table';
import DeliveryStatus from 'app/[gradeId]/homework-delivery/deliveryStatus';
import Button from 'app/components/button';
import { GradeRoute } from 'app/lib/routes';
import Checkbox from 'app/components/checkbox';
import { ScoreFinalAction, ScoreZeroAction } from 'app/lib/actions';
import { tagRevalidate } from 'app/lib/server.util';

const ScoreList: React.FC<{ data: ScoreListType; tag: string }> = ({ data, tag }) => {
  const { gradeId } = useParams();
  const [isFinal, setIsFinal] = useState(data.isFinal);

  const { mutate, isPending } = useMutation({
    mutationFn: () => ScoreZeroAction(gradeId.toString(), data.id),
    onSuccess: (ok) => {
      if (ok) {
        tagRevalidate(tag);
      }
    },
  });
  const { mutate: isFinalMutate, isPending: isFinalPending } = useMutation({
    mutationFn: () => ScoreFinalAction(gradeId.toString(), data.id),
    onSuccess: (ok) => {
      if (ok) {
        setIsFinal((prev) => !prev);
      }
    },
  });

  const columns = [
    { headerName: fa.global.name, field: 'name', minWidth: 110 },
    { headerName: fa.global.classroom, field: 'classroom' },
    {
      headerName: fa.homework.score,
      field: 'score',
      valueFormatter: ({ value }) => (value === null ? '-' : value),
    },
    { headerName: fa.homework.status, cellRenderer: DeliveryStatus },
    {
      headerName: fa.homework.feedback,
      field: 'feedback',
      cellStyle: { fontSize: '24px' },
      valueFormatter: ({ value }) => (value === null ? '' : value),
    },

    {
      headerName: fa.global.edit,
      cellRenderer: EditActionRenderer,
      pinned: 'left',
      lockPosition: 'left',
      width: 75,
      minWidth: 75,
      resizable: false,
    },
  ];
  return (
    <div className="pb-20">
      <div className="bg-white p-4 rounded-lg flex  items-center">
        <div className="font-bold flex-1 text-20 text-berry100">{data.title}</div>
        <div className="font-regular text-black70 text-14 border-l border-l-black70 px-4">
          {fa.homework.deliverTime} : {faNumber(data.date)}
        </div>
        <div className="font-regular text-black70 text-14 border-l border-l-black70 px-4">
          {data.course}
        </div>
        <div className="font-regular text-black70 text-14 border-l border-l-black70 px-4">
          {fa.homework.totalScore} : {faNumber(data.score)}
        </div>
        <div className="font-regular text-black70 text-14  pr-4">
          {fa.homework.expected} : {faNumber(data.expected)}
        </div>
      </div>
      <div className="my-4 font-regular text-bla70">
        {fa.global.description} : {data.description}
      </div>
      <Table {...{ columns }} data={data.scores} className="h-full w-full" />

      <div className="fixed bottom-0 left-0 bg-white flex items-center p-4 pr-64 w-full justify-between">
        <Link href={GradeRoute(gradeId, 'homework-list')}>
          <Button className="btn btn-primary btn-outline">{fa.global.return}</Button>
        </Link>
        <div className="flex items-center">
          <Checkbox
            label={fa.global.isFinal}
            isLoading={isFinalPending}
            checked={isFinal}
            onChange={() => isFinalMutate()}
          />
          <div className="tooltip tooltip-right mr-6" data-tip={fa.homework.zeroInfo}>
            <Button isLoading={isPending} onClick={() => mutate()} className="btn btn-primary w-40">
              {fa.homework.zeroRest}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScoreList;
