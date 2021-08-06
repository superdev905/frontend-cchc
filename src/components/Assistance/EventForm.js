import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Box, Grid, Typography } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import companiesActions from '../../state/actions/companies'
import { formatDate } from '../../formatters'
import { Dialog } from '../Shared'
import { TextArea, TextField } from '../UI'

const EventForm = ({ open, onClose, data }) => {
  const dispatch = useDispatch()
  const [selectedCompany, setSelectedCompany] = useState(null)
  const { user } = useSelector((state) => state.auth)
  const [companies, setCompanies] = useState([])

  const getHours = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString()
  }
  const onCompanySelect = (__, values) => {
    setSelectedCompany(values)
  }

  useEffect(() => {
    dispatch(companiesActions.getCompanies({}, false)).then((list) => {
      setCompanies(list)
    })
  }, [open])

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <Typography>Nuevo evento</Typography>
      <Box>{new Date(data.end).toLocaleDateString()}</Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography>
            Asignado a: {`${user?.names} ${user?.paternal_surname}`}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography>Tipo : {formatDate(data.start)}</Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Autocomplete
            options={companies}
            value={selectedCompany || ''}
            getOptionLabel={(option) => option.business_name}
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
        <Grid item xs={12} md={6}>
          <Autocomplete
            options={selectedCompany?.constructions || []}
            value={selectedCompany || ''}
            getOptionLabel={(option) => option.name}
            onChange={onCompanySelect}
            renderOption={(option) => (
              <Box>
                <Typography>
                  {`Nombre `}
                  <strong>{option.name}</strong>
                </Typography>
              </Box>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Selecciona obra"
                placeholder="Nombre de empresa"
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography>Fecha : {formatDate(data.start)}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography>Hora de inicio : {getHours(data.start)}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography>Hora de fin : {getHours(data.end)}</Typography>
        </Grid>
        <Grid item xs={12}>
          <TextArea label="Observaciones" />
        </Grid>
      </Grid>
    </Dialog>
  )
}

export default EventForm
