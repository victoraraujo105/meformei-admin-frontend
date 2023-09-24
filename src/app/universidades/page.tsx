"use client"
import DataGrid from "@/components/DataGrid";
import FormDialog from "@/components/Dialog/DialogForm";
import { UniversityBody, universityAddSchema } from "@/components/University/validations";
import useToast from "@/hooks/useToast";
import { Cidade, Estado, getCidadesPorEstado, getEstados } from "@/services/ibge.service";
import { UniversityService } from "@/services/univesity.service";
import { University } from "@/types";

import VisibilityIcon from '@mui/icons-material/Visibility';
import { Button, FormControl, FormHelperText, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent } from "@mui/material";
import { GridActionsCellItem, GridColDef, GridEventListener, GridRowEditStopReasons, GridRowId } from "@mui/x-data-grid";

import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { ToastContainer, toast } from 'react-toastify';

const rows: any[] = [];


export default function Page() {
  const [data, setData] = useState<University[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [openDialogForm, setOpenDialogForm] = useState<boolean>(false)
  const [states, setStates] = useState<Estado[]>([]);
  const [cities, setCities] = useState<Cidade[]>([]);
  const { toastRef, setToastRef } = useToast()
  const router = useRouter()

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'name',
      headerName: 'Nome',
      width: 150,
      flex: 1,
    },
    {
      field: 'abv',
      headerName: 'Abreviação',
      width: 150,

    },
    {
      field: 'city',
      headerName: 'Cidade',
      width: 110,
      flex: 1,
    },
    {
      field: 'state',
      headerName: 'Estado',
      width: 110,
      flex: 1,
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            key={"view"}
            icon={<VisibilityIcon />}
            label="Detalhes"
            onClick={handleRowViewClick(id)}
            color="inherit"
          />,
        ];
      },
    }
  ];

  const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };


  const handleRowViewClick = (id: GridRowId) => () => {
    router.push(`universidades/${id}`)
  };

  useEffect(() => {
    UniversityService.getUniversities().then((response) => setData(response.data.universities));
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
        const response = await UniversityService.postUnivesity(newData)
        setData((prev) => [...prev, response.data.university])

        setTimeout(() => {

          toast.success('Universidade criada com sucesso!');
          setOpenDialogForm(false)
          setIsLoading(false);
          formik.resetForm()
        }, 1000);

      } else {
        throw new Error()
      }

    } catch (error) {
      toast.error('Ocorreu um erro ao criar.');
      setIsLoading(false);
    }
  }

  const confirmAddUnviversity = () => {
    setOpenDialogForm(false)
  }

  const formId = "addUniversity"

  return (
    <>
      <ToastContainer />
      <DataGrid
        editMode="row"
        onRowEditStop={handleRowEditStop}
        rows={data ?? rows}
        columns={columns}
        key={"dg universidade"} />
      <Button sx={{ mt: 1 }} variant="contained" fullWidth onClick={() => setOpenDialogForm(true)}>Adicionar</Button>

      <FormDialog
        isLoading={isLoading}
        formId={formId}
        handleClose={() => setOpenDialogForm(false)}
        onConfirm={() => confirmAddUnviversity()}
        open={openDialogForm}
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
    </>

  )
}