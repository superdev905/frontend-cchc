import { useState, useEffect } from 'react'
import { Box, Grid, Typography } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { DatePicker, Dialog } from '../Shared'
import { Button, SubmitButton } from '../UI'
import AutocompleteVariable from './AutocompleteVariable'
import reportsActions from '../../state/actions/reports'

const ReportDialog = ({ open, onClose, type }) => {
  const { isMobile } = useSelector((state) => state.ui)
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    id: '',
    startDate: '',
    endDate: ''
  })

  const getDocument = () => {
    if (type === 'VISITS_COMPANY') {
      dispatch(reportsActions.getVisitsReportByCompany(formData))
      onClose()
    }
    if (type === 'ASSISTANCE_COMPANY') {
      dispatch(reportsActions.getAssistanceReportByCompany(formData))
      onClose()
    }
    if (type === 'VISITS_ASSIGNED') {
      dispatch(reportsActions.getVisitsReportByAssigned(formData))
      onClose()
    }
    if (type === 'ASSISTANCE_EMPLOYEE') {
      dispatch(reportsActions.getAssistanceReportByEmployee(formData))
      onClose()
    }
    if (type === 'ALL_VISITS') {
      delete formData.id
      dispatch(reportsActions.getVisitsReport(formData))
      onClose()
    }
  }

  const onSelectAutocomplete = (__, values) => {
    setFormData({
      ...formData,
      id: !values ? '' : values.id
    })
  }

  const onSelectStartDate = (date) => {
    setFormData({
      ...formData,
      startDate: date.toISOString()
    })
  }

  const onSelectEndDate = (date) => {
    setFormData({
      ...formData,
      endDate: date.toISOString()
    })
  }

  useEffect(() => {
    if (open) {
      setFormData({
        id: '',
        startDate: '',
        endDate: ''
      })
    }
  }, [open])

  return (
    <Dialog open={open} onClose={onClose} fullWidth fullScreen={isMobile}>
      <Box>
        <Typography variant="h6" align="center" style={{ fontWeight: 'bold' }}>
          Generar Reporte
        </Typography>
        <Box p={2}>
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <DatePicker label="Desde" onChange={onSelectStartDate} />
              </Grid>
              <Grid item xs={12} md={6}>
                <DatePicker label="Hasta" onChange={onSelectEndDate} />
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <AutocompleteVariable
                type={type}
                onChange={onSelectAutocomplete}
              />
            </Grid>
            <Box textAlign="center" marginTop="10px">
              <Button onClick={onClose} variant="outlined">
                Cancelar
              </Button>
              <SubmitButton
                onClick={getDocument}
                disabled={formData.id === '' && type !== 'ALL_VISITS'}
              >
                Generar
              </SubmitButton>
            </Box>
          </Box>
        </Box>
      </Box>
    </Dialog>
  )
}

export default ReportDialog
