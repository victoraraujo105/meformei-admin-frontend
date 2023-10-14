import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import * as React from 'react';

interface Props {
  title: string
  onClose: () => void;
  onConfirm: () => void;
  open: boolean;
  children: React.ReactNode
  formId: string;
  isLoading: boolean;
}
export default function FormDialog({ children, open, title, formId, isLoading, onClose, onConfirm }: Props) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>

        {/* formulario */}
        {children}

      </DialogContent>
      <DialogActions>
        <Button variant="outlined" disabled={isLoading} onClick={onClose}>Cancelar</Button>
        <Button variant="contained" disabled={isLoading} onClick={onConfirm} type='submit' form={formId}>Confirmar</Button>
      </DialogActions>
    </Dialog>

  );
}