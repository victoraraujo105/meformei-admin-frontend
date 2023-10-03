import { useFormik } from "formik";
import * as yup from 'yup';

export const courseEditSchema = yup.object({
  courseName: yup.string().optional(),
  description: yup.string().optional(),
  optionalHours: yup.number().optional(),
  requiredHours: yup.number().optional(),
  extraCurricularHours: yup.number().optional(),
});

export const courseAddSchema = yup.object({
    courseName: yup.string().required("Campo obrigatorio"),
    description: yup.string().required("Campo obrigatorio"),
    requiredHours: yup.number().required("Campo obrigatorio"),
    optionalHours: yup.number().required("Campo obrigatorio"),
    extraCurricularHours: yup.number().required("Campo obrigatorio"),
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