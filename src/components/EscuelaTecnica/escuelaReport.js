import { useState, useEffect } from 'react'
import { Box, Grid, Typography } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import { useSnackbar } from 'notistack'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import * as FileSaver from 'file-saver'
import * as XLSX from 'xlsx'
import { DatePicker, Dialog } from '../Shared'
import { Button, SubmitButton, TextField } from '../UI'
import IntegraEtcActions from '../../state/actions/integracionEtc'

const ReportDialog = ({ open, onClose, report }) => {
  const { isMobile } = useSelector((state) => state.ui)
  const [loading, setLoading] = useState(false)
  const { enqueueSnackbar } = useSnackbar()
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    start_date: '',
    end_date: '',
    month: '',
    year: ''
  })
  const [years, setYears] = useState([])
  const [actualYear, setActualYear] = useState(2019)
  const [disabled, setDisabled] = useState(true)
  const month = [
    { name: 'Enero', value: 'JANUARY' },
    { name: 'Febrero', value: 'FEBRUARY' },
    { name: 'Marzo', value: 'MARCH' },
    { name: 'Abril', value: 'APRIL' },
    { name: 'Mayo', value: 'MAY' },
    { name: 'Junio', value: 'JUNE' },
    { name: 'Julio', value: 'JULY' },
    { name: 'Agosto', value: 'AUGUST' },
    { name: 'Septiembre', value: 'SEPTEMBER' },
    { name: 'Octubre', value: 'OCTOBER' },
    { name: 'Noviembre', value: 'NOVEMBER' },
    { name: 'Diciembre', value: 'DECEMBER' }
  ]
  const fileType =
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
  const fileExtension = '.xlsx'

  const exportToCSV = (apiData, fileName, mssg) => {
    const ws = XLSX.utils.json_to_sheet(apiData)
    const wb = {
      Sheets: { data: ws },
      SheetNames: ['data']
    }
    const excelBuffer = XLSX.write(wb, {
      bookType: 'xlsx',
      type: 'array'
    })
    const informe = new Blob([excelBuffer], { type: fileType })
    FileSaver.saveAs(informe, fileName + fileExtension)
    setLoading(false)
    onClose()
    enqueueSnackbar(mssg, {
      variant: 'success'
    })
  }

  const getDocument = () => {
    setLoading(true)
    if (report.tag === 'course') {
      dispatch(IntegraEtcActions.getInformeCursos(formData)).then((data) => {
        if (data.message === 'No se encontraron registros.') {
          enqueueSnackbar(data.message, {
            variant: 'error'
          })
          setLoading(false)
        } else {
          exportToCSV(
            data.rows,
            `Informe Curso ${moment(formData.start_date).format(
              'DD-MM-YYYY'
            )} - ${moment(formData.end_date).format('DD-MM-YYYY')}`,
            data.message
          )
        }
      })
    }
    if (report.tag === 'company') {
      dispatch(IntegraEtcActions.getInformeEmpresas(formData)).then((data) => {
        if (data.message === 'No se encontraron registros.') {
          enqueueSnackbar(data.message, {
            variant: 'error'
          })
          setLoading(false)
        } else {
          exportToCSV(
            data.rows,
            `Informe Empresas ${moment(formData.start_date).format(
              'DD-MM-YYYY'
            )} - ${moment(formData.end_date).format('DD-MM-YYYY')}`,
            data.message
          )
        }
      })
    }
    if (report.tag === 'classesBook') {
      dispatch(IntegraEtcActions.getInformeLibroClases(formData)).then(
        (data) => {
          if (data.message === 'No se encontraron registros.') {
            enqueueSnackbar(data.message, {
              variant: 'error'
            })
            setLoading(false)
          } else {
            exportToCSV(
              data.rows,
              `Informe Libro Clases ${moment(formData.start_date).format(
                'DD-MM-YYYY'
              )} - ${moment(formData.end_date).format('DD-MM-YYYY')}`,
              data.message
            )
          }
        }
      )
    }
    if (report.tag === 'alumns') {
      dispatch(IntegraEtcActions.getInformeParticipantes(formData)).then(
        (data) => {
          if (data.message === 'No se encontraron registros.') {
            enqueueSnackbar(data.message, {
              variant: 'error'
            })
            setLoading(false)
          } else {
            exportToCSV(
              data.rows,
              `Informe Participantes ${moment(formData.start_date).format(
                'DD-MM-YYYY'
              )} - ${moment(formData.end_date).format('DD-MM-YYYY')}`,
              data.message
            )
          }
        }
      )
    }
    if (report.tag === 'all') {
      dispatch(IntegraEtcActions.getInformeConsolidado(formData)).then(
        (data) => {
          if (data.message === 'No se encontraron registros.') {
            enqueueSnackbar(data.message, {
              variant: 'error'
            })
            setLoading(false)
          } else {
            exportToCSV(
              data.rows,
              `Informe Consolidado ${formData.month} - ${formData.year}`,
              data.message
            )
          }
        }
      )
    }
  }

  const onSelectStartDate = (date) => {
    setFormData({
      ...formData,
      start_date: date.toISOString()
    })
  }

  const onSelectEndDate = (date) => {
    setFormData({
      ...formData,
      end_date: date.toISOString()
    })
  }

  useEffect(() => {
    if (open) {
      setFormData({
        start_date: '',
        end_date: '',
        month: '',
        year: ''
      })
    }
  }, [open])

  useEffect(() => {
    if (actualYear <= moment().year()) {
      setActualYear(actualYear + 1)
      setYears([...years, { value: actualYear }])
    }
  }, [years])

  useEffect(() => {
    if (
      report.tag !== 'all' &&
      (formData.start_date === '' || formData.end_date === '')
    ) {
      setDisabled(true)
    } else if (
      report.tag === 'all' &&
      (formData.month === '' || formData.year === '')
    ) {
      setDisabled(true)
    } else {
      setDisabled(false)
    }
  }, [formData])

  return (
    <Dialog open={open} onClose={onClose} fullWidth fullScreen={isMobile}>
      <Box>
        <Typography variant="h6" align="center" style={{ fontWeight: 'bold' }}>
          Generar Reporte
        </Typography>
        <Box p={2}>
          <Box>
            {report.tag === 'all' && (
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
                        label="Selecciona A??o"
                        placeholder="A??o"
                      />
                    )}
                  />
                </Grid>
              </Grid>
            )}
            {report.tag !== 'all' && (
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <DatePicker label="Desde" onChange={onSelectStartDate} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <DatePicker label="Hasta" onChange={onSelectEndDate} />
                </Grid>
              </Grid>
            )}
            <Box textAlign="center" marginTop="10px">
              <Button onClick={onClose} variant="outlined">
                Cancelar
              </Button>
              <SubmitButton
                onClick={getDocument}
                loading={loading}
                disabled={disabled}
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
