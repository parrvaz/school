'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { CellClickedEvent } from 'ag-grid-community';
import { useMutation } from '@tanstack/react-query';
import ReactSelect from 'app/components/select';
import { AbsentsListType, BellsType, ClassroomType } from 'app/types/common.type';
import { getOption, getTody } from 'app/utils/common.util';
import fa from 'app/lib/fa.json';
import { GradeRoute } from 'app/lib/routes';
import AppDatePicker from 'app/components/datePicker';
import AbsentsRenderer from './absentsRenderer';
import Table from 'app/components/table';
import Button from 'app/components/button';
import { PostAbsentsAction } from 'app/lib/actions';

const data = [
  { student_id: 1, name: 'sdf', isAbsent: false },
  { student_id: 2, name: 'sdf df', isAbsent: false },
  { student_id: 3, name: 'sdf fwe', isAbsent: false },
];

const StudentsList: React.FC<{
  bells: BellsType[];
  classes: ClassroomType[];
  bellId: string;
  classId: string;
  date: string;
}> = ({ bells, classes, bellId, classId, date }) => {
  const router = useRouter();
  const { gradeId } = useParams();
  const [list, setList] = useState<AbsentsListType[]>([]);

  // const { data } = useQuery({
  //   queryKey: fieldsKey(gradeId.toString()),
  //   queryFn: () => getFields(gradeId.toString()),
  // });

  const route = (dateValue: string, bell?: string, classValue?: string): string =>
    GradeRoute(gradeId, 'roll-call', `?bellId=${bell}&classId=${classValue}&date=${dateValue}`);

  const classOptions = useMemo(() => getOption(classes, 'title'), [classes]);
  const bellsOption = useMemo(
    () =>
      bells.map((k) => ({
        value: k.id || 0,
        label: fa.global[`bell${k.order}` as keyof typeof fa.global] as string,
      })),
    [bells]
  );

  useEffect(() => {
    router.push(route(getTody(), bells[0].id?.toString(), classes[0]?.id.toString()));
  }, []);

  useEffect(() => {
    setList(data);
  }, [data]);

  const columns = [
    { headerName: fa.global.row, valueGetter: 'node.rowIndex + 1' },
    { headerName: fa.global.name, field: 'name' },
    { headerName: fa.absents.presence, cellRenderer: AbsentsRenderer, field: 'isAbsent' },
  ];

  const onCellClicked = (params: CellClickedEvent): void => {
    if (params.colDef.field === 'isAbsent') {
      const updatedData = list.map((row) =>
        row.student_id === params.data.student_id ? { ...row, isAbsent: !row.isAbsent } : row
      );
      setList(updatedData);
    }
  };

  const { mutate, isPending } = useMutation({
    mutationFn: () => PostAbsentsAction(list, gradeId.toString()),
    onSuccess: (ok) => {
      if (ok) {
        // tagRevalidate(tag);
      }
    },
  });

  return (
    <>
      <div className="flex gap-3 mb-5">
        <ReactSelect
          className="w-48"
          options={classOptions}
          value={classOptions.find((k) => k.value === Number(classId))}
          onChange={(e) => router.push(route(date, bellId, e?.value.toString()))}
        />
        <ReactSelect
          className="w-32"
          options={bellsOption}
          value={bellsOption.find((k) => k.value === Number(bellId))}
          onChange={(e) => router.push(route(date, e?.value.toString(), classId))}
        />
        <AppDatePicker value={date} onChange={(e) => router.push(route(e, bellId, classId))} />
      </div>

      <Table {...{ columns }} data={list} onCellClicked={onCellClicked} className="h-full w-full" />

      <Button onClick={() => mutate()} isLoading={isPending} className="btn btn-primary w-28 mt-5">
        {fa.global.submit}
      </Button>
    </>
  );
};

export default StudentsList;