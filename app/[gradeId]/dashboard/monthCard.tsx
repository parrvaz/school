import React from 'react';
import CardTable from '../reports/card/cardTable';
import { ReportCardType } from 'app/types/common.type';
import fa from 'app/lib/fa.json';

const MonthCard: React.FC<{ card: ReportCardType }> = ({ card }) => {
  return (
    <div className="mt-3">
      <div className="font-bold text-14 mb-1">{fa.dashboard.monthCard}</div>
      <CardTable data={card} />
    </div>
  );
};

export default MonthCard;
