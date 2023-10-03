import { useFormik } from "formik";
import * as yup from 'yup';

export const disciplineEditSchema = yup.object({
  disciplineName: yup.string().optional(),
  description: yup.string().optional(),
  optionalHours: yup.number().optional(),
  requiredHours: yup.number().optional(),
  extraCurricularHours: yup.number().optional(),
});

export const disciplineAddSchema = yup.object({
    disciplineName: yup.string().required("Campo obrigatorio"),
    description: yup.string().required("Campo obrigatorio"),
    requiredHours: yup.number().required("Campo obrigatorio"),
    optionalHours: yup.number().required("Campo obrigatorio"),
    extraCurricularHours: yup.number().required("Campo obrigatorio"),
});

export interface DisciplineBody {
    cod: string; 
    optional: boolean;
    name: string;
    courseOutline: string;
    description: string;
    bibliography: string[];
    prerequisites: string[];
    workload: number;
    period: number;
}
  
export interface PartialDiscipline {
}