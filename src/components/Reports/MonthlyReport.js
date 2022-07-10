import { useState, useEffect } from 'react'
import { Box, Grid, Typography } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment'
import constructionActions from '../../state/actions/constructions'
import commonActions from '../../state/actions/common'
import { Dialog } from '../Shared'
import { Button, SubmitButton, TextField } from '../UI'
import AutocompleteVariable from './AutocompleteVariable'
import { useToggle } from '../../hooks'
import ReporteMensual from './ReporteMensual/ReporteMensual'
import assistanceActions from '../../state/actions/assistance'
import authActions from '../../state/actions/auth'
import UserReportModal from './UserReportModal'
import DifusionReportModal from './DifusionReportModal'

const ReportDialog = ({ open, onClose, type }) => {
  const { isMobile } = useSelector((state) => state.ui)
  const { constructionByCompany } = useSelector((state) => state.constructions)
  const dispatch = useDispatch()
  const [selectedDate, setSelectedDate] = useState({
    start_date: '',
    end_date: ''
  })
  const [visits, setVisits] = useState()
  const [filteredVisits, setFilteredVisits] = useState()
  const [idVisits, setIdVisits] = useState([])
  const [asistentes, setAsistentes] = useState([])
  const [areaTerreno, setAreaTerreno] = useState([])
  const [totalAtencionesTerreno, setTotalAtencionesTerreno] = useState(0)
  const [loading, setLoading] = useState(true)
  const [topicIdTerreno, setTopicIdTerreno] = useState([])
  const [areaOficina, setAreaOficina] = useState([])
  const [totalAtencionesOficina, setTotalAtencionesOficina] = useState(0)
  const [topicIdOficina, setTopicIdOficina] = useState([])
  const [topicNameTerreno, setTopicNameTerreno] = useState([])
  const [topicNameOficina, setTopicNameOficina] = useState([])
  const [formData, setFormData] = useState({
    id: '',
    month: '',
    year: '',
    obras: []
  })
  const [years, setYears] = useState([])
  const [primerArea, setPrimerArea] = useState('')
  const [segundaArea, setSegundaArea] = useState('')
  const [tercerArea, setTercerArea] = useState('')
  const [difusion, setDifusion] = useState('')
  const [actualYear, setActualYear] = useState(2010)
  const [query, setQuery] = useState({ business_id: '', state: 'ACTIVE' })
  const { open: printMonthlyReport, toggleOpen: togglePrintMonthlyReport } =
    useToggle()
  const { open: userReport, toggleOpen: toggleUserReport } = useToggle()
  const { open: difusionReport, toggleOpen: toggleDifusionReport } = useToggle()

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
    setLoading(true)
    dispatch(constructionActions.getConstructionsCompany(query)).then(() =>
      setLoading(false)
    )
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
    if (selectedDate && formData.id) {
      setLoading(true)
      dispatch(
        assistanceActions.getAllVisitReport(selectedDate, formData.id)
      ).then((data) => {
        setVisits(data)
        setLoading(false)
      })
    }
  }, [selectedDate, formData.id])

  useEffect(() => {
    if (visits && formData.obras.length > 0) {
      const result = visits.filter((visit) =>
        formData.obras.some((obra) => obra.id === visit.construction_id)
      )
      setFilteredVisits(result)
    }
  }, [visits, formData.obras])

  const fetchAssistantReport = () => {
    const values = {
      assistantId: filteredVisits
    }
    setLoading(true)
    dispatch(authActions.getAssistantReport(values)).then((data) => {
      setAsistentes(data)
      setLoading(false)
    })
  }

  useEffect(() => {
    if (filteredVisits) {
      fetchAssistantReport()
    }
  }, [filteredVisits])

  useEffect(() => {
    if (filteredVisits) {
      const result = filteredVisits.map((visita) => visita.id)
      setIdVisits(result)
    }
  }, [filteredVisits])

  useEffect(() => {
    if (idVisits.length > 0) {
      setLoading(true)
      dispatch(assistanceActions.ConsultAreaReport(idVisits)).then(
        (stadisticArea) => {
          setAreaTerreno(
            stadisticArea.terreno.length
              ? stadisticArea.terreno.sort((a, b) => {
                  if (a.total > b.total) {
                    return -1
                  }
                  if (a.total < b.total) {
                    return 1
                  }
                  return 0
                })
              : []
          )
          setAreaOficina(
            stadisticArea.oficina.length > 0
              ? stadisticArea.oficina.sort((a, b) => {
                  if (a.total > b.total) {
                    return -1
                  }
                  if (a.total < b.total) {
                    return 1
                  }
                  return 0
                })
              : []
          )
          setTotalAtencionesTerreno(stadisticArea.topic_ids_terreno.length)
          setTotalAtencionesOficina(stadisticArea.topic_ids_oficina.length)
          setTopicIdTerreno(stadisticArea.topic_ids_terreno)
          setTopicIdOficina(stadisticArea.topic_ids_oficina)
          setLoading(false)
        }
      )
    }
  }, [idVisits])

  useEffect(() => {
    if (topicIdTerreno.length > 0) {
      dispatch(commonActions.getTopicsReportName(topicIdTerreno)).then(
        (data) => {
          setTopicNameTerreno(
            data.result.sort((a, b) => {
              if (a.total > b.total) {
                return -1
              }
              if (a.total < b.total) {
                return 1
              }
              return 0
            })
          )
        }
      )
    }
    if (topicIdOficina.length > 0) {
      dispatch(commonActions.getTopicsReportName(topicIdOficina)).then(
        (data) => {
          setTopicNameOficina(
            data.result.sort((a, b) => {
              if (a.total > b.total) {
                return -1
              }
              if (a.total < b.total) {
                return 1
              }
              return 0
            })
          )
        }
      )
    }
  }, [topicIdTerreno, topicIdOficina])

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
                onClick={toggleUserReport}
                disabled={
                  loading ||
                  !formData.id ||
                  !formData.month ||
                  !formData.year ||
                  formData.obras.length === 0
                }
              >
                siguiente
              </SubmitButton>
            </Box>
          </Box>
        </Box>
      </Box>
      {userReport && (
        <UserReportModal
          setPrimerArea={setPrimerArea}
          setSegundaArea={setSegundaArea}
          setTercerArea={setTercerArea}
          open={userReport}
          onClose={toggleUserReport}
          closeAll={onClose}
          togglePrintMonthlyReport={toggleDifusionReport}
          firstLabel={
            areaTerreno && areaTerreno[0].total > 0 ? areaTerreno[0].name : null
          }
          secondLabel={
            areaTerreno && areaTerreno.length > 1 && areaTerreno[1].total > 0
              ? areaTerreno[1].name
              : null
          }
          thirdLabel={
            areaTerreno && areaTerreno.length > 2 && areaTerreno[2].total > 0
              ? areaTerreno[2].name
              : null
          }
        />
      )}
      {difusionReport && (
        <DifusionReportModal
          open={difusionReport}
          onClose={toggleDifusionReport}
          closeAll={onClose}
          togglePrintMonthlyReport={togglePrintMonthlyReport}
          setDifusion={setDifusion}
          difusion={difusion}
        />
      )}
      {printMonthlyReport && (
        <ReporteMensual
          open={printMonthlyReport}
          onClose={togglePrintMonthlyReport}
          year={formData.year}
          month={month[formData.month - 1].name}
          asistentes={asistentes}
          filteredVisits={filteredVisits}
          areaTerreno={areaTerreno}
          totalAtencionesTerreno={totalAtencionesTerreno}
          PrimerArea={primerArea}
          SegundaArea={segundaArea}
          TercerArea={tercerArea}
          totalAtencionesOficina={totalAtencionesOficina}
          areaOficina={areaOficina}
          topicNameTerreno={topicNameTerreno}
          topicNameOficina={topicNameOficina}
          difusion={difusion}
        />
      )}
    </Dialog>
  )
}

export default ReportDialog
