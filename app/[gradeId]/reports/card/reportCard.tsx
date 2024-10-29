'use client';

import React, { useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getClassNodes } from 'app/utils/common.util';
import { ExamType, StudentType, TreeNodeType } from 'app/types/common.type';
import fa from 'app/lib/fa.json';
import Button from 'app/components/button';
import { GetCardAction } from 'app/lib/actions';
import Table from 'app/components/table';
import CheckboxTree from 'app/components/checkboxTree';

const ReportCard: React.FC<{
  students: StudentType[];
  examNodes: TreeNodeType[];
  exams: ExamType[];
}> = ({ students, examNodes, exams }) => {
  const { gradeId } = useParams();
  const [examIds, setExamIds] = useState<string[]>([]);
  const [studentsIds, setStudentsIds] = useState<string[]>([]);
  const activeExamsIds = examIds.map((k) => k.split(',')).flat();
  const activeClasses = exams.filter((k) => activeExamsIds.includes(k.id.toString()));
  const classNodes = useMemo(
    () => getClassNodes(activeClasses, students),
    [activeClasses, students]
  );

  const { data, isFetching, refetch } = useQuery({
    queryKey: ['card'],
    queryFn: () =>
      GetCardAction(gradeId.toString(), {
        students: studentsIds,
        exams: examIds.map((k) => k.split(',')).flat(),
      }),
    enabled: false,
  });

  const columns = [
    {
      headerName: fa.global.course,
      field: 'course',
      pinned: 'right',
      lockPosition: 'right',
      minWidth: 100,
    },
    { headerName: fa.reports.card.factor, field: 'factor' },
    { headerName: fa.global.score, field: 'score' },
  ];

  const footerRowData = [{ course: fa.reports.card.average, factor: data?.average || '-' }];

  return (
    <div>
      <div className="flex gap-2 mb-4">
        <CheckboxTree
          className="!w-40"
          label={fa.reports.card.chooseExams}
          nodes={examNodes}
          values={examIds}
          setValues={setExamIds}
          inputLabel={fa.global.exam}
          length={activeExamsIds.length}
        />
        <CheckboxTree
          className="!w-40"
          label={fa.global.chooseStudent}
          nodes={classNodes}
          values={studentsIds}
          setValues={setStudentsIds}
        />

        <Button
          disabled={!studentsIds.length || !examIds.length}
          onClick={() => refetch()}
          className="btn btn-primary min-h-10 h-10"
          isLoading={isFetching}
        >
          {fa.global.show}
        </Button>
      </div>

      <Table
        pinnedBottomRowData={footerRowData}
        {...{ columns }}
        data={data?.scores || []}
        className="h-full w-full"
      />
    </div>
  );
};

export default ReportCard;
