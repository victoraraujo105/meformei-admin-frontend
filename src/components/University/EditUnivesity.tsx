"use client"
import { Button, FormControl, FormHelperText, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent } from '@mui/material';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';

import useToast from '@/hooks/useToast';
import useUniversity from '@/hooks/useUniversity';
import { Cidade, Estado, getCidadesPorEstado, getEstados } from '@/services/ibge.service';
import { University } from '@/types';
import { toast } from 'react-toastify';
import { universityEditSchema } from './validations';


interface Props {
  university: University
  onSave: () => void;
}

function EditUniversity({ university, onSave }: Props) {

  const [isLoading, setIsLoading] = useState(false)
  const [isChanged, setIsChanged] = useState(false)


  const [states, setStates] = useState<Estado[]>([]);
  const [cities, setCities] = useState<Cidade[]>([]);
  const [cityId, setCityId] = useState<Cidade>();
  const [stateId, setStateId] = useState<Estado>();
  const [isLoaded, setIsLoaded] = useState(false)
  const { toastRef } = useToast()
  const { updateUniversity } = useUniversity()

  async function fetchData() {
    try {
      const response = await getEstados();
      setStates(response.data);
      const findedState = response.data.find((state) => state.nome === university.state)
      if (findedState) {
        setStateId(findedState)
        formik.setValues((prev) => ({ ...prev, state: findedState?.id ?? "" }))
      }
      const responseTwo = await getCidadesPorEstado(`${findedState?.id}`)

      setCities(responseTwo.data)
      const findedCity = responseTwo.data.find((city) => city.nome === university.city)
      if (findedCity) {
        setCityId(findedCity)
        formik.setValues((prev) => ({ ...prev, city: findedCity?.id ?? "" }))
      }
      else {
        console.error('Cidade não encontrado:', university.city);
      }



    }
    catch (error) {
      toast.error('Erro ao buscar estados');
    }
    setIsLoaded(true)
  }

  useEffect(() => {
    fetchData();
  }, [university])

  const handleChange = () => {
    setIsChanged(true)
  }

  const formik = useFormik({
    initialValues: {
      name: university.name,
      abv: university.abv,
      city: "",
      state: "",
    },
    validationSchema: universityEditSchema,
    onSubmit: async (values) => {
      setIsLoading(true)

      const findedState = states.find((state) => state.id === values.state)
      const findedCity = cities.find((city) => city.id === values.city)

      let newData = { ...values, state: findedState?.nome ?? '' }
      newData = { ...newData, city: findedCity?.nome ?? '' }

      try {
        if (newData) {
          await updateUniversity({ id: university.id, data: newData })
          setTimeout(() => {
            if (toastRef.current) {
              toastRef.current.success('Dados atualizados com sucesso!');
            }
            setIsLoading(false)
            onSave()
            setIsChanged(false)
          }, 1000);

        } else {
          throw new Error()
        }


      } catch (error) {

        toast.error('Ocorreu um erro ao atualizar os dados.');
        formik.setErrors({ name: 'Houve um erro' }); // da pra tratar isso melhor
        setIsLoading(false)
      }
    },
  });


  const handleStateChange = async (event: SelectChangeEvent<string>) => {
    const state = event.target.value;
    formik.setFieldValue('state', state);
    formik.setFieldValue('city', '');

    if (state) {
      try {
        await getCidadesPorEstado(`${state}`).then((response) => {
          setCities(response.data)
          const findedCity = response.data.find((city) => city.nome === university.city)
          formik.setFieldValue("city", findedCity?.id)
        })

      } catch (error) {
        toast.error('Erro ao buscar cidades:');
      }
    } else {
      setCities([]);
    }
  };




  return (
    <>
      {university && isLoaded && (
        <div className='w-[32rem] mt-3'>
          <form onSubmit={formik.handleSubmit} onChange={handleChange}>
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
                id="select-state"
                value={formik.values.state}
                label="Estado"
                onChange={handleStateChange}
                name="state"
              >
                <MenuItem value="">
                  <em>Selecione um estado</em>
                </MenuItem>
                {states.map((estado) => (
                  <MenuItem key={estado.id} value={estado.id}>
                    {estado.nome}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth sx={{ mb: 3 }}>
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
                  <MenuItem key={city.id} value={city.id}>
                    {city.nome}
                  </MenuItem>
                ))}
              </Select>
              {formik.touched.city && formik.errors.city && (
                <div>{formik.errors.city}</div>
              )}
            </FormControl>

            <div className='flex justify-between '>

              <Button disabled={isLoading} className='w-[25%]' variant="outlined" onClick={() => onSave()}>voltar</Button>
              <Button disabled={isLoading || !isChanged} className='w-[25%]' variant="contained" type="submit">Salvar</Button>

            </div>

          </form>

        </div>
      )}
    </>
  );
}

export default EditUniversity;