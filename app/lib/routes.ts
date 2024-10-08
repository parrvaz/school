// home /////////////////////////////////////////////////////////////////////////////////////////
export const HomeRoute = (id?: string, isCreate?: boolean): string =>
  `/${id ? `?id=${id}` : ''}${isCreate ? `?isCreate=true` : ''}`;

// account /////////////////////////////////////////////////////////////////////////////////////////
export const RegisterRoute = (): string => `/register`;
export const LoginRoute = (): string => `/login`;

// grade /////////////////////////////////////////////////////////////////////////////////////////
export const GradeRoute = (
  gradeId: string | string[],
  tabName: string,
  searchParams?: string | number
): string => `/${gradeId}/${tabName}/${searchParams || ''}`;
