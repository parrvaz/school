import React, { useCallback, useState } from 'react';
import { Calendar, dateFnsLocalizer, SlotInfo, Views } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { CourseType, EventPlanType, PlanDataType } from 'app/types/common.type';
import fa from 'app/lib/fa.json';
import {
  dateToHour,
  faNumber,
  formatDateToDayTime,
  revertEventData,
  revertToDateTimes,
} from 'app/utils/common.util';
import CourseModal from './courseModal';

type CustomEventProps = {
  event: EventPlanType;
  onRemoveEvent: (event: EventPlanType) => void;
};

const locales = { 'en-US': require('date-fns/locale/en-US') };
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: (date: string) => startOfWeek(date, { weekStartsOn: 6 }),
  getDay,
  locales,
});

const CustomEvent: React.FC<CustomEventProps> = ({ event, onRemoveEvent }) => (
  <div className={` bg-berry50 h-full px-2`}>
    <div className="pt-1 flex justify-between font-bold text-11">
      <div className="">{event.title}</div>
      <i onClick={() => onRemoveEvent(event)} className="icon-close -m-1 text-20 cursor-pointer" />
    </div>
    <div className="text-10 font-light">
      {dateToHour(event.start.toString())} - {dateToHour(event.end.toString())}
    </div>
  </div>
);

const CustomHeader = ({ label }: { label: string }): JSX.Element => {
  const day = fa.global[label.slice(3).toLowerCase() as keyof typeof fa.global];
  return (
    <div className="w-full text-black70 font-regular text-14 pt-3 pb-1">
      {typeof day === 'string' ? day : ''}
    </div>
  );
};

const MyCalendar: React.FC<{
  courses: CourseType[];
  setEvents: any;
  events: PlanDataType[];
}> = ({ courses, events, setEvents }) => {
  const [selectedSlot, setSelectedSlot] = useState<SlotInfo | null>(null);

  const handleRemoveEvent = (eventToRemove: EventPlanType): void => {
    setEvents((prevEvents: PlanDataType[]) =>
      prevEvents.filter(
        (event) => JSON.stringify(revertToDateTimes(event)) !== JSON.stringify(eventToRemove)
      )
    );
  };

  const onSelectLesson = (course: CourseType): void => {
    if (course && selectedSlot) {
      const { start, end } = selectedSlot;
      setEvents((prevEvents: PlanDataType[]) => [
        ...prevEvents,
        formatDateToDayTime(start, end, course.name, course.id),
      ]);
      setSelectedSlot(null); // Clear selected slot
    }
  };

  const slotGroupPropGetter = useCallback(
    () => ({ style: { minHeight: 50, fontSize: 12, fontFamily: 'IRANSans_Light' } }),
    []
  );
  return (
    <div className=" ltr">
      <Calendar
        localizer={localizer}
        events={revertEventData(events)}
        startAccessor="start"
        endAccessor="end"
        defaultView={Views.WEEK}
        views={['week']}
        toolbar={false}
        className="bg-white rounded-2xl overflow-hidden"
        selectable
        timeslots={4}
        step={15}
        slotGroupPropGetter={slotGroupPropGetter}
        onSelectSlot={(slotInfo: SlotInfo) => setSelectedSlot(slotInfo)}
        formats={{
          timeGutterFormat: (date, culture, localizer) => {
            const value = localizer?.format(date, 'HH:mm', culture);
            return value === '00:00'
              ? ''
              : faNumber(localizer?.format(date, 'HH:mm', culture) || '');
          },
        }}
        components={{
          header: ({ label }: { label: string }) => <CustomHeader label={label} />, // Use the custom header
          event: (eventProps) => <CustomEvent {...eventProps} onRemoveEvent={handleRemoveEvent} />,
        }}
      />

      <CourseModal
        open={!!selectedSlot}
        setOpen={() => setSelectedSlot(null)}
        {...{ courses, onSelectLesson }}
      />
    </div>
  );
};

export default MyCalendar;
