import { useState } from 'react'
import { Box, Grid, Typography } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { formatDate, formatHours } from '../../../formatters'
import { Dialog } from '../../Shared'
import { TextArea, TextField } from '../../UI'

const BenefitDialog = ({ open, onClose }) => {
  const { isMobile } = useSelector((state) => state.ui)
  const [currentDate] = useState(new Date())
  return (
    <Dialog open={open} onClose={onClose} fullWidth fullScreen={isMobile}>
      <Box p={2}>
        <Typography>Nuevo beneficio</Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              label="Fecha"
              value={`${formatDate(currentDate)}, ${formatHours(currentDate)}`}
              inputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField rowsMin={2} label="Descripción del beneficio" required />
          </Grid>
          <Grid item xs={12}>
            <TextArea rowsMin={1} label="Nombre del beneficio" required />
          </Grid>
          <Grid item xs={12}>
            <TextArea rowsMin={2} label="Descripción del beneficio" required />
          </Grid>
        </Grid>
      </Box>
    </Dialog>
  )
}

export default BenefitDialog
