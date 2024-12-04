import React from 'react';
import { Metadata } from 'next';
import fa from 'app/lib/fa.json';
import { fetchData, scoreListTag } from 'app/lib/server.util';
import { ScoreListUrl } from 'app/lib/urls';
import { PageType, ScoreListType } from 'app/types/common.type';
import ScoreList from './scoreList';

export const metadata: Metadata = { title: fa.sidebar.homeworkList };

const ScoreListPage: React.FC<PageType> = async ({ params }) => {
  const tag = await scoreListTag();
  const data = await fetchData<ScoreListType>(
    ScoreListUrl(params?.gradeId, params.homeworkId),
    tag
  );

  return (
    <>
      <h1 className="font-bold text-berry100 text-24 mb-10">{fa.homework.scoreList}</h1>
      <ScoreList tag={tag} data={{ ...data, scores: [...data.submitted, ...data.notSubmitted] }} />
    </>
  );
};

export default ScoreListPage;
