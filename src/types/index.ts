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

export interface University {
  id: string;
  name: string;
  abv: string;
  city: string;
  state: string;
}

export interface Curriculum {
  id: string;
  course: Course;
  description: string;
  extraCurricularHours: number;
  optionalHours: number;
  requiredHours: number;
  university: University;
}


export interface Course {
  id: string;
  name: string;
}

export interface University {
  id: string;
  name: string;
  abv: string;
  city: string;
  state: string;
}
