import * as yup from 'yup';

export const courseEditSchema = yup.object({
  courseName: yup.string().optional(),
  description: yup.string().optional(),
  requiredHours: yup.number().optional().min(1, "No minimo 1").max(10000, "No maximo 10000"),
  optionalHours: yup.number().optional().min(1, "No minimo 1").max(3000, "No maximo 3000"),
  extraCurricularHours: yup.number().optional().min(1, "No minimo 1").max(3000, "No maximo 3000"),
});

export const courseAddSchema = yup.object({
  courseName: yup.string().required("Campo obrigatorio"),
  description: yup.string().required("Campo obrigatorio"),
  requiredHours: yup.number().required("Campo obrigatorio").min(1, "No minimo 1").max(10000, "No maximo 10000"),
  optionalHours: yup.number().required("Campo obrigatorio").min(1, "No minimo 1").max(3000, "No maximo 3000"),
  extraCurricularHours: yup.number().required("Campo obrigatorio").min(1, "No minimo 1").max(3000, "No maximo 3000"),
});

export interface CourseBody {
  courseName: string;
  description: string;
  requiredHours: number;
  optionalHours: number;
  extraCurricularHours: number;
}

export interface PartialCourse {
}