import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Box, Stepper, Step, StepLabel } from '@material-ui/core'
import moment from 'moment'
import { Dialog } from '../Shared'
import MonthlyReport from './MonthlyReport'
import UserReportModal from './UserReportModal'
import DifusionReportModal from './DifusionReportModal'
import ReporteMensual from './ReporteMensual/ReporteMensual'
import constructionActions from '../../state/actions/constructions'
import commonActions from '../../state/actions/common'
import assistanceActions from '../../state/actions/assistance'
import authActions from '../../state/actions/auth'
import { useToggle } from '../../hooks'

function getSteps() {
  return ['Empresa y obra', 'Áreas de mayor intervención', 'Difusión mensual']
}

function getStepContent(
  stepIndex,
  {
    onClose,
    setPrimerArea,
    setSegundaArea,
    setTercerArea,
    areaTerreno,
    type,
    togglePrintMonthlyReport,
    setDifusion,
    difusion,
    loading,
    nextStepper,
    setFormData,
    onSelectAutocomplete,
    onHandleBack,
    formData,
    month,
    years,
    primerArea,
    segundaArea,
    tercerArea
  }
) {
  switch (stepIndex) {
    case 0:
      return (
        <MonthlyReport
          onClose={onClose}
          type={type}
          loading={loading}
          nextStepper={nextStepper}
          setFormData={setFormData}
          onSelectAutocomplete={onSelectAutocomplete}
          areaTerreno={areaTerreno}
          formData={formData}
          month={month}
          years={years}
        />
      )
    case 1:
      return (
        <UserReportModal
          setPrimerArea={setPrimerArea}
          setSegundaArea={setSegundaArea}
          setTercerArea={setTercerArea}
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
          onHandleBack={onHandleBack}
          nextStepper={nextStepper}
          primerArea={primerArea}
          segundaArea={segundaArea}
          tercerArea={tercerArea}
        />
      )
    case 2:
      return (
        <DifusionReportModal
          togglePrintMonthlyReport={togglePrintMonthlyReport}
          setDifusion={setDifusion}
          difusion={difusion}
          onHandleBack={onHandleBack}
        />
      )
    default:
      return <span>Paso no encontrado</span>
  }
}

