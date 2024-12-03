import React from 'react';
import { Metadata } from 'next';
import fa from 'app/lib/fa.json';
import { fetchData, scoreListTag } from 'app/lib/server.util';
import { HomeworkScoreUrl } from 'app/lib/urls';
import { GiveScoreType, PageType } from 'app/types/common.type';
import GiveScore from './giveScore';

export const metadata: Metadata = { title: fa.sidebar.homeworkList };

const GiveScorePage: React.FC<PageType> = async ({ params }) => {
  const data = await fetchData<GiveScoreType[]>(
    HomeworkScoreUrl(params?.gradeId, params.homeworkId)
  );

  return (
    <>
      <h1 className="font-bold text-berry100 text-24 mb-10">{fa.homework.giveScore}</h1>

      <GiveScore data={data} tag={await scoreListTag()} />
    </>
  );
};

export default GiveScorePage;
