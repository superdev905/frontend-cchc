import { Box, Grid, Typography } from '@material-ui/core'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import visitActions from '../../state/actions/assistance'
import { DatePicker, Dialog } from '../Shared'
import { Button, SubmitButton } from '../UI'

const ExportDialog = ({ open, onClose, range }) => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const { isMobile } = useSelector((state) => state.ui)
  const [exportData, setExportData] = useState({
    startDate: range?.start || new Date(),
    endDate: range?.end || new Date()
  })

  const handleDateChange = (type, newDate) => {
    const updateData = { ...exportData }

    updateData[type] = new Date(newDate)
    setExportData(updateData)
  }
  const onExport = () => {
    setLoading(true)
    dispatch(visitActions.exportVisits(exportData)).then(() => {
      setLoading(false)
    })
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth fullScreen={isMobile}>
      <Typography style={{ fontWeight: 'bold' }} variant="h6" align="center">
        Exportar visitas
      </Typography>
      <Box mt={3}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <DatePicker
              label={'Fecha de inicio'}
              value={exportData.startDate}
              onChange={(targetDate) =>
                handleDateChange('startDate', targetDate)
              }
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DatePicker
              label={'Fecha de fin'}
              value={new Date()}
              minDate={exportData.endDate}
              onChange={(targetDate) => handleDateChange('endDate', targetDate)}
            />
          </Grid>
        </Grid>
      </Box>
      <Box textAlign={'center'} mt={4}>
        <Button variant={'outlined'}>Cancelar</Button>
        <SubmitButton loading={loading} onClick={onExport}>
          Exportar
        </SubmitButton>
      </Box>
    </Dialog>
  )
}

export default ExportDialog
