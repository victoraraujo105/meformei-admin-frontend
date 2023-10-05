import useDiscipline from "@/hooks/useDiscipline";
import useToast from "@/hooks/useToast";
import CancelIcon from '@mui/icons-material/Cancel';
import { Chip, FormControl, FormHelperText, InputLabel, MenuItem, OutlinedInput, Select } from "@mui/material";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import FormDialog from "../Dialog/DialogForm";
import { DisciplineBody, disciplineAddSchema } from "./validations";
interface Props {
  open: boolean
  onConfirm: () => void;
  onClose: () => void;
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

export default function AddDiscipline({ open, onClose, onConfirm }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { setToastRef } = useToast()
  const { createDiscipline, disciplines } = useDiscipline()

  useEffect(() => {
    setToastRef(toast)
  }, [])
  const initialValues = {
    cod: "",
    bibliography: [],
    courseOutline: "",
    description: "",
    name: "",
    optional: false,
    semester: 0,
    prerequisites: [],
    hours: 0
  }

  const onSubmitForm = async (values: DisciplineBody, { resetForm }: { resetForm: () => void }) => {
    setIsLoading(true);

    try {
      await createDiscipline({ disciplineBody: values })
      setTimeout(() => {
        toast.success('Disciplina criada com sucesso!');
        setIsLoading(false);
        resetForm()
        onClose
      }, 1000);
    } catch (error) {
      toast.error('Ocorreu um erro ao criar.');
      setIsLoading(false);
    }
  }
  const formId = "addDisciplineInCourse"
  return (
    <FormDialog
      isLoading={isLoading}
      formId={formId}
      onClose={onClose}
      onConfirm={onConfirm}
      open={open}
      title="Adicionar disciplina"
    >
      <Formik initialValues={initialValues} validationSchema={disciplineAddSchema} onSubmit={onSubmitForm}>

        {({ values, handleBlur, handleChange, touched, errors, handleSubmit, setFieldValue }) => (

          <Form className='form pt-2 grid grid-cols-2 gap-3 max-w-md' id={formId} onSubmit={handleSubmit} >

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

              />
              <FormHelperText id="semester-helper-text">{touched.semester && errors.semester}</FormHelperText>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Optativa</InputLabel>
              <Select
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
              >

                {selectOptinalOptions.map(({ text }) => (
                  <MenuItem key={text} value={text}>
                    {text}
                  </MenuItem>
                ))}

              </Select>
              {touched.optional && errors.optional && (
                <div>{errors.optional}</div>
              )}
            </FormControl>

            <FormControl  >
              <InputLabel>Bibliografia</InputLabel>
              <OutlinedInput
                name="bibliography"
                label="Prerequisites"
                value={values.bibliography}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.bibliography && errors.bibliography && (
                <div>{errors.bibliography}</div>
              )}
            </FormControl>

            <FormControl>
              <InputLabel>Carga horária</InputLabel>
              <OutlinedInput
                name="hours"
                label="Carga horária"
                value={values.hours}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.hours && errors.hours && (
                <div>{errors.hours}</div>
              )}
            </FormControl>

            <FormControl >
              <InputLabel>Prerequisitos</InputLabel>
              <Select
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
                        clickable
                        deleteIcon={
                          <CancelIcon
                            onMouseDown={(event: any) => event.stopPropagation()}
                          />
                        }
                      // className={classes.chip}
                      // onDelete={(e) => handleDelete(e, value)}
                      // onClick={() => console.log("clicked chip")}
                      />
                    ))}
                  </div>
                )}

              >

                {disciplines.map(({ id, cod, name }) => (
                  <MenuItem key={id} value={cod} sx={{ maxWidth: 350 }} >
                    [{cod}] {name}
                  </MenuItem>
                ))}

              </Select>
              {touched.prerequisites && errors.prerequisites && (
                <div>{errors.prerequisites}</div>
              )}
            </FormControl>

          </Form>)}

      </Formik>

    </FormDialog>
  )
}