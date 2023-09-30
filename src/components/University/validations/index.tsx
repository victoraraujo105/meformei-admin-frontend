import { useFormik } from "formik";
import * as yup from 'yup';
export const universityEditSchema = yup.object({
  name: yup.string().optional(),
  abv: yup.string().optional(),
  city: yup.string().optional(),
  state: yup.string().optional(),
});

export const universityAddSchema = yup.object({
  name: yup.string().required("Campo obrigatorio"),
  abv: yup.string().required("Campo obrigatorio"),
  city: yup.string().required("Campo obrigatorio"),
  state: yup.string().required("Campo obrigatorio"),
});


export interface UniversityBody {
  name: string;
  abv: string;
  city: string;
  state: string;
}

export type PartialUniversity = {
  name?: string;
  abv?: string;
  city?: string;
  state?: string;
}
