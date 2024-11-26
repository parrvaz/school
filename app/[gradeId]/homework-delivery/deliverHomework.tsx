import React from 'react';
import { SingleStudentHomeworkType } from 'app/types/common.type';
import fa from 'app/lib/fa.json';
import { faNumber } from 'app/utils/common.util';
import HomeworkForm from './homeworkForm';

const DeliverHomework: React.FC<{ data: SingleStudentHomeworkType; justShow: boolean }> = ({
  data,
  justShow,
}) => {
  return (
    <div>
      <div className="bg-white w-full px-6 flex items-center justify-between py-4 rounded-lg">
        <div className="font-bold text-18">{data.title}</div>
        <div className="flex gap-10">
          <div className="text-14 font-regular">
            {fa.global.course} : {data.course}
          </div>
          <div className="text-14 font-regular">
            {fa.homework.score} : {faNumber(data.score)}
          </div>
          <div className="text-14 font-regular">
            {fa.homework.date} : {faNumber(data.date)}
          </div>
        </div>
      </div>

      <div className="flex gap-3 mt-3">
        <div className="">
          <div className="bg-white rounded-lg p-3 w-64 shrink-0">
            <div className="font-bold">{fa.homework.files}</div>
          </div>
          <div className="bg-white rounded-lg p-3 w-64 shrink-0 mt-3">
            <div className="font-bold">{fa.homework.link}</div>
            {data.link ? (
              <a target="_blank" className="mt-3 text-14 font-regular">
                {data.link}
              </a>
            ) : (
              <div className="mt-3 text-14 font-regular">{fa.global.noData}</div>
            )}
          </div>
        </div>
        <div className="bg-white rounded-lg p-3 flex-1">
          <div className="font-bold">{fa.global.description}</div>
          <div className="mt-3 text-14 font-regular">{data.description || fa.global.noData}</div>
        </div>
      </div>

      {!justShow && <HomeworkForm id={data.studentHomework_id} />}
    </div>
  );
};

export default DeliverHomework;
