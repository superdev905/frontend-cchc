import { useEffect, useState } from 'react'
import { Box, Grid, Typography } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import { useDispatch, useSelector } from 'react-redux'
import { DatePicker, Dialog } from '../Shared'
import companiesActions from '../../state/actions/companies'
import { Button, SubmitButton, TextField } from '../UI'

const ReportDialog = ({ open, onClose }) => {
  const dispatch = useDispatch()
  const { isMobile } = useSelector((state) => state.ui)
  const [companies, setCompanies] = useState([])
  const [selectedCompany, setSelectedCompany] = useState(null)

  const onCompanySelect = (__, values) => {
    setSelectedCompany(values)
  }

  useEffect(() => {
    dispatch(companiesActions.getCompanies({ state: 'CREATED' }, false)).then(
      (list) => {
        setCompanies(list)
      }
    )
  })
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
                <DatePicker label="Desde" required />
              </Grid>
              <Grid item xs={12} md={6}>
                <DatePicker label="Hasta" required />
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                options={companies}
                value={selectedCompany || ''}
                getOptionLabel={(option) => option.business_name || ''}
                onChange={onCompanySelect}
                renderOption={(option) => (
                  <Box>
                    <Typography>
                      {`Razón social: `}
                      <strong>{option.business_name}</strong>
                    </Typography>
                    <Typography>{`Rut: ${option.rut}`}</Typography>
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Selecciona empresa"
                    placeholder="Nombre de empresa"
                  />
                )}
              />
            </Grid>
            <Box textAlign="center" marginTop="10px">
              <Button onClick={onClose} variant="outlined">
                Cancelar
              </Button>
              <SubmitButton>Generar</SubmitButton>
            </Box>
          </Box>
        </Box>
      </Box>
    </Dialog>
  )
}

export default ReportDialog
