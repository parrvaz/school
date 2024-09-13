// home /////////////////////////////////////////////////////////////////////////////////////////
export const HomeRoute = (): string => `/`;

// account /////////////////////////////////////////////////////////////////////////////////////////
export const RegisterRoute = (): string => `/register`;
export const LoginRoute = (): string => `/login`;

// grade /////////////////////////////////////////////////////////////////////////////////////////
export const GradeRoute = (gradeId: string | number, tabName: string): string =>
  `/${gradeId}/${tabName}/`;
