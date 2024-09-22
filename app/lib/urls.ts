// Account ///////////////////////////////////////////
export const LoginUrl = (): string => `/login`;
export const RegisterUrl = (): string => `/register`;

// Grades ///////////////////////////////////////////
export const GradeUrl = (): string => `/grades/show`;
export const CreateGradeUrl = (): string => `/grades/store`;
export const DeleteGradeUrl = (gradeId: string): string => `/${gradeId}/delete`;
export const UpdateGradeUrl = (gradeId: string): string => `/${gradeId}/update`;
export const FieldsUrl = (gradeId: string): string => `/${gradeId}/fields/show`;

// Class ///////////////////////////////////////////
export const ShowClassUrl = (gradeId: string): string => `/${gradeId}/classrooms/show`;
export const UpdateClassUrl = (gradeId: string, id?: number): string =>
  `/${gradeId}/classrooms/update/${id}`;
export const DeleteClassUrl = (gradeId: string, id?: number): string =>
  `/${gradeId}/classrooms/delete/${id}`;
export const CreateClassUrl = (gradeId: string): string => `/${gradeId}/classrooms/store`;

// Student ///////////////////////////////////////////
export const ShowStudentUrl = (gradeId: string): string => `/${gradeId}/students/show`;
export const UpdateStudentUrl = (gradeId: string, id?: number): string =>
  `/${gradeId}/students/update/${id}`;
export const DeleteStudentUrl = (gradeId: string, id?: number): string =>
  `/${gradeId}/students/delete/${id}`;
export const CreateStudentUrl = (gradeId: string): string => `/${gradeId}/students/store`;

// Teacher ///////////////////////////////////////////
export const ShowTeacherUrl = (gradeId: string): string => `/${gradeId}/teachers/show`;
export const UpdateTeacherUrl = (gradeId: string, id?: number): string =>
  `/${gradeId}/teachers/update/${id}`;
export const DeleteTeacherUrl = (gradeId: string, id?: number): string =>
  `/${gradeId}/teachers/delete/${id}`;
export const CreateTeacherUrl = (gradeId: string): string => `/${gradeId}/teachers/store`;

// Assign ///////////////////////////////////////////
export const ShowCourseUrl = (gradeId: string): string => `/${gradeId}/courses/show`;
export const GetAssignUrl = (gradeId: string): string => `/${gradeId}/courses/classroom/show`;
export const UpdateCourseUrl = (gradeId: string): string => `/${gradeId}/courses/store`;

// Exam ///////////////////////////////////////////
export const CreateExamUrl = (gradeId: string): string => `/${gradeId}/exams/store`;
export const ShowExamUrl = (gradeId: string, id?: string): string =>
  `/${gradeId}/exams/show${id ? `/${id}` : ''}`;
export const DeleteExamUrl = (gradeId: string, id?: number): string =>
  `/${gradeId}/exams/delete/${id}`;
export const UpdateExamUrl = (gradeId: string, id?: number): string =>
  `/${gradeId}/exams/update/${id}`;

// Bells ///////////////////////////////////////////
export const CreateBellUrl = (gradeId: string): string => `/${gradeId}/bells/store`;
export const UpdateBellUrl = (gradeId: string): string => `/${gradeId}/bells/update`;
export const DeleteBellUrl = (gradeId: string, bellId: number): string =>
  `/${gradeId}/bells/delete/${bellId}`;
export const ShowBellUrl = (gradeId: string): string => `/${gradeId}/bells/show`;
export const ShowSchedulesUrl = (gradeId: string): string => `/${gradeId}/schedules/show`;
export const CreateScheduleUrl = (gradeId: string, classId: number): string =>
  `/${gradeId}/schedules/store/${classId}`;
export const CreateCourseUrl = (gradeId: string): string => `/${gradeId}/school/courses/store`;
export const DeleteCourseUrl = (gradeId: string, id: number): string =>
  `/${gradeId}/courses/delete/${id}`;

// Absents ///////////////////////////////////////////
export const PostAbsentsUrl = (gradeId: string): string => `/${gradeId}/absents/store`;
export const ShowAbsentsUrl = (gradeId: string, date: string): string =>
  `/${gradeId}/absents/show/?date=${date}`;

// Messages ///////////////////////////////////////////
export const InboxMessageUrl = (gradeId: string): string => `/${gradeId}/messages/inbox`;
export const SendMessageUrl = (gradeId: string): string => `/${gradeId}/messages/send`;
export const SentMessagesUrl = (gradeId: string): string => `/${gradeId}/messages/sentMessages`;
export const MarkAsReadUrl = (gradeId: string, id: number): string =>
  `/${gradeId}/messages/markAsRead/${id}`;
