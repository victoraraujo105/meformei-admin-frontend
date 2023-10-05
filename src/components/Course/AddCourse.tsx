import useToast from "@/hooks/useToast";
import { FormControl, FormHelperText, InputLabel, OutlinedInput } from "@mui/material";
import { useEffect, useState } from "react";
import FormDialog from "../Dialog/DialogForm";

import useCourse from "@/hooks/useCourse";
import { useFormik } from "formik";
import { toast } from 'react-toastify';
import { CourseBody, courseAddSchema } from "./validations";
interface Props {
  open: boolean
  onConfirm: () => void;
  onClose: () => void;
}
export default function AddCourse({ open, onClose, onConfirm }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { setToastRef } = useToast()
  const { createCourse } = useCourse()

  useEffect(() => {
    setToastRef(toast)
  }, [])

  const formik = useFormik({
    initialValues: {
      courseName: "",
      description: "",
      extraCurricularHours: 0,
      optionalHours: 0,
      requiredHours: 0,
    },
    validationSchema: courseAddSchema,
    onSubmit: (values: CourseBody) => onSubmitForm(values)
  });

  const onSubmitForm = async (values: CourseBody) => {
    setIsLoading(true);

    try {
      await createCourse({ courseBody: values })
      setTimeout(() => {
        toast.success('Curso criado com sucesso!');
        setIsLoading(false);
        formik.resetForm()
        onClose
      }, 1000);
    } catch (error) {
      toast.error('Ocorreu um erro ao criar.');
      setIsLoading(false);
    }
  }
  const formId = "addCourseInUniversity"
  return (
    <FormDialog
      isLoading={isLoading}
      formId={formId}
      onClose={onClose}
      onConfirm={onConfirm}
      open={open}
      title="Adicionar curso"
    >
      <form className='form grid grid-cols-2 gap-3 pt-2' id={formId} onSubmit={formik.handleSubmit} >
        <FormControl sx={{ mb: 3 }} fullWidth>
          <InputLabel htmlFor="name">Nome</InputLabel>
          <OutlinedInput
            id="courseName"
            label="Nome"
            name="courseName"
            aria-describedby="courseName-helper-text"
            value={formik.values.courseName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.courseName && Boolean(formik.errors.courseName)}

          />
          <FormHelperText id="name-helper-text">{formik.touched.courseName && formik.errors.courseName}</FormHelperText>
        </FormControl>

        <FormControl sx={{ mb: 3 }} fullWidth>
          <InputLabel htmlFor="name">Descrição</InputLabel>
          <OutlinedInput
            id="description"
            label="Descrição"
            name="description"
            aria-describedby="description-helper-text"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.description && Boolean(formik.errors.description)}

          />
          <FormHelperText id="description-helper-text">{formik.touched.description && formik.errors.description}</FormHelperText>
        </FormControl>

        <FormControl sx={{ mb: 3 }} fullWidth>
          <InputLabel htmlFor="name">Horas obrigatórias</InputLabel>
          <OutlinedInput
            id="requiredHours"
            label="Horas obrigatórias"
            name="requiredHours"
            aria-describedby="requiredHours-helper-text"
            value={formik.values.requiredHours}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.requiredHours && Boolean(formik.errors.requiredHours)}

          />
          <FormHelperText id="requiredHours-helper-text">{formik.touched.requiredHours && formik.errors.requiredHours}</FormHelperText>
        </FormControl>

        <FormControl sx={{ mb: 3 }} fullWidth>
          <InputLabel htmlFor="name">Horas optativas</InputLabel>
          <OutlinedInput
            id="optionalHours"
            label="Horas optativas"
            name="optionalHours"
            aria-describedby="optionalHours-helper-text"
            value={formik.values.optionalHours}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.optionalHours && Boolean(formik.errors.optionalHours)}

          />
          <FormHelperText id="optionalHours-helper-text">{formik.touched.optionalHours && formik.errors.optionalHours}</FormHelperText>
        </FormControl>

        <FormControl sx={{ mb: 3 }} fullWidth>
          <InputLabel htmlFor="name">Horas complementares</InputLabel>
          <OutlinedInput
            id="extraCurricularHours"
            label="Horas complementares"
            name="extraCurricularHours"
            aria-describedby="extraCurricularHours-helper-text"
            value={formik.values.extraCurricularHours}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.extraCurricularHours && Boolean(formik.errors.extraCurricularHours)}

          />
          <FormHelperText id="extraCurricularHours-helper-text">{formik.touched.extraCurricularHours && formik.errors.extraCurricularHours}</FormHelperText>
        </FormControl>

      </form>
    </FormDialog>
  )
}