'use client';

import { useParams } from 'next/navigation';
import React, { useMemo, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import GroupDatePicker from 'app/components/groupDatePicker';
import { ClassOptionType, ClassroomType, GroupDateType } from 'app/types/common.type';
import { getClassOption, getInitialGroupDate } from 'app/utils/common.util';
import ReactSelect from 'app/components/select';
import fa from 'app/lib/fa.json';
import Button from 'app/components/button';
import { DownloadAbsentExcelAction, GetAbsentsReport } from 'app/lib/actions';
import Table from 'app/components/table';
import EmojiRenderer from './emojiRenderer';

const ReportTable: React.FC<{ classes: ClassroomType[] }> = ({ classes }) => {
  const { gradeId } = useParams();
  const [date, setDate] = useState<GroupDateType>(getInitialGroupDate());
  const [selectedClasses, setSelectedClasses] = useState<ClassOptionType[]>([]);
  const classOptions = useMemo(() => getClassOption(classes), [classes]);

  const { data, refetch, isFetching } = useQuery({
    queryKey: ['absent-reports'],
    queryFn: () =>
      GetAbsentsReport(gradeId.toString(), {
        startDate: date?.startDate,
        endDate: date?.endDate,
        classrooms: selectedClasses.map((k) => k.value),
      }),
    enabled: false,
  });

  const columns = [
    { headerName: fa.global.studentName, field: 'name', lockPosition: 'right' },
    { headerName: fa.global.className, field: 'classroom' },
    { headerName: fa.absents.bellAbsents, field: 'absents' },
    { headerName: fa.absents.allBells, field: 'allBells' },
    { headerName: fa.absents.percent, field: 'percent' },
    {
      headerName: fa.absents.status,
      cellRenderer: EmojiRenderer,
      pinned: 'left',
      lockPosition: 'left',
      width: 84,
      minWidth: 84,
      resizable: false,
    },
  ];

  const { mutate: downloadExcel, isPending: excelPending } = useMutation({
    mutationFn: () =>
      DownloadAbsentExcelAction(
        gradeId.toString(),
        {
          startDate: date.startDate,
          endDate: date.endDate,
          classrooms: selectedClasses.map((k) => k.value),
        },
        `${fa.absents.report}-${date.startDate}-${date.endDate}-${selectedClasses.map((k) => k.label).join(',')}`
      ),
  });

  return (
    <div>
      <div className="flex gap-2 items-center mb-5">
        <GroupDatePicker className="w-72" values={date} onChange={setDate} />
        <ReactSelect
          className="w-80"
          isMulti
          options={classOptions}
          placeholder={fa.global.chooseClass}
          value={selectedClasses}
          onChange={(e) => setSelectedClasses(e)}
        />
        <Button
          isLoading={isFetching}
          onClick={() => refetch()}
          className="btn btn-primary min-h-10 h-10"
        >
          {fa.global.show}
        </Button>
        <Button
          isLoading={excelPending}
          onClick={() => downloadExcel()}
          className="btn btn-success min-h-10 h-10"
        >
          <i className="icon-excel text-20" />
          {fa.global.downloadExcel}
        </Button>
      </div>

      <Table {...{ columns }} data={data || []} defaultColDef={{ sortable: false }} />
    </div>
  );
};

export default ReportTable;
