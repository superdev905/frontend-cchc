import { useState, useEffect } from 'react'
import { Box, Grid, Typography } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { Dialog } from '../Shared'
import { Button, SubmitButton } from '../UI'
import AutocompleteVariable from './AutocompleteVariable'
import { useToggle } from '../../hooks'
import ReporteMensual from './ReporteMensual/ReporteMensual'

const ReportDialog = ({ open, onClose, type }) => {
  const { isMobile } = useSelector((state) => state.ui)

  const [formData, setFormData] = useState({
    id: '',
    startDate: '',
    endDate: ''
  })
  const { open: printMonthlyReport, toggleOpen: togglePrintMonthlyReport } =
    useToggle()

  const onSelectAutocomplete = (__, values) => {
    setFormData({
      ...formData,
      id: !values ? '' : values.id
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
              <Grid item xs={12} md={6}></Grid>
              <Grid item xs={12} md={6}></Grid>
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
              <SubmitButton onClick={togglePrintMonthlyReport}>
                Generar
              </SubmitButton>
            </Box>
          </Box>
        </Box>
      </Box>
      {printMonthlyReport && (
        <ReporteMensual
          open={printMonthlyReport}
          onClose={togglePrintMonthlyReport}
        />
      )}
    </Dialog>
  )
}

export default ReportDialog
