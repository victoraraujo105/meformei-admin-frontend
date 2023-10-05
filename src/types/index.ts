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
  cod: string;
  optional: boolean;
  name: string;
  courseOutline: string;
  semester: number;
  description: string;
  prerequisiteDisciplines: string[];
  bibliography: string[];
  curriculumId: string;
  hours: number;
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

export interface DisciplinesResponse {
  period: number,
  disciplines: DisciplineResponse[]
}

export interface DisciplineResponse {
  bibliography: string[];
  cod: string;
  curriculumId: string;
  description: string;
  id: string;
  isOptional: boolean;
  menu: string;
  name: string;
  prerequisites: Discipline[];
  workload: number;
}

