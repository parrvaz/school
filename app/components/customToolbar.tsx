import { convertToJalaliLabel } from 'app/utils/common.util';
import React from 'react';
import { Navigate, ToolbarProps } from 'react-big-calendar';
import fa from 'app/lib/fa.json';
import Button from './button';

const CustomToolbar: React.FC<ToolbarProps> = ({ label, onNavigate, onView, date }) => {
  return (
    <div className="flex py-2 px-6 items-center justify-between">
      {/* Navigation Buttons */}
      <div className="flex items-center gap-1">
        <Button
          onClick={() => onNavigate(Navigate.TODAY)}
          className="btn btn-ghost text-black70 btn-sm"
        >
          {fa.global.today}
        </Button>
        <div
          onClick={() => onNavigate(Navigate.PREVIOUS)}
          className="p-2 hover:bg-black20 rounded-full duration-300 size-10 cursor-pointer"
        >
          <i className="icon-left-outlined text-24 text-black70" />
        </div>
        <div
          onClick={() => onNavigate(Navigate.NEXT)}
          className="p-2 hover:bg-black20 rounded-full duration-300 size-10 cursor-pointer"
        >
          <i className="icon-right-outlined text-24 text-black70" />
        </div>
      </div>
      <span className="toolbar-label font-light text-18 text-black70">
        {convertToJalaliLabel(date, label)}
      </span>
    </div>
  );
};

export default CustomToolbar;
