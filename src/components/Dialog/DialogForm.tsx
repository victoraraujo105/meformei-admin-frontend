import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface Props {
  title: string
  handleClose: () => void;
  onConfirm: () => void;
  open: boolean;
  children: React.ReactNode
  formId: string;
  isLoading: boolean;
}
export default function FormDialog({ children, open, title, formId, isLoading, handleClose, onConfirm }: Props) {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>

        {/* formulario */}
        {children}

      </DialogContent>
      <DialogActions>
        <Button variant="outlined" disabled={isLoading} onClick={handleClose}>Cancelar</Button>
        <Button variant="contained" disabled={isLoading} onClick={handleClose} type='submit' form={formId}>Confirmar</Button>
      </DialogActions>
    </Dialog>

  );
}