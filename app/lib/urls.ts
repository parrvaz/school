// Account ///////////////////////////////////////////
export const LoginUrl = (): string => `/login`;
export const RegisterUrl = (): string => `/register`;

// Grades ///////////////////////////////////////////
export const GradeUrl = (): string => `/grades/show`;
export const CreateGradeUrl = (): string => `/grades/store`;
export const DeleteGradeUrl = (id: number): string => `/grades/delete/${id}`;
