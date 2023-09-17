export interface LoginRequestBody {
  username: string;
  password: string;
}

export interface LoginResponse {
  message:	string;
  user:	StudentHttp[];
  token:	string;
  isAdmin:	boolean;
}

export interface CourseHttp {
  id: string;
  name: string;
}

export interface UniversityHttp {
  id: string;
  name: string;
  abv: string; 
  city: string;
  state: string;
}

export interface StudentHttp {
  id: string; 
  name: string; 
  email: string; 
  registration: string; 
  curriculumId: string; 
  course: CourseHttp; 
  currentSemester: number; 
  enrollmentSemester: number; 
  enrollmentYear: number; 
  lastname: string; 
  studentId: string; 
  university: UniversityHttp; 
  username: string; 
  city: string; 
  state: string; 
}