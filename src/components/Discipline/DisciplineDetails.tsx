"use client"
import { Button, ButtonGroup, Card, FormControl, FormHelperText, InputLabel, OutlinedInput } from '@mui/material';
import { useFormik } from 'formik';
import { useState } from 'react';

import useDiscipline from '@/hooks/useDiscipline';
import useToast from '@/hooks/useToast';
import { Discipline } from '@/types';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import DialogConfirmation from '../Dialog/DialogConfirmation';
import { DisciplineBody, disciplineEditSchema } from './validations';


interface Props {
  discipline: Discipline
  onSave?: (values: DisciplineBody) => void;
}

function DisciplineDetails({ discipline, onSave }: Props) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [openDialogConfirmation, setOpenDialogConfirmation] = useState(false)
  const [isLoaded, setIsLoaded] = useState(true)
  const { toastRef } = useToast()
  const { updateDiscipline, deleteDiscipline } = useDiscipline()
  console.log("disciplina:", discipline)

    const formik = useFormik({
      initialValues: {
        name: discipline.name,
        cod: discipline.cod,
        menu: discipline.menu,
        course: discipline.course,
        description: discipline.description,
        isOptional: discipline.isOptional,
        bibliography: discipline.bibliography,
        workload: discipline.workload,
        period: discipline.semester,
      },
      validationSchema: disciplineEditSchema,
      onSubmit: async (values) => {
        // onSave(values);
        setIsLoading(true)

        try {
          await updateDiscipline({ id: discipline.id, data: values })
          setTimeout(() => {
            if (toastRef.current) {
              toastRef.current.success('Dados atualizados com sucesso!');
            }
            setIsLoading(false)
          }, 1000);
        } catch (error) {

          toast.error('Ocorreu um erro ao atualizar os dados.');
          formik.setErrors({ name: 'Houve um erro' }); // da pra tratar isso melhor
          setIsLoading(false)
        }
      },
    });

    const confirmDelete = async () => {
      try {
        await deleteDiscipline(discipline.id)
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
        {discipline && isLoaded && (
          <Card className='pt-6'>
            <form onSubmit={formik.handleSubmit}>
              {/** Update the formControl's tags using Discipline interface */}
              <FormControl sx={{ mb: 3 }} fullWidth>
                <InputLabel htmlFor="name">Nome</InputLabel>
                <OutlinedInput
                  id="name"
                  label="Nome"
                  name="name"
                  aria-describedby="name-helper-text"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                />
                <FormHelperText id="name-helper-text">{formik.touched.name && formik.errors.name}</FormHelperText>
              </FormControl>
              <FormControl sx={{ mb: 3 }} fullWidth>
                <InputLabel htmlFor="name">Código</InputLabel>
                <OutlinedInput
                  id="cod"
                  label="Código"
                  name="cod"
                  aria-describedby="cod-helper-text"
                  value={formik.values.cod}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.cod && Boolean(formik.errors.cod)}
                />
                <FormHelperText id="cod-helper-text">{formik.touched.cod && formik.errors.cod}</FormHelperText>
              </FormControl>
              <FormControl sx={{ mb: 3 }} fullWidth>
                <InputLabel htmlFor="name">Ementa</InputLabel>
                <OutlinedInput
                  id="menu"
                  label="Ementa"
                  name="menu"
                  aria-describedby="menu-helper-text"
                  value={formik.values.menu}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.menu && Boolean(formik.errors.menu)}
                />
                <FormHelperText id="menu-helper-text">{formik.touched.menu && formik.errors.menu}</FormHelperText>
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
                <InputLabel htmlFor="name">Optativa</InputLabel>
                <OutlinedInput
                  id="isOptional"
                  label="Optativa"
                  name="isOptional"
                  aria-describedby="isOptional-helper-text"
                  value={formik.values.isOptional? "Sim" : "Não"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.isOptional && Boolean(formik.errors.isOptional)}
                />
                <FormHelperText id="isOptional-helper-text">{formik.touched.isOptional && formik.errors.isOptional}</FormHelperText>
              </FormControl>
              <FormControl sx={{ mb: 3 }} fullWidth>
                <InputLabel htmlFor="workload">Carga Horária</InputLabel>
                <OutlinedInput
                  id="workload"
                  label="Name"
                  name="workload"
                  aria-describedby="workload-helper-text"
                  value={formik.values.workload}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.workload && Boolean(formik.errors.workload)}
                />
                <FormHelperText id="workload-helper-text">{formik.touched.workload && formik.errors.workload}</FormHelperText>
              </FormControl>
              <FormControl sx={{ mb: 3 }} fullWidth>
                <InputLabel htmlFor="period">Período</InputLabel>
                <OutlinedInput
                  id="period"
                  label="Period"
                  name="period"
                  aria-describedby="period-helper-text"
                  value={formik.values.period}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.period && Boolean(formik.errors.period)}
                />
                <FormHelperText id="period-helper-text">{formik.touched.period && formik.errors.period}</FormHelperText>
              </FormControl>
              <ButtonGroup style={{display: 'flex'}}>
               <Button disabled={isLoading} variant="contained" fullWidth type="submit">Salvar</Button>
               <Button sx={{ mt: 0, bgcolor: "red", ":hover": { bgcolor: "#6f0000" } }} disabled={isLoading} variant="contained" fullWidth  onClick={() => setOpenDialogConfirmation(true)}>Deletar</Button>
              </ButtonGroup>
            </form>
            <ToastContainer />
            <DialogConfirmation content='Tem certeza de que deseja excluir este item?' open={openDialogConfirmation} onConfirm={() => confirmDelete()} handleClose={() => setOpenDialogConfirmation(false)} />
          </Card>
        )}
      </>
    );
  }
export default DisciplineDetails;
