import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Typography } from '@material-ui/core'
import approvedActions from '../../../state/actions/approvedScholarship'
import { useToggle } from '../../../hooks'
import { DataTable } from '../../Shared'
import { Button } from '../../UI'
import TrackingDialog from './Dialog'

const BEAList = ({ list, loading }) => (
  <DataTable
    progressPending={loading}
    emptyMessage={'Esta beca no tiene seguimientos registrados'}
    columns={[
      {
        name: 'Año en curso',
        selector: (row) => row.levelInProgress
      },
      {
        name: 'Nivel en curso',
        selector: (row) => row.levelInProgress
      },
      {
        name: 'Promedios',
        selector: (row) =>
          `${row.avgScoreFirstSemester} - ${row.avgScoreSecondSemester}`
      },
      {
        name: 'Nombre de empresa',
        selector: (row) => row.businessName,
        hide: 'md'
      },
      {
        name: 'Empresa',
        selector: (row) => row.yearInProgress,
        hide: 'md'
      },
      {
        name: 'Actividad obligatoria',
        selector: (row) => row.mandatoryActivity,
        hide: 'md'
      },
      {
        name: 'Entrevista psicólogo',
        selector: (row) => row.psychologicalInterview,
        hide: 'md'
      }
    ]}
    data={list}
  />
)
const BeshBestList = ({ list, loading }) => (
  <DataTable
    progressPending={loading}
    emptyMessage={'Esta beca no tiene seguimientos registrados'}
    columns={[
      {
        name: 'Año en curso',
        selector: (row) => row.yearInProgress
      },
      {
        name: 'Nivel en curso',
        selector: (row) => row.levelInProgress
      },
      {
        name: 'Ramos totales',
        selector: (row) => row.totalCourses
      },
      {
        name: 'Ramos reprobados',
        selector: (row) => row.failedCourses,
        hide: 'md'
      },
      {
        name: 'Empresa',
        selector: (row) => row.businessName,
        hide: 'md'
      },
      {
        name: 'Estado de beca',
        selector: (row) => row.scholarshipStatus,
        hide: 'md'
      }
    ]}
    data={list}
  />
)

const TrackingList = () => {
  const dispatch = useDispatch()
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const { approvedScholarship: details } = useSelector(
    (state) => state.scholarships
  )

  const { open: openAdd, toggleOpen: toggleOpenAdd } = useToggle()

  const createTracking = (values) => {
    const { scholarshipType } = details.postulation
    const data = { ...values, details: details.id }

    if (scholarshipType.key === 'ACADEMIC_EXCELLENCE_SCHOLARSHIP')
      return dispatch(approvedActions.createBEATracking(data))
    if (scholarshipType.key === 'BEST' || scholarshipType.key === 'BESH')
      return dispatch(approvedActions.createBeshBestTracking(data))
    return null
  }

  const getAction = (type, query) => {
    if (type === 'ACADEMIC_EXCELLENCE_SCHOLARSHIP')
      return dispatch(approvedActions.getBEATrackingList(query))

    return dispatch(approvedActions.getBeshBestrackingList(query))
  }

  const fetchTrackingList = () => {
    const { scholarshipType } = details.postulation
    const query = {
      approvedId: details.id,
      scholarshipType: details.postulation.scholarshipType.key
    }
    setLoading(true)
    getAction(scholarshipType.key, query)
      .then((res) => {
        setLoading(false)
        setItems(res.items)
      })
      .catch(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    if (details) {
      fetchTrackingList()
    }
  }, [details])

  return (
    <Box p={1}>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography style={{ fontWeight: 'bold', fontSize: '18px' }}>
          Seguimiento
        </Typography>
        <Button onClick={toggleOpenAdd}>Registrar</Button>
      </Box>
      <Box>
        <BEAList list={items} loading={loading} />
        <BeshBestList list={items} loading={loading} />
        {openAdd && details && (
          <TrackingDialog
            open={openAdd}
            onClose={toggleOpenAdd}
            scholarshipType={details.postulation.scholarshipType.key}
            submitFunction={createTracking}
          />
        )}
      </Box>
    </Box>
  )
}

/**
 * approvedScholarshipId: 5
avgScoreFirstSemester: 4
avgScoreSecondSemester: 4
benefitId: 11
businessName: "Empres One"
levelInProgress: "I Semestre"
mandatoryActivity: "NO"
psychologicalInterview: "NO"
scholarshipStatus: "APROBADA"
yearInProgress: 2021
 */

export default TrackingList
