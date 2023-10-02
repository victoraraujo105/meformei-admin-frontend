"use client"
import DataGrid from "@/components/DataGrid";
import { UniversityService } from "@/services/university.service";
import { University } from "@/types";

import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";


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
  }
];

const rows : any [] = [];


export default  function Page(){
  const [ data , setData ] = useState<University[]>()
  
  useEffect(() => {
    UniversityService.getUniversities().then((response) => setData(response.data.universities));
  },[])
  return(
    <DataGrid  rows={data ?? rows} columns={columns} key={"dg universidade"}/>   
  )
}