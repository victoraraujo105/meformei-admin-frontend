import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface Props {
  content: string;
  handleClose: () => void;
  onConfirm: () => void;
  open: boolean;
  buttonDisabled?: boolean
  id?: string
}

export default function DialogConfirmation({ buttonDisabled, content, handleClose, onConfirm, open , id }: Props) {


  return (

    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Confirmar ação"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={handleClose}>Cancelar</Button>
        <Button variant="contained" id={id+"-submit"} onClick={onConfirm} disabled={buttonDisabled} autoFocus>
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
}