import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { CellClickedEvent } from 'ag-grid-community';
import { useMutation } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { ClassroomType, CourseType, ScheduleFormType } from 'app/types/common.type';
import fa from 'app/lib/fa.json';
import Table from 'app/components/table';
import Button from 'app/components/button';
import CellRenderer from './cellRenderer';
import { convertArrayToSchedule, mapFormData } from 'app/utils/common.util';
import CourseModal from './courseModal';
import { UpdateScheduleAction } from 'app/lib/actions';

const Schedule: React.FC<{
  classes: ClassroomType[];
  courses: CourseType[];
  setShowBells: (status: boolean) => void;
}> = ({ classes, courses, setShowBells }) => {
  const { gradeId } = useParams();
  const defaultLessonData = { order: null, day: '' };
  const [selectedClassId, setSelectedClassId] = useState(classes[0].id);
  const [lessonData, setLessonData] = useState(defaultLessonData);
  const bells = [{ order: 1 }, { order: 2 }, { order: 3 }];

  const { handleSubmit, setValue, watch } = useForm<ScheduleFormType>({
    defaultValues: { schedule: convertArrayToSchedule(bells) },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (e: ScheduleFormType) =>
      UpdateScheduleAction(e, gradeId.toString(), selectedClassId),
    onSuccess: (ok) => {
      if (ok) {
        // tagRevalidate(tag);
      }
    },
  });

  const columns = [
    {
      headerName: fa.bells.bells,
      field: 'order',
      valueFormatter: ({ value }: { value: number }) =>
        fa.bells[`bell${value}` as keyof typeof fa.bells],
    },
    { headerName: fa.global.sat, field: 'sat', cellRenderer: CellRenderer },
    { headerName: fa.global.sun, field: 'sun', cellRenderer: CellRenderer },
    { headerName: fa.global.mon, field: 'mon', cellRenderer: CellRenderer },
    { headerName: fa.global.tue, field: 'tue', cellRenderer: CellRenderer },
    { headerName: fa.global.wed, field: 'wed', cellRenderer: CellRenderer },
    { headerName: fa.global.thu, field: 'thu', cellRenderer: CellRenderer },
    { headerName: fa.global.fri, field: 'fri', cellRenderer: CellRenderer },
  ];

  const data = mapFormData(watch('schedule'));

  const keys = { sat: '1', sun: '2', mon: '3', tue: '4', wed: '5', thu: '6', fri: '7' };
  const onSelectLesson = (course: CourseType): void => {
    setValue(`schedule.${lessonData.order}.${lessonData.day}`, course.name);
    setValue(
      `schedule.${lessonData.order}.${keys[lessonData.day as keyof typeof keys]}`,
      course.id
    );
    setLessonData(defaultLessonData);
  };

  const onCellClicked = (event: CellClickedEvent): void => {
    if (event.colDef.field !== 'order')
      setLessonData({ order: event.data.order, day: event.colDef.field || '' });
  };

  return (
    <div className="flex gap-2">
      <div className="w-52">
        <div className="text-16 font-regular mr-2 mb-1">{fa.bells.classList}</div>
        <div className="max-h-96 bg-white flex flex-col gap-1 rounded-2xl p-2">
          {classes.map((k) => (
            <div
              key={k.id}
              onClick={(): void => setSelectedClassId(k.id)}
              className={`${k.id === selectedClassId ? 'bg-berry30 hover:bg-berry30' : 'hover:bg-berry10'} py-2  duration-300 cursor-pointer font-light text-14 px-2 rounded-lg`}
            >
              <div className="">{k.title}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-center">
          <div className="text-16 font-regular mr-2">{fa.bells.weekTime}</div>
          <Button
            onClick={() => setShowBells(true)}
            className="btn !text-berry70 btn-ghost btn-sm  font-regular"
          >
            {fa.bells.changeTimes}
          </Button>
        </div>
        <form className="text-end" onSubmit={handleSubmit((e) => mutate(e))}>
          <Table {...{ columns, data }} onCellClicked={onCellClicked} className="h-full w-full" />
          <Button isLoading={isPending} className="btn btn-primary mt-3">
            {fa.bells.setClassSchedule}
          </Button>

          <CourseModal
            open={!!lessonData.order}
            setOpen={() => setLessonData(defaultLessonData)}
            {...{ courses, onSelectLesson }}
          />
        </form>
      </div>
    </div>
  );
};

export default Schedule;
