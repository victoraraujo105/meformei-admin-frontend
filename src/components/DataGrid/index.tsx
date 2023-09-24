"use client"
import Box from '@mui/material/Box';
import { DataGrid as DG, GridColDef } from '@mui/x-data-grid';


interface Props {
  rows: any[]
  columns: GridColDef[]
}

export default function DataGrid({rows, columns}: Props) {
  return (
    <Box sx={{ height: 500, width: '100%' }}>
      <DG
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
        sx={{
          boxShadow: 2,
          border: 1,
          borderColor: 'primary.light',
          '& .MuiDataGrid-cell:hover': {
            color: 'primary.main',
          },
        }}
      />
    </Box>
  );
}