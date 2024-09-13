'use client';

import { useParams, usePathname } from 'next/navigation';
import Link from 'next/link';
import React from 'react';
import { GradeRoute } from 'app/lib/routes';
import fa from 'app/lib/fa.json';

const className =
  'animate mb-1.5 flex cursor-pointer items-center rounded-xl p-2 text-14 hover:bg-berry20 hover:text-black80';

const Sidebar: React.FC<{
  menu: { title: string; icon: string }[];
}> = ({ menu }) => {
  const path = usePathname();
  const { gradeId } = useParams();
  const activeTab = path.split('/')[2];

  return (
    <div className="pt-10">
      {menu.map(({ title, icon }) => (
        <div className="relative pl-4 pr-5" key={title}>
          {
            <Link
              href={GradeRoute(gradeId.toString(), title)}
              className={`${
                title === activeTab ? ' bg-berry20 text-black80' : 'bg-white text-black60'
              } ${className}`}
            >
              <>
                <span className={`ml-3 text-24  ${icon}`} />
                <h2 className="hidden max-h-11 overflow-hidden xl:flex">
                  {fa.sidebar[title as keyof typeof fa.sidebar]}
                </h2>
              </>
            </Link>
          }

          {title === activeTab && (
            <div className="absolute left-0 top-0 h-full w-1 rounded-br rounded-tr bg-berry60" />
          )}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
