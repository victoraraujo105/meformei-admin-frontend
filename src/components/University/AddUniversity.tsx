import useToast from "@/hooks/useToast";
import useUniversity from "@/hooks/useUniversity";
import { Cidade, Estado, getCidadesPorEstado, getEstados } from "@/services/ibge.service";
import { FormControl, FormHelperText, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent } from "@mui/material";
import { useEffect, useState } from "react";
import FormDialog from "../Dialog/DialogForm";

import { useFormik } from "formik";
import { toast } from 'react-toastify';
import { UniversityBody, universityAddSchema } from "./validations";
interface Props {
  open: boolean
  onConfirm: () => void;
  onClose: () => void;
}
export default function AddUniversity({ open, onClose, onConfirm }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [states, setStates] = useState<Estado[]>([]);
  const [cities, setCities] = useState<Cidade[]>([]);
  const { toastRef, setToastRef } = useToast()
  const { createUniversity, universities } = useUniversity()

  useEffect(() => {
    setToastRef(toast)
    async function fetchEstados() {
      try {
        const response = await getEstados();
        setStates(response.data);
      } catch (error) {
        toast.error('Erro ao buscar estados');
      }
    }
    fetchEstados();
  }, [])

  const handleStateChange = async (event: SelectChangeEvent<string>) => {
    const state = event.target.value;
    formik.setFieldValue('state', state);
    formik.setFieldValue('city', '');

    if (state) {
      try {
        const response = await getCidadesPorEstado(`${state}`);
        setCities(response.data);
      } catch (error) {
        toast.error('Erro ao buscar cidades:');
      }
    } else {
      setCities([]);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      abv: "",
      city: "",
      state: "",
    },
    validationSchema: universityAddSchema,
    onSubmit: (values: UniversityBody) => onSubmitForm(values)
  });

  const onSubmitForm = async (values: UniversityBody) => {
    setIsLoading(true);
    const state = states.find((state) => state.id === values.state)
    const newData = state ? { ...values, state: state.nome } : null

    try {
      if (newData) {
        await createUniversity({ universityBody: newData })
        setTimeout(() => {
          toast.success('Universidade criada com sucesso!');
          setIsLoading(false);
          formik.resetForm()
          onClose
        }, 1000);

      } else {
        throw new Error()
      }

    } catch (error) {
      toast.error('Ocorreu um erro ao criar.');
      setIsLoading(false);
    }
  }
  const formId = "addUniversity"
  return (
    <FormDialog
      isLoading={isLoading}
      formId={formId}
      onClose={onClose}
      onConfirm={onConfirm}
      open={open}
      title="Adicionar universidade"
    >
      <form className='form mb-6 pt-2' id={formId} onSubmit={formik.handleSubmit} >
        <FormControl sx={{ mb: 3 }} fullWidth>
          <InputLabel htmlFor="name">Nome</InputLabel>
          <OutlinedInput
            id="name"
            label="Name"
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
          <InputLabel htmlFor="name">ABV</InputLabel>
          <OutlinedInput
            id="abv"
            label="Name"
            name="abv"
            aria-describedby="abv-helper-text"
            value={formik.values.abv}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.abv && Boolean(formik.errors.abv)}

          />
          <FormHelperText id="abv-helper-text">{formik.touched.abv && formik.errors.abv}</FormHelperText>
        </FormControl>

        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel id="demo-simple-select-label">Estado</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={formik.values.state}
            label="Estado"
            onChange={handleStateChange}
            name="state"
          >
            <MenuItem value="">
              <em>Selecione um estado</em>
            </MenuItem>
            {states.map((estado: any) => (
              <MenuItem key={estado.id} value={estado.id}>
                {estado.nome}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Cidade</InputLabel>
          <Select
            name="city"
            label="Cidade"
            value={formik.values.city}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={!formik.values.state}
          >
            <MenuItem value="">
              <em>Selecione uma cidade</em>
            </MenuItem>
            {cities.map((city) => (
              <MenuItem key={city.id} value={city.nome}>
                {city.nome}
              </MenuItem>
            ))}
          </Select>
          {formik.touched.city && formik.errors.city && (
            <div>{formik.errors.city}</div>
          )}
        </FormControl>



      </form>
    </FormDialog>
  )
}