import React, { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { CellClickedEvent } from 'ag-grid-community';
import { useMutation } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import {
  BellsType,
  ClassroomType,
  CourseType,
  ScheduleDataType,
  ScheduleFormType,
} from 'app/types/common.type';
import fa from 'app/lib/fa.json';
import Table from 'app/components/table';
import Button from 'app/components/button';
import CellRenderer from './cellRenderer';
import {
  convertArrayToSchedule,
  getCourses,
  mapFormData,
  roleAccess,
  ROLES,
} from 'app/utils/common.util';
import { UpdateScheduleAction } from 'app/lib/actions';
import { tagRevalidate } from 'app/lib/server.util';
import AddLessonModal from './addLessonModal';
import CourseModal from 'app/components/courseModal';
import SaveModal from 'app/components/saveModal';

const Schedule: React.FC<{
  classes: ClassroomType[];
  courses: CourseType[];
  setShowBells: (status: boolean) => void;
  schedules: ScheduleDataType[];
  scheduleTag: string;
  coursesTag: string;
  role?: string;
  bells: BellsType[];
}> = ({ classes, courses, setShowBells, schedules, scheduleTag, bells, coursesTag, role }) => {
  const { gradeId } = useParams();
  const defaultLessonData = { order: null, day: '' };
  const [selectedClassId, setSelectedClassId] = useState(classes[0]?.id);
  const [lessonData, setLessonData] = useState(defaultLessonData);
  const [initial, setInitial] = useState<ScheduleFormType>();
  const [nextAction, setNextAction] = useState<(() => void) | null>(null);
  const selectedSchedule = useMemo(
    () => schedules.find((k) => k.classroom_id === selectedClassId),
    [selectedClassId, schedules]
  );

  const selectedClassField = useMemo(
    () => classes.find((k) => k.id === selectedClassId)?.field_id,
    [selectedClassId]
  );

  const { handleSubmit, setValue, watch, reset } = useForm<ScheduleFormType>({
    defaultValues: { schedule: {} },
  });

  useEffect(() => {
    // if we have 5 bells but schedule has 3 bells we should add other bells
    const initialData = { ...convertArrayToSchedule(bells), ...selectedSchedule?.schedule };
    const newData = { schedule: initialData };
    reset(newData);
    setInitial(newData);
  }, [selectedSchedule]);

  const { mutate, isPending } = useMutation({
    mutationFn: (e: ScheduleFormType) =>
      UpdateScheduleAction(e, gradeId.toString(), selectedClassId),
    onSuccess: (ok) => ok && tagRevalidate(scheduleTag),
  });

  const columns = [
    {
      headerName: fa.bells.bells,
      field: 'order',
      width: 95,
      minWidth: 95,
      resizable: false,
      valueFormatter: ({ value }: { value: number }) =>
        fa.global[`bell${value}` as keyof typeof fa.global],
    },
    { headerName: fa.global.sat, field: 'sat', cellRenderer: CellRenderer },
    { headerName: fa.global.sun, field: 'sun', cellRenderer: CellRenderer },
    { headerName: fa.global.mon, field: 'mon', cellRenderer: CellRenderer },
    { headerName: fa.global.tue, field: 'tue', cellRenderer: CellRenderer },
    { headerName: fa.global.wed, field: 'wed', cellRenderer: CellRenderer },
    { headerName: fa.global.thu, field: 'thu', cellRenderer: CellRenderer },
    { headerName: fa.global.fri, field: 'fri', cellRenderer: CellRenderer },
  ];

  const keys = { sat: '1', sun: '2', mon: '3', tue: '4', wed: '5', thu: '6', fri: '7' };
  const onSelectLesson = (course: CourseType): void => {
    setValue(`schedule.${lessonData.order}.${lessonData.day}`, course.id ? course.name : '');
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

  const hasChange = JSON.stringify(watch('schedule')) !== JSON.stringify(initial?.schedule);

  const onSave = async (): Promise<void> => await mutate({ schedule: watch('schedule') });

  return (
    <div className="flex gap-2">
      <div className="w-52">
        <div className="text-16 font-regular mr-2 mb-1">{fa.bells.classList}</div>
        <div className="max-h-96 bg-white flex flex-col gap-1 rounded-2xl p-2">
          {classes.length ? (
            classes.map((k) => (
              <div
                key={k.id}
                onClick={() =>
                  hasChange
                    ? setNextAction(() => () => setSelectedClassId(k.id))
                    : setSelectedClassId(k.id)
                }
                className={`${k.id === selectedClassId ? 'bg-berry30 hover:bg-berry30' : 'hover:bg-berry10'} py-2  duration-300 cursor-pointer font-light text-14 px-2 rounded-lg`}
              >
                <div className="">{k.title}</div>
              </div>
            ))
          ) : (
            <div className="text-14 text-black70 font-light p-1">{fa.global.noClass}</div>
          )}
        </div>
      </div>
      <div className="flex-1 flex flex-col">
        <div className="flex justify-between items-center">
          <div className="text-16 font-regular mr-2">{fa.bells.weekTime}</div>
          {roleAccess([ROLES.manager], role) && (
            <Button
              onClick={() =>
                hasChange ? setNextAction(() => () => setShowBells(true)) : setShowBells(true)
              }
              className="btn !text-berry70 btn-ghost btn-sm  font-regular"
            >
              {fa.bells.changeTimes}
            </Button>
          )}
        </div>
        <form className="relative text-end" onSubmit={handleSubmit((e) => mutate(e))}>
          <Table
            {...{ columns }}
            data={mapFormData(watch('schedule'))}
            onCellClicked={onCellClicked}
            className="h-full w-full"
          />
          <Button
            isLoading={isPending}
            disabled={!classes.length || !hasChange}
            className="btn absolute left-0 -bottom-16 btn-primary mt-3"
          >
            {fa.bells.setClassSchedule}
          </Button>

          <CourseModal
            open={!!lessonData.order}
            setOpen={() => setLessonData(defaultLessonData)}
            courses={getCourses(courses, selectedClassField || 0)}
            {...{ onSelectLesson }}
          />
        </form>
        <AddLessonModal {...{ courses, coursesTag, hasChange, setNextAction }} />
      </div>

      <SaveModal {...{ nextAction, setNextAction, onSave, isPending }} />
    </div>
  );
};

export default Schedule;
