import { useState, useEffect } from 'react'
import { Box, Grid, Typography } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment'
import constructionActions from '../../state/actions/constructions'
import { Dialog } from '../Shared'
import { Button, SubmitButton, TextField } from '../UI'
import AutocompleteVariable from './AutocompleteVariable'
import { useToggle } from '../../hooks'
import ReporteMensual from './ReporteMensual/ReporteMensual'
import assistanceActions from '../../state/actions/assistance'

const ReportDialog = ({ open, onClose, type }) => {
  const { isMobile } = useSelector((state) => state.ui)
  const { constructionByCompany } = useSelector((state) => state.constructions)
  const dispatch = useDispatch()
  const [selectedDate, setSelectedDate] = useState({
    start_date: '',
    end_date: ''
  })
  console.log(selectedDate)
  const [formData, setFormData] = useState({
    id: '',
    month: '',
    year: '',
    obras: []
  })
  const [years, setYears] = useState([])
  const [actualYear, setActualYear] = useState(2010)
  const [query, setQuery] = useState({ business_id: '', state: 'ACTIVE' })
  const { open: printMonthlyReport, toggleOpen: togglePrintMonthlyReport } =
    useToggle()

  const month = [
    { name: 'Enero', value: 1 },
    { name: 'Febrero', value: 2 },
    { name: 'Marzo', value: 3 },
    { name: 'Abril', value: 4 },
    { name: 'Mayo', value: 5 },
    { name: 'Junio', value: 6 },
    { name: 'Julio', value: 7 },
    { name: 'Agosto', value: 8 },
    { name: 'Septiembre', value: 9 },
    { name: 'Octubre', value: 10 },
    { name: 'Noviembre', value: 11 },
    { name: 'Diciembre', value: 12 }
  ]
  useEffect(() => {
    if (actualYear <= moment().year()) {
      setActualYear(actualYear + 1)
      setYears([...years, { value: actualYear }])
    }
  }, [years])

  const onSelectAutocomplete = (__, values) => {
    setFormData({
      ...formData,
      id: !values ? '' : values.id
    })
    setQuery({ business_id: !values ? '' : values.id, state: 'ACTIVE' })
  }

  useEffect(() => {
    if (open) {
      setFormData({
        id: '',
        month: '',
        year: '',
        obras: []
      })
    }
  }, [open])

  const fetchConstruction = () => {
    dispatch(constructionActions.getConstructionsCompany(query)).then(() => {})
  }

  useEffect(() => {
    fetchConstruction()
  }, [query])

  useEffect(() => {
    setFormData({ ...formData, obras: [] })
  }, [formData.id])

  const monthDays = () => {
    const first = new Date(
      parseInt(`${formData.year}`, 10),
      parseInt(`${formData.month}`, 10) - 1,
      1
    ).toISOString()
    const last = new Date(
      parseInt(`${formData.year}`, 10),
      parseInt(`${formData.month}`, 10),
      0
    ).toISOString()
    setSelectedDate({ ...selectedDate, start_date: first, end_date: last })
  }

  useEffect(() => {
    if (formData.month !== '' && formData.year !== '') {
      monthDays()
    }
  }, [formData.month, formData.year])

  useEffect(() => {
    if (formData.month && formData.year && formData.id) {
      dispatch(
        assistanceActions.getAllVisitReport(selectedDate, formData.id)
      ).then((data) => console.log(data))
    }
  }, [formData.month, formData.year, formData.id])

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
                <Autocomplete
                  options={month}
                  getOptionLabel={(option) => `${option.name}`}
                  onChange={(_, m) =>
                    setFormData({ ...formData, month: !m ? '' : m.value })
                  }
                  renderOption={(option) => (
                    <Box>
                      <Typography>
                        <strong>{option.name.toUpperCase()}</strong>
                      </Typography>
                    </Box>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Selecciona Mes"
                      placeholder="Mes"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Autocomplete
                  options={years}
                  getOptionLabel={(option) => `${option.value}`}
                  onChange={(_, y) =>
                    setFormData({ ...formData, year: !y ? '' : y.value })
                  }
                  renderOption={(option) => (
                    <Box>
                      <Typography>
                        <strong>{option.value}</strong>
                      </Typography>
                    </Box>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Selecciona Año"
                      placeholder="Año"
                    />
                  )}
                />
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <AutocompleteVariable
                type={type}
                onChange={onSelectAutocomplete}
              />
            </Grid>
            {formData.id && (
              <Grid item xs={12}>
                <Autocomplete
                  multiple
                  options={constructionByCompany}
                  getOptionLabel={(option) => `${option.name}`}
                  onChange={(_, y) => setFormData({ ...formData, obras: y })}
                  renderOption={(option) => (
                    <Box>
                      <Typography>
                        <strong>{option.name}</strong>
                      </Typography>
                    </Box>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Selecciona Obras"
                      placeholder="Obras"
                    />
                  )}
                />
              </Grid>
            )}
            <Box textAlign="center" marginTop="10px">
              <Button onClick={onClose} variant="outlined">
                Cancelar
              </Button>
              <SubmitButton
                onClick={togglePrintMonthlyReport}
                disabled={
                  !formData.id ||
                  !formData.month ||
                  !formData.year ||
                  formData.obras.length === 0
                }
              >
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
          year={formData.year}
          month={month[formData.month - 1].name}
        />
      )}
    </Dialog>
  )
}

export default ReportDialog
