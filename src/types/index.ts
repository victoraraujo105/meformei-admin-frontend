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
  bibliography: string[];
  preRequisites: Discipline[];
  workload: number;
  semester: number;
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

export const disciplineResponseToDiscipline = (input: DisciplineResponse, course: Course, period: number): Discipline => {
  return {
    id: input.id,
    name: input.name,
    cod: input.cod,
    menu: input.menu,
    course: course, // provide a value for course
    description: input.description,
    isOptional: input.isOptional,
    bibliography: input.bibliography,
    preRequisites: input.prerequisites,
    workload: input.workload,
    semester: period // provide a value for period
  }
}