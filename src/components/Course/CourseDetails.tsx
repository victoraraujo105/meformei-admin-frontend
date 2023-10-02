"use client"
import React, { useEffect, useState } from 'react';
import { Card, Typography, Avatar, List, ListItem, ListItemText, Button, FormControl, InputLabel, FormHelperText, InputAdornment, OutlinedInput, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { useFormik } from 'formik';

import { Course } from '@/types';
import { courseEditSchema, CourseBody } from './validations';
import { ToastContainer, toast } from 'react-toastify';
import DialogConfirmation from '../Dialog/DialogConfirmation';
import { useRouter } from 'next/navigation';
import { Cidade, Estado, getCidadesPorEstado, getEstados } from '@/services/ibge.service';
import useToast from '@/hooks/useToast';
import useCourse from '@/hooks/useCourse';


interface Props {
  course: Course
  onSave?: (values: CourseBody) => void;
}

function CourseDetails({ course, onSave }: Props) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [openDialogConfirmation, setOpenDialogConfirmation] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const { toastRef } = useToast()
  const { updateCourse, deleteCourse } = useCourse()
  async function fetchData() {
    try {

    }
    catch (error) {

    }
    setIsLoaded(true)
  }

  useEffect(() => {
    fetchData();
  }, [])

  const formik = useFormik({
    initialValues: {
    courseName: course.courseName,
    description: course.description,
    extraCurricularHours: course.extraCurricularHours,
    optionalHours: course.optionalHours,
    requiredHours: course.requiredHours,
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
          }, 1000);


      } catch (error) {

        toast.error('Ocorreu um erro ao atualizar os dados.');
        // formik.setErrors({ name: 'Houve um erro' }); // da pra tratar isso melhor
        setIsLoading(false)
      }
    },
  });


  const handleStateChange = async (event: SelectChangeEvent<string>) => {
    // const state = event.target.value;
    // formik.setFieldValue('state', state);
    // formik.setFieldValue('city', '');
  };


  const confirmDelete = async () => {
    try {
      await deleteCourse(course.id)
      setTimeout(() => {

        toast.success('Universidade deletada com sucesso!');
        setOpenDialogConfirmation(false)
        router.back()
      }, 1000);


    } catch (error) {
      toast.error('Ocorreu um erro ao deletar.');
    }

  }

  return (
    <>
      {course && isLoaded && (
        <Card className='pt-6'>
          <form onSubmit={formik.handleSubmit}>
            <FormControl sx={{ mb: 3 }} fullWidth>
              <InputLabel htmlFor="name">Nome</InputLabel>
              <OutlinedInput
                id="courseName"
                label="Name"
                name="courseName"
                aria-describedby="name-helper-text"
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
                label="Description"
                name="description"
                aria-describedby="description-helper-text"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.description && Boolean(formik.errors.description)}

              />
              <FormHelperText id="abv-helper-text">{formik.touched.description && formik.errors.description}</FormHelperText>
            </FormControl>

            <FormControl sx={{ mb: 3 }} fullWidth>
              <InputLabel htmlFor="name">Horas Complementares </InputLabel>
              <OutlinedInput
                id="extraCurricularHours"
                label="Horas Complementares"
                name="extraCurricularHours"
                aria-describedby="extraCurricularHours-helper-text"
                value={formik.values.extraCurricularHours}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.extraCurricularHours && Boolean(formik.errors.extraCurricularHours)}

              />
              <FormHelperText id="extraCurricularHours-helper-text">{formik.touched.extraCurricularHours && formik.errors.extraCurricularHours}</FormHelperText>
            </FormControl>

            <FormControl sx={{ mb: 3 }} fullWidth>
              <InputLabel htmlFor="name">Horas Complementares </InputLabel>
              <OutlinedInput
                id="extraCurricularHours"
                label="Horas Complementares"
                name="optionalHours"
                aria-describedby="optionalHours-helper-text"
                value={formik.values.optionalHours}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.optionalHours && Boolean(formik.errors.optionalHours)}

              />
              <FormHelperText id="extraCurricularHours-helper-text">{formik.touched.extraCurricularHours && formik.errors.extraCurricularHours}</FormHelperText>
            </FormControl>

            <FormControl sx={{ mb: 3 }} fullWidth>
              <InputLabel htmlFor="name">Horas Complementares </InputLabel>
              <OutlinedInput
                id="extraCurricularHours"
                label="Horas Complementares"
                name="extraCurricularHours"
                aria-describedby="extraCurricularHours-helper-text"
                value={formik.values.extraCurricularHours}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.extraCurricularHours && Boolean(formik.errors.extraCurricularHours)}

              />
              <FormHelperText id="extraCurricularHours-helper-text">{formik.touched.extraCurricularHours && formik.errors.extraCurricularHours}</FormHelperText>
            </FormControl>

            <FormControl fullWidth sx={{ mb: 3 }}>

            <Button disabled={isLoading} variant="contained" fullWidth type="submit">Salvar</Button>
          </form>
          <ToastContainer />
          <Button sx={{ mt: 2, bgcolor: "red", ":hover": { bgcolor: "#6f0000" } }} disabled={isLoading} variant="contained" fullWidth onClick={() => setOpenDialogConfirmation(true)}>Deletar</Button>
          <DialogConfirmation content='Tem certeza de que deseja excluir este item?' open={openDialogConfirmation} onConfirm={() => confirmDelete()} handleClose={() => setOpenDialogConfirmation(false)} />
        </Card>
      )}
    </>
  );
}

export default CourseDetails;