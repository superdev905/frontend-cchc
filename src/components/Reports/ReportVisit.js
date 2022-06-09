import { useState, useEffect } from 'react'
import { Box, Grid, Typography } from '@material-ui/core'
import { DatePicker, Dialog } from '../Shared'
import { Button, SubmitButton } from '../UI'
import AutocompleteVariable from './AutocompleteVariable'
import { useToggle } from '../../hooks'
import PrintModal from '../Visit/printModal/printModal'

const ReportDialog = ({ open, onClose, type }) => {
  const [formData, setFormData] = useState({
    id: '',
    startDate: '',
    endDate: ''
  })
  const { open: printVisit, toggleOpen: togglePrintVisit } = useToggle()

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
    <Dialog open={open} onClose={onClose}>
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
              <SubmitButton /*onClick={togglePrintVisit}*/>Generar</SubmitButton>
            </Box>
          </Box>
        </Box>
      </Box>
      {printVisit && (
        <PrintModal open={printVisit} onClose={togglePrintVisit} />
      )}
    </Dialog>
  )
}

export default ReportDialog
