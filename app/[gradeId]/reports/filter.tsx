import React, { useEffect, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { getClassNodes, getExamNodes, getInitialGroupDate } from 'app/utils/common.util';
import {
  ExamType,
  GroupDateType,
  ProgressType,
  ReportCardType,
  StudentType,
} from 'app/types/common.type';
import GroupDatePicker from 'app/components/groupDatePicker';
import fa from 'app/lib/fa.json';
import Toggle from 'app/components/toggle';
import Button from 'app/components/button';
import { GetReportAction } from 'app/lib/actions';
import CheckboxTree from 'app/components/checkboxTree';

const Filter: React.FC<{
  students: StudentType[] | null;
  exams: ExamType[];
  isCard?: boolean;
  setData: (value: {
    table: ProgressType[] | ReportCardType[] | undefined;
    date: GroupDateType;
  }) => void;
}> = ({ students, exams, setData, isCard }) => {
  const { gradeId } = useParams();
  const [examIds, setExamIds] = useState<string[]>([]);
  const [isSeparate, setIsSeparate] = useState(false);
  const [studentsIds, setStudentsIds] = useState<string[]>([]);
  const [date, setDate] = useState<GroupDateType>(getInitialGroupDate());
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

  const body = {
    isSeparate,
    students: studentsIds,
    exams: examIds.map((k) => k.split(',')).flat(),
    ...date,
  };
  const { data, isFetching, refetch } = useQuery({
    queryKey: ['card-report'],
    queryFn: () => GetReportAction(gradeId.toString(), body, isCard),
    enabled: false,
  });

  useEffect(() => {
    data && setData({ table: data, date: body });
  }, [data]);

  useEffect(() => {
    setData({ table: undefined, date });
  }, []);

  return (
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

      {students && isCard && (
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
  );
};

export default Filter;
