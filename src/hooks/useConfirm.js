import { useState } from 'react'
import { Button, Dialog, DialogActions, DialogContent } from '@material-ui/core'

const useConfirm = ({ message, onClose, onConfirm }) => {
  const [open, setOpen] = useState(false)

  const toggleOpen = () => {
    setOpen((prevState) => !prevState)
  }

  const ConfirmDialog = (
    <Dialog open={open} onClose={onClose}>
      <DialogContent>{message}</DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={onConfirm}>Aceptar</Button>
      </DialogActions>
    </Dialog>
  )

  return { open, toggleOpen, ConfirmDialog }
}

export default useConfirm
