import * as yup from 'yup';

export const disciplineEditSchema = yup.object({
  cod: yup.string().optional(),
  optional: yup.string().optional(),
  name: yup.string().optional(),
  courseOutline: yup.string().optional(),
  semester: yup.number().optional(),
  description: yup.string().optional(),
  prerequisites: yup.array().of(yup.string()).optional(),
  bibliography: yup.string().optional(),
  curriculumId: yup.string().optional(),
  hours: yup.number().optional(),
});

export const disciplineAddSchema = yup.object({
  cod: yup.string().required("Campo obrigatorio"),
  optional: yup.boolean().required("Campo obrigatorio"),
  name: yup.string().required("Campo obrigatorio"),
  courseOutline: yup.string().required("Campo obrigatorio"),
  semester: yup.number().required("Campo obrigatorio"),
  description: yup.string().required("Campo obrigatorio"),
  prerequisites: yup.array().of(yup.string()).required("Campo obrigatorio"),
  bibliography: yup.string().required("Campo obrigatorio"),
  hours: yup.number().required("Campo obrigatorio"),
});

export interface CreateDisciplineBody {
  disciplines: DisciplineBody[]
}

export interface DisciplineBody {
  cod: string;
  optional: boolean;
  name: string;
  courseOutline: string;
  semester: number;
  description: string;
  prerequisites: string[];
  bibliography: string[];
  hours: number;
}

export interface PartialDiscipline {
}