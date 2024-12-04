'use client';

import Link from 'next/link';
import React from 'react';
import { useParams, usePathname } from 'next/navigation';
import { GradeRoute } from 'app/lib/routes';
import fa from 'app/lib/fa.json';

const RenderLayoutLink: React.FC = () => {
  const params = useParams();
  const pathname = usePathname();
  const activeTab = pathname.split('/')[3];

  return (
    <div role="tablist" className="tabs tabs-boxed w-fit bg-white">
      {['card', 'progress'].map((tab) => (
        <Link
          href={GradeRoute(params.gradeId, 'reports', `${tab}`)}
          key={tab}
          role="tab"
          className={`${activeTab === tab ? 'tab-active' : ''} tab`}
        >
          {fa.reports[tab].title}
        </Link>
      ))}
    </div>
  );
};

export default RenderLayoutLink;
