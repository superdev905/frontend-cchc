import { Box, Grid, Typography } from '@material-ui/core'
import PropTypes from 'prop-types'
import { FullScreenDialog, TextField, Select } from '../../UI'
import useStyles from './styles'

const CreateDialog = ({ open, onClose }) => {
  const classes = useStyles()
  return (
    <FullScreenDialog open={open} onClose={onClose}>
      <Box className={classes.form}>
        <Box>
          <Typography align="center" variant="h6">
            Nueva empresa
          </Typography>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <Typography>Información de empresa</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField label="Rut" error={true} />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField label="Razón" />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField label="Nombre" />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField label="Correo" />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField label="Dirección" />
              </Grid>
              <Grid item xs={12} md={6}>
                <Select label="Comuna" />
              </Grid>
              <Grid item xs={12} md={6}>
                <Select label="Región" />
              </Grid>
              <Grid item xs={12} md={6}>
                Mapa
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField label="Teléfono" />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField label="Teléfono" />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField label="Teléfono" />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={5}>
            <Box p={2}>Mapa</Box>
          </Grid>
          <Typography>Otros Datos</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Select label="Tipo" />
            </Grid>
            <Grid item xs={12} md={4}>
              <Select label="Asociada" />
            </Grid>
            <Grid item xs={12} md={4}>
              <Select label="Asociada" />
            </Grid>
            <Grid item xs={12} md={4}>
              <Select label="Beneficio pyme" />
            </Grid>
            <Grid item xs={12} md={4}>
              <Select label="Empresa madre" />
            </Grid>
            <Grid item xs={12} md={4}>
              <Select label="Servicio social" />
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </FullScreenDialog>
  )
}

CreateDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func
}

export default CreateDialog
