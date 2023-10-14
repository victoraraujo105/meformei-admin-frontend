"use client"
import useDiscipline from '@/hooks/useDiscipline';
import useToast from '@/hooks/useToast';
import { Discipline } from '@/types';
import { Button, Chip, FormControl, FormHelperText, InputLabel, MenuItem, OutlinedInput, Select } from '@mui/material';
import { Form, Formik } from 'formik';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { disciplineEditSchema } from './validations';

import CancelIcon from '@mui/icons-material/Cancel';
interface Props {
  discipline: Discipline
  onSave: () => void;
}

interface selectData {
  id: string | boolean;
  text: string;
}

const selectOptinalOptions: selectData[] = [
  { id: "", text: "" },
  { id: true, text: "Sim" },
  { id: false, text: "Não" }
];


function EditDiscipline({ discipline, onSave }: Props) {

  const [isLoading, setIsLoading] = useState(false)
  const [isChanged, setIsChanged] = useState(false)

  const [isLoaded, setIsLoaded] = useState(false)
  const { toastRef } = useToast()
  const { updateDiscipline, deleteDiscipline, disciplines } = useDiscipline()


  const handleChanged = () => {
    setIsChanged(true)
  }

  const initialValues = {
    cod: discipline.cod,
    bibliography: discipline.bibliography[0],
    courseOutline: discipline.menu,
    description: discipline.description,
    name: discipline.name,
    optional: discipline.isOptional,
    semester: discipline.semester,
    prerequisites: discipline.prerequisites,
    hours: discipline.workload,
    curriculumId: discipline.curriculumId
  }


  const onSubmitForm = async (values: any) => {
    setIsLoading(true)
    let newData = { ...values, bibliography: [values.bibliography] }
    try {

      await updateDiscipline({ id: discipline.id, data: newData })
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
  }

  const formId = "editDisciplineInCourse"

  return (
    <>

      <div className='w-[32rem] mt-3 '>
        <Formik initialValues={initialValues} validationSchema={disciplineEditSchema} onSubmit={onSubmitForm}>

          {({ values, handleBlur, handleChange, touched, errors, handleSubmit, setFieldValue }) => (

            <Form className='form grid grid-cols-2 gap-3 ' onChange={handleChanged} id={formId} onSubmit={handleSubmit} >
              <FormControl sx={{ mb: 3 }} fullWidth>
                <InputLabel htmlFor="name">Nome</InputLabel>
                <OutlinedInput
                  id="name"
                  label="Nome"
                  name="name"
                  aria-describedby="name-helper-text"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.name && Boolean(errors.name)}

                />
                <FormHelperText id="name-helper-text">{touched.name && errors.name}</FormHelperText>
              </FormControl>

              <FormControl sx={{ mb: 3 }} fullWidth>
                <InputLabel htmlFor="name">Descrição</InputLabel>
                <OutlinedInput
                  id="description"
                  label="Descrição"
                  name="description"
                  aria-describedby="description-helper-text"
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.description && Boolean(errors.description)}

                />
                <FormHelperText id="description-helper-text">{touched.description && errors.description}</FormHelperText>
              </FormControl>

              <FormControl sx={{ mb: 3 }} fullWidth>
                <InputLabel htmlFor="name">Código</InputLabel>
                <OutlinedInput
                  id="cod"
                  label="Codigo"
                  name="cod"
                  aria-describedby="cod-helper-text"
                  value={values.cod}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.cod && Boolean(errors.cod)}

                />
                <FormHelperText id="cod-helper-text">{touched.cod && errors.cod}</FormHelperText>
              </FormControl>

              <FormControl sx={{ mb: 3 }} fullWidth>
                <InputLabel htmlFor="name">Ementa</InputLabel>
                <OutlinedInput
                  id="courseOutline"
                  label="Ementa"
                  name="courseOutline"
                  aria-describedby="courseOutline-helper-text"
                  value={values.courseOutline}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.courseOutline && Boolean(errors.courseOutline)}

                />
                <FormHelperText id="courseOutline-helper-text">{touched.courseOutline && errors.courseOutline}</FormHelperText>
              </FormControl>

              <FormControl sx={{ mb: 3 }} fullWidth>
                <InputLabel htmlFor="name">Semestre</InputLabel>
                <OutlinedInput
                  id="semester"
                  label="Semestre"
                  name="semester"
                  aria-describedby="semester-helper-text"
                  value={values.semester}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.semester && Boolean(errors.semester)}
                  type='number'
                />
                <FormHelperText id="semester-helper-text">{touched.semester && errors.semester}</FormHelperText>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel>Optativa</InputLabel>
                <Select
                  id="optional"
                  name="optional"
                  label="Optativa"
                  value={selectOptinalOptions.find(({ id }) => id === values.optional)?.text}
                  onChange={(e) => {
                    if (e.target.value) {
                      const finded = selectOptinalOptions.find(
                        ({ text }) => text === e.target.value
                      );
                      if (finded) {
                        setFieldValue("optional", finded.id);
                      }

                    }
                  }}
                  onBlur={handleBlur}
                  error={touched.optional && Boolean(errors.optional)}
                >

                  {selectOptinalOptions.map(({ text }) => (
                    <MenuItem key={text} value={text}>
                      {text}
                    </MenuItem>
                  ))}

                </Select>
                <FormHelperText id="optional-helper-text">{touched.optional && errors.optional}</FormHelperText>
              </FormControl>

              <FormControl  >
                <InputLabel>Bibliografia</InputLabel>
                <OutlinedInput
                  id="bibliography"
                  name="bibliography"
                  label="Bibliografia"
                  value={values.bibliography}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.bibliography && Boolean(errors.bibliography)}
                />
                <FormHelperText id="bibliography-helper-text">{touched.bibliography && errors.bibliography}</FormHelperText>
              </FormControl>

              <FormControl>
                <InputLabel>Carga horária</InputLabel>
                <OutlinedInput
                  id="hours"
                  name="hours"
                  label="Carga horária"
                  value={values.hours}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type='number'
                  error={touched.hours && Boolean(errors.hours)}
                />
                <FormHelperText id="hours-helper-text">{touched.hours && errors.hours}</FormHelperText>
              </FormControl>

              <FormControl >
                <InputLabel>Prerequisitos</InputLabel>
                <Select
                  id="prerequisites"
                  name="prerequisites"
                  label="Prerequisites"
                  value={values.prerequisites}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  multiple
                  renderValue={(selected) => (
                    <div style={{
                      display: "flex",
                      flexWrap: "wrap",
                      height: "2rem",
                      overflowY: "auto",
                    }}>
                      {(selected as string[]).map((value) => (
                        <Chip
                          key={value}
                          label={value}
                          color="primary"
                          clickable
                          deleteIcon={
                            <CancelIcon
                              onMouseDown={(event: any) => event.stopPropagation()}
                            />
                          }
                        />
                      ))}
                    </div>
                  )}
                  error={touched.prerequisites && Boolean(errors.prerequisites)}
                >

                  {disciplines.map(({ id, cod, name }) => (
                    <MenuItem key={id} value={cod} sx={{ maxWidth: 350 }} selected={values.prerequisites.includes(cod)} onClick={() => setIsChanged(true)} >
                      [{cod}] {name}
                    </MenuItem>
                  ))}

                </Select>
                <FormHelperText id="prerequisites-helper-text">{touched.prerequisites && errors.prerequisites}</FormHelperText>
              </FormControl>


            </Form>)}

        </Formik>
        <div className='flex justify-between w-full mt-4'>

          <Button disabled={isLoading} className='w-1/4' variant="outlined" onClick={() => onSave()}>Voltar</Button>
          <Button disabled={isLoading || !isChanged} className='w-1/4' variant="contained" form={formId} type="submit">Salvar</Button>

        </div>
      </div>

    </>
  );
}

export default EditDiscipline;