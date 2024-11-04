'use client';

import React, { useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getClassNodes, getExamNodes, getInitialGroupDate } from 'app/utils/common.util';
import { ExamType, GroupDateType, StudentType } from 'app/types/common.type';
import fa from 'app/lib/fa.json';
import Button from 'app/components/button';
import { GetCardAction } from 'app/lib/actions';
import CheckboxTree from 'app/components/checkboxTree';
import GroupDatePicker from 'app/components/groupDatePicker';
import Toggle from 'app/components/toggle';
import CardTable from './cardTable';
import PdfDownload from './pdfDownload';

const ReportCard: React.FC<{
  students: StudentType[] | null;
  exams: ExamType[];
}> = ({ students, exams }) => {
  const { gradeId } = useParams();
  const [examIds, setExamIds] = useState<string[]>([]);
  const [isSeparate, setIsSeparate] = useState(false);
  const [date, setDate] = useState<GroupDateType>(getInitialGroupDate());
  const [studentsIds, setStudentsIds] = useState<string[]>([]);
  const activeExamsIds = examIds.map((k) => k.split(',')).flat();
  const activeClasses = exams.filter((k) => activeExamsIds.includes(k.id.toString()));
  const filterExams = useMemo(
    () =>
      exams.filter(
        (exam) =>
          exam.isFinal && exam.date >= (date?.startDate || '') && exam.date <= (date?.endDate || '')
      ),
    [exams, date]
  );

  const examNodes = useMemo(() => getExamNodes(filterExams), [filterExams]);
  const classNodes = useMemo(
    () => (students ? getClassNodes(activeClasses, students) : null),
    [activeClasses, students]
  );

  const { data, isFetching, refetch } = useQuery({
    queryKey: ['card-report'],
    queryFn: () =>
      GetCardAction(gradeId.toString(), {
        isSeparate,
        students: studentsIds,
        exams: examIds.map((k) => k.split(',')).flat(),
        ...date,
      }),
    enabled: false,
  });

  return (
    <div>
      <div className="flex gap-2 mb-4">
        <GroupDatePicker className="w-72" values={date} onChange={setDate} />

        <CheckboxTree
          className="!w-40"
          label={fa.reports.card.chooseExams}
          nodes={examNodes}
          values={examIds}
          setValues={setExamIds}
          inputLabel={fa.global.exam}
          length={activeExamsIds.length}
        />
        {students && (
          <CheckboxTree
            className="!w-40"
            label={fa.global.chooseStudent}
            nodes={classNodes}
            values={studentsIds}
            setValues={setStudentsIds}
          />
        )}

        {students && (
          <Toggle
            isChecked={isSeparate}
            setIsChecked={setIsSeparate}
            label={fa.reports.card.separateStudents}
            className="w-44"
          />
        )}

        <Button
          disabled={(students && !studentsIds.length) || !examIds.length}
          onClick={() => refetch()}
          className="btn btn-primary min-h-10 h-10"
          isLoading={isFetching}
        >
          {fa.global.show}
        </Button>
      </div>

      {data?.map((value) => <CardTable key={value.name} data={value} />)}
      {!!data && <PdfDownload data={data} date={date} />}
    </div>
  );
};

export default ReportCard;
