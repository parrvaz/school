import { Metadata } from 'next';
import React from 'react';
import Bells from '.';
import fa from 'app/lib/fa.json';

export const metadata: Metadata = { title: fa.sidebar.bells };

const BellsPage: React.FC = () => {
  return (
    <div className="">
      <h1 className="font-bold text-berry100 text-24 mb-10">{fa.sidebar.bells}</h1>
      <Bells />
    </div>
  );
};

export default BellsPage;
