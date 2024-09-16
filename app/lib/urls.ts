// Account ///////////////////////////////////////////
export const LoginUrl = (): string => `/login`;
export const RegisterUrl = (): string => `/register`;

// Grades ///////////////////////////////////////////
export const GradeUrl = (): string => `/grades/show`;
export const CreateGradeUrl = (): string => `/grades/store`;
export const DeleteGradeUrl = (id: number): string => `/grades/delete/${id}`;
export const FieldsUrl = (gradeId: number): string => `/${gradeId}/fields/show`;
export const UpdateStudentUrl = (gradeId: string, id?: number): string =>
  `/${gradeId}/students/update/${id}`;
export const DeleteStudentUrl = (gradeId: string, id?: number): string =>
  `/${gradeId}/students/delete/${id}`;
export const CreateStudentUrl = (gradeId: string): string => `/${gradeId}/students/store`;