const ReportStepper = ({ open, onClose, type }) => {
  const { isMobile } = useSelector((state) => state.ui)
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
  const [stepper, setStepper] = useState(0)
  const steps = getSteps()
  const [loading, setLoading] = useState(true)
  const [topicIdTerreno, setTopicIdTerreno] = useState([])
  const [areaOficina, setAreaOficina] = useState([])
  const [totalAtencionesOficina, setTotalAtencionesOficina] = useState(0)
  const [totalConsultas, setTotalConsultas] = useState(0)
  const [topicIdOficina, setTopicIdOficina] = useState([])
  const [topicNameTerreno, setTopicNameTerreno] = useState([])
  const [topicNameOficina, setTopicNameOficina] = useState([])
  const [managementIdTerreno, setManagementIdTerreno] = useState([])
  const [managementIdOficina, setManagementIdOficina] = useState([])
  const [managementNameTerreno, setManagementNameTerreno] = useState([])
  const [managementNameOficina, setManagementNamaeOficina] = useState([])
  const [atencionesEmpresa, setAtencionesEmpresa] = useState([])
  const [folletoCharlaAfiche, setFolletoCharlaAfiche] = useState([])
  const [contador, setContador] = useState([])
  const [visitToCount, setVisitToCount] = useState([])
  const [contadorAsistencias, setContadorAsistencias] = useState([])
  const [contadorPersonas, setContadorPersonas] = useState([])
  const [totalPersonas, setTotalPersonas] = useState(0)
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
    dispatch(commonActions.getTopics())
  }, [])

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
      setStepper(0)
      setPrimerArea('')
      setSegundaArea('')
      setTercerArea('')
      setDifusion('')
      setAreaTerreno([])
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
      const asist = filteredVisits.map((visita) => ({
        visitId: visita.id,
        asistencias: 0
      }))
      setIdVisits(result)
      setVisitToCount(asist)
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
          setManagementIdTerreno(stadisticArea.management_id_terreno)
          setManagementIdOficina(stadisticArea.management_id_oficina)
          setAtencionesEmpresa(stadisticArea.companyReport)
          setTotalConsultas(stadisticArea.total_consultas)
          setContador(stadisticArea.personas_visitas)
          setLoading(false)
        }
      )
      dispatch(assistanceActions.getFolletoCharlaAfiche(idVisits)).then(
        (data) => setFolletoCharlaAfiche(data)
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

  useEffect(() => {
    if (managementIdTerreno.length > 0) {
      dispatch(commonActions.getManagementReportName(managementIdTerreno)).then(
        (data) => setManagementNameTerreno(data)
      )
    }
    if (managementIdOficina.length > 0) {
      dispatch(commonActions.getManagementReportName(managementIdOficina)).then(
        (data) => setManagementNamaeOficina(data)
      )
    }
  }, [managementIdTerreno, managementIdOficina])

  const onHandleBack = () => {
    setStepper(stepper > 0 ? stepper - 1 : stepper)
  }

  const nextStepper = () => {
    setStepper(stepper < steps.length ? stepper + 1 : stepper)
  }

  useEffect(() => {
    if (contador.length > 0 && visitToCount.length > 0) {
      const res = visitToCount.map((contAsis) => {
        let counter = {
          visitId: contAsis.visitId,
          asistencias: contAsis.asistencias
        }
        contador.map((cont) => {
          if (cont.visit_id === contAsis.visitId) {
            counter = {
              visitId: counter.visitId,
              asistencias: counter.asistencias + 1
            }
          }
          return null
        })
        return counter
      })
      setContadorAsistencias(res)
    }
  }, [contador, visitToCount])

  useEffect(() => {
    if (contador.length > 0 && visitToCount.length > 0) {
      const res = visitToCount.map((vis) => {
        const persona = { visitId: vis.visitId, persona: [] }
        contador.map((cont) => {
          if (cont.visit_id === vis.visitId) {
            if (persona.persona.length > 0) {
              const personaIn = persona.persona.filter(
                (p) => p === cont.persona
              )
              if (personaIn.length === 0) {
                persona.persona.push(cont.persona)
              }
              return persona
            }
            persona.persona.push(cont.persona)
            return persona
          }
          return null
        })
        return persona
      })
      setContadorPersonas(res)
    }
  }, [contador, visitToCount])

  useEffect(() => {
    if (contadorPersonas.length > 0) {
      let res = 0
      contadorPersonas.forEach((c) => {
        res += c.persona.length
      })
      setTotalPersonas(res)
    }
  }, [contadorPersonas])

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      fullScreen={isMobile}
      maxWidth={'lg'}
      onBack={onHandleBack}
    >
      <Box>
        <Stepper activeStep={stepper} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {getStepContent(stepper, {
          onClose,
          setPrimerArea,
          setSegundaArea,
          setTercerArea,
          areaTerreno,
          type,
          togglePrintMonthlyReport,
          setDifusion,
          difusion,
          loading,
          nextStepper,
          setFormData,
          onSelectAutocomplete,
          onHandleBack,
          formData,
          month,
          years
        })}
      </Box>
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
          managementNameTerreno={managementNameTerreno}
          managementNameOficina={managementNameOficina}
          folletoCharlaAfiche={folletoCharlaAfiche}
          atencionesEmpresa={atencionesEmpresa}
          totalConsultas={totalConsultas}
          primerArea={primerArea}
          segundaArea={segundaArea}
          tercerArea={tercerArea}
          contadorAsistencias={contadorAsistencias}
          contadorPersonas={contadorPersonas}
          totalPersonas={totalPersonas}
        />
      )}
    </Dialog>
  )
}

export default ReportStepper
