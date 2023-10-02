export interface UserAdmin {
  id: string;
  name: string;
  email: string;
  lastname: string;
  adminId: string;
  username: string;
  city: string;
  state: string;
}

export interface Discipline {
  id: string;
  name: string;
  cod: string;
  menu: string;
  course: Course;
  description: string;
  isOptional: boolean;
  bibliography: any[];
  prerequisites: any[];
  workload: number;
  period: number;
}

export interface Course {
  id: string;
  courseName: string;
  description: string;
  extraCurricularHours: number;
  optionalHours: number;
  requiredHours: number;
  university: University;
}

export interface University {
  id: string;
  name: string;
  abv: string;
  city: string;
  state: string;
}