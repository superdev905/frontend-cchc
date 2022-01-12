import { useSelector, useDispatch } from 'react-redux'
import { Box, Grid, Typography } from '@material-ui/core'
import { Button, Select, TextField } from '../../UI'
import { Dialog, DatePicker } from '../../Shared'

const CreateProtocol = ({ open, onClose, type }) => {
  const { isMobile } = useSelector((state) => state.ui)
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={'lg'}
      fullWidth
      fullScreen={isMobile}
    >
      <Box>
        <Typography
          align="center"
          style={{
            fontSize: '20px',
            marginBottom: '15px',
            fontWeight: 'bold'
          }}
        >{`${type === 'CREATE' ? 'Nuevo' : 'Editar'} protocolo`}</Typography>
        <Grid container spacing={1}>
          <Grid item xs={12} md={12}>
            <TextField label="Titulo" name="title" />
            <TextField label="Clasificación" name="clasification" />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <DatePicker label="Fecha inicio" />
          </Grid>
          <Grid item xs={12} md={6}>
            <DatePicker label="Fecha termino" />
          </Grid>
        </Grid>
        <Grid item xs={12} md={12}>
          <Select label="Modulos" name="modules">
            <option value="">SIN MODULO</option>
          </Select>
        </Grid>
      </Box>
    </Dialog>
  )
}

CreateProtocol.defaultProps = {
  type: 'CREATE'
}

export default CreateProtocol
