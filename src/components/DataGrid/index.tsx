"use client"
import { IconButton, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import { DataGrid as DG, DataGridProps, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';

import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';

interface Props extends DataGridProps {
  columns: GridColDef[]
  height?: number
  toolbar?: React.ReactNode
  rows: GridRowsProp;
}

export default function DataGrid({ rows, columns, height, toolbar, ...props }: Props) {

  const [rowsData, setRowsData] = useState<GridRowsProp>([])

  const [searchText, setSearchText] = useState('');

  const [rowsProps, setRowsProps] = useState<GridRowsProp>([]);


  useEffect(() => {
    setRowsData(rows);
    setRowsProps(rows);
  }, [rows]);


  function escapeRegExp(value: string) {
    return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
  }

  const requestSearch = (searchValue: any) => {
    const searchRegex = new RegExp(escapeRegExp(searchValue), 'i');
    const filteredRows = rowsProps.filter((row) => {
      return Object.keys(row).some((field) => {
        return searchRegex.test(row[field].toString());
      });
    });
    setRowsData(filteredRows);
  };

  return (
    <Box sx={{ height: height ?? 500, width: '100%' }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <TextField
          variant="standard"
          autoComplete='off'
          value={searchText}
          onChange={(e) => { setSearchText(e.target.value); requestSearch(e.target.value) }}
          placeholder="Buscar..."
          InputProps={{
            startAdornment: <SearchIcon fontSize="small" color="action" />,
            endAdornment: (
              <IconButton
                title="Clear"
                aria-label="Clear"
                size="small"
                style={{ visibility: searchText ? 'visible' : 'hidden', borderRadius: "57%", paddingRight: "1px", margin: "0", fontSize: "1.25rem" }}
                onClick={(e) => { setSearchText(''); setRowsData(rows) }}
              >
                <ClearIcon fontSize="small" color="action" />
              </IconButton>
            ),
          }}
          sx={{
            width: { xs: 1, sm: 'auto' }, m: (theme) => theme.spacing(1, 0.5, 1.5),
            '& .MuiSvgIcon-root': {
              mr: 0.5,
            },
            '& .MuiInput-underline:before': {
              borderBottom: 1,
              borderColor: 'divider',
            },
          }}
        />
        {toolbar}
      </Box>
      <DG
        {...props}
        rows={rowsData ?? []}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 7,
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