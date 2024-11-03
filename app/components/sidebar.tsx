'use client';

import { useParams, usePathname } from 'next/navigation';
import Link from 'next/link';
import React from 'react';
import { GradeRoute } from 'app/lib/routes';
import fa from 'app/lib/fa.json';
import { kebabCase } from 'app/utils/common.util';

const className =
  'animate mb-1.5 flex cursor-pointer items-center rounded-xl p-2 text-14 hover:bg-berry20 hover:text-black80';

const Sidebar: React.FC<{
  menu: { title: string; icon: string }[];
}> = ({ menu }) => {
  const path = usePathname();
  const { gradeId } = useParams();
  const activeTab = path.split('/')[2];

  return (
    <div className="right-0 h-screen w-60 fixed overflow-auto bg-white z-[100]">
      <div className="pt-16">
        {menu.map(({ title, icon }) => (
          <div className="relative pl-4 pr-5" key={title}>
            {
              <Link
                href={GradeRoute(gradeId.toString(), kebabCase(title))}
                className={`${
                  kebabCase(title) === activeTab
                    ? ' bg-berry20 text-black80'
                    : 'bg-white text-black60'
                } ${className}`}
              >
                <>
                  <span className={`ml-3 text-24  ${icon}`} />
                  <h2 className="max-h-11 overflow-hidden">
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
    </div>
  );
};

export default Sidebar;
