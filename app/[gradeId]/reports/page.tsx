import React from 'react';
import { redirect } from 'next/navigation';
import { GradeRoute } from 'app/lib/routes';
import { PageType } from 'app/types/common.type';

const ReportsPage: React.FC<PageType> = async ({ params }) => {
  redirect(GradeRoute(params.gradeId, 'reports', '/card'));
};

export default ReportsPage;
