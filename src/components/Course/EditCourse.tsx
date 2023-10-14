"use client"
import { Button, FormControl, FormHelperText, InputLabel, OutlinedInput } from '@mui/material';
import { useFormik } from 'formik';
import { useState } from 'react';

import useCourse from '@/hooks/useCourse';
import useToast from '@/hooks/useToast';
import { Course } from '@/types';
import { toast } from 'react-toastify';
import { courseEditSchema } from './validations';


interface Props {
  course: Course;
  onSave: () => void;
}

function EditCourse({ course, onSave }: Props) {

  const [isLoading, setIsLoading] = useState(false)
  const [isChanged, setIsChanged] = useState(false)

  const { toastRef } = useToast()
  const { updateCourse } = useCourse()


  const handleChange = () => {
    setIsChanged(true)
  }

  const formik = useFormik({
    initialValues: {
      courseName: course.courseName,
      description: course.description,
      optionalHours: course.optionalHours,
      requiredHours: course.requiredHours,
      extraCurricularHours: course.extraCurricularHours,
    },
    validationSchema: courseEditSchema,
    onSubmit: async (values) => {
      setIsLoading(true)

      try {

        await updateCourse({ id: course.id, data: values })
        setTimeout(() => {
          if (toastRef.current) {
            toastRef.current.success('Dados atualizados com sucesso!');
          }
          setIsLoading(false)
          onSave()
          setIsChanged(false)
        }, 1000);

      } catch (error) {

        toast.error('Ocorreu um erro ao atualizar os dados.');
        setIsLoading(false)
      }
    },
  });



  return (
    <>
      <div className='w-[32rem] mt-3'>
        <form onSubmit={formik.handleSubmit} onChange={handleChange}>
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
              type='number'
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
              type='number'
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
              type='number'
            />
            <FormHelperText id="extraCurricularHours-helper-text">{formik.touched.extraCurricularHours && formik.errors.extraCurricularHours}</FormHelperText>
          </FormControl>


          <div className='flex justify-between '>

            <Button disabled={isLoading} className='w-[25%]' variant="outlined" onClick={() => onSave()}>Voltar</Button>
            <Button disabled={isLoading || !isChanged} className='w-[25%]' variant="contained" type="submit">Salvar</Button>

          </div>

        </form>
      </div>

    </>
  );
}

export default EditCourse;