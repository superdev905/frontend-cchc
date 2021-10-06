import { Box, Grid, Typography } from '@material-ui/core'
import { useState } from 'react'
import { FiUpload } from 'react-icons/fi'
import { formatDate } from '../../../formatters'
import { Dialog, FilePicker } from '../../Shared'
import { TextField } from '../../UI'

const PaymentDialog = ({ open, onClose }) => {
  const [currentDate] = useState(new Date())
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="lg">
      <Box>
        <Box>
          <Typography align="center" style={{ marginBottom: '15px' }}>
            Registrar pago OTEC
          </Typography>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12} m={6} lg={4}>
            <TextField value={formatDate(currentDate)} label="Fecha" />
          </Grid>
          <Grid item xs={12} m={6} lg={4}>
            <TextField label="Número de factura" />
          </Grid>
          <Grid item xs={12} m={6} lg={4}>
            <TextField label="Número OC" />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} m={6} lg={4}>
            <Typography>Adjunto de factura</Typography>
            <FilePicker
              acceptedFiles={['.pdf']}
              onChange={(e) => {
                console.log(e)
              }}
              icon={<FiUpload fontSize="24px" />}
            />
          </Grid>
          <Grid item xs={12} m={6} lg={4}>
            <Typography>Adjunto de OC</Typography>
            <FilePicker
              acceptedFiles={['.pdf']}
              onChange={(e) => {
                console.log(e)
              }}
              icon={<FiUpload fontSize="24px" />}
            />
          </Grid>
          <Grid item xs={12} m={6} lg={4}>
            <Typography>Convenio</Typography>
            <FilePicker
              acceptedFiles={['.pdf']}
              onChange={(e) => {
                console.log(e)
              }}
              icon={<FiUpload fontSize="24px" />}
            />
          </Grid>
        </Grid>
      </Box>
    </Dialog>
  )
}

export default PaymentDialog
