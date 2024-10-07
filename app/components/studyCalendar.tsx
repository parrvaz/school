import React, { useCallback, useState } from 'react';
import { Calendar, dateFnsLocalizer, HeaderProps, SlotInfo, Views } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import jalaali from 'jalaali-js';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { CourseType, EventPlanType, StudyType } from 'app/types/common.type';
import CourseModal from './courseModal';
import {
  dateToHour,
  faNumber,
  formatJalaliDateTimeRange,
  revertJalaliDateTime,
} from 'app/utils/common.util';
import fa from 'app/lib/fa.json';
import CustomToolbar from './customToolbar';

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

const CustomHeader = ({ label, date }: HeaderProps): JSX.Element => {
  const day = fa.global[label.slice(3).toLowerCase() as keyof typeof fa.global];
  return (
    <div className="pt-2 pb-1">
      <div className="w-full text-black70 font-light text-11 mb-1">
        {typeof day === 'string' ? day : ''}
      </div>
      <div className="font-bold text-16">{faNumber(jalaali.toJalaali(date).jd)}</div>
    </div>
  );
};

const CustomEvent: React.FC<CustomEventProps> = ({ event, onRemoveEvent }) => (
  <div className={`${event?.isFix ? 'bg-green30' : 'bg-berry50'} rtl h-full px-2`}>
    <div className="pt-1 flex justify-between font-bold text-11">
      <div className="text-start">{event.title}</div>
      {!event?.isFix && (
        <i
          onClick={() => onRemoveEvent(event)}
          className="icon-close -m-1 text-20 cursor-pointer"
        />
      )}
    </div>
    <div className="text-10 font-light text-start">
      {dateToHour(event.start.toString())} - {dateToHour(event.end.toString())}
    </div>
  </div>
);

const StudyCalendar: React.FC<{
  courses: CourseType[];
  setEvents: any;
  events: StudyType[];
  createPlan: (body: StudyType) => void;
  deletePlan: (body: EventPlanType) => void;
  isPending: boolean;
  deleteLoading: boolean;
}> = ({ courses, events, setEvents, createPlan, isPending, deletePlan }) => {
  const [selectedSlot, setSelectedSlot] = useState<SlotInfo | null>(null);
  const [currentDate, setCurrentDate] = useState(new Date());

  const onSelectLesson = async (course: CourseType): Promise<void> => {
    if (course && selectedSlot) {
      const { start, end } = selectedSlot;
      const body = formatJalaliDateTimeRange({
        start,
        end,
        title: course.name,
        course_id: course.id,
      });
      setEvents((prevEvents: StudyType[]) => [...prevEvents, body]);
      await createPlan(body);
      setSelectedSlot(null); // Clear selected slot
    }
  };

  const handleRemoveEvent = async (eventToRemove: EventPlanType): Promise<void> => {
    await deletePlan(eventToRemove);
    setEvents((prevEvents: StudyType[]) =>
      prevEvents.filter((event) => event.date !== eventToRemove.date)
    );
  };

  const slotGroupPropGetter = useCallback(
    () => ({ style: { minHeight: 50, fontSize: 12, fontFamily: 'IRANSans_Light' } }),
    []
  );

  return (
    <div className=" ltr">
      <Calendar
        localizer={localizer}
        events={revertJalaliDateTime(events)}
        startAccessor="start"
        endAccessor="end"
        defaultView={Views.WEEK}
        views={['week']}
        className="bg-white rounded-2xl overflow-hidden"
        selectable
        date={currentDate} // Controlled date state
        onNavigate={(newDate) => setCurrentDate(newDate)}
        timeslots={4}
        step={15}
        toolbar
        dayLayoutAlgorithm="no-overlap"
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
          header: CustomHeader,
          toolbar: CustomToolbar,
          event: (eventProps) => {
            const customEventProps = { ...eventProps, event: eventProps.event as EventPlanType };
            return <CustomEvent {...customEventProps} onRemoveEvent={handleRemoveEvent} />;
          },
        }}
      />

      <CourseModal
        open={!!selectedSlot}
        setOpen={() => setSelectedSlot(null)}
        {...{ courses, onSelectLesson, isPending }}
      />
    </div>
  );
};

export default StudyCalendar;
