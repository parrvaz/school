import { NextRequest, NextResponse } from 'next/server';
import { ROLES } from 'app/utils/common.util';
import { getUserRole } from 'app/lib/server.util';

const { manager, assistant, teacher, student, parent } = ROLES;

// Define role access for specific routes
const accessControl = {
  '/dashboard': [manager, assistant, teacher, student, parent],
  '/classroom': [manager, assistant],
  '/student': [manager, assistant],
  '/teacher': [manager, assistant],
  '/assign': [manager, assistant],
  '/createExam': [manager, assistant, teacher],
  '/exams': [manager, assistant, teacher],
  '/bells': [manager, assistant],
  '/absents': [manager, assistant, teacher],
  '/rollCall': [manager, assistant, teacher],
  '/messages': [manager, assistant, teacher, student],
  '/setPlan': [manager, assistant],
  '/study': [manager, assistant, student],
};

export const middleware = async (req: NextRequest): Promise<NextResponse<unknown>> => {
  const role = await getUserRole(); // Fetch user's role

  // Get the pathname excluding the dynamic part (ID)
  const pathname = req.nextUrl.pathname.replace(/^\/[^/]+/, ''); // Removes the dynamic ID part

  // If the path doesn't require access control, let the request pass
  if (!accessControl[pathname]) {
    return NextResponse.next();
  }

  // Check if the user's role is allowed to access the current path
  if (!accessControl[pathname].includes(role)) {
    // If the role is not allowed, redirect to a 403 page
    return NextResponse.redirect(new URL('/403', req.url));
  }

  // If allowed, continue with the request
  return NextResponse.next();
};

export const config = {
  matcher: [
    '/:gradeId/dashboard',
    '/:gradeId/classroom',
    '/:gradeId/student',
    '/:gradeId/teacher',
    '/:gradeId/assign',
    '/:gradeId/create-exam',
    '/:gradeId/exams',
    '/:gradeId/bells',
    '/:gradeId/absents',
    '/:gradeId/rollCall',
    '/:gradeId/messages',
    '/:gradeId/setPlan',
    '/:gradeId/study',
  ],
};