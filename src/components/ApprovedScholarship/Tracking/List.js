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
          `${row.avgScoreFirstSemester} - ${row.avgScoreSecondSemester}`,
        sortable: true
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

const TrackingList = () => {
  const dispatch = useDispatch()
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const { approvedScholarship } = useSelector((state) => state.scholarships)

  const { open: openAdd, toggleOpen: toggleOpenAdd } = useToggle()

  const createTracking = (values) => {
    const { scholarshipType } = approvedScholarship.postulation
    const data = { ...values, approvedScholarshipId: approvedScholarship.id }

    if (scholarshipType.key === 'ACADEMIC_EXCELLENCE_SCHOLARSHIP')
      return dispatch(approvedActions.createBEATracking(data))
    return null
  }

  const fetchTrackingList = () => {
    setLoading(true)
    dispatch(
      approvedActions.getBEATrackingList({
        approvedId: approvedScholarship.id,
        scholarshipType: approvedScholarship.postulation.scholarshipType.key
      })
    )
      .then((res) => {
        setLoading(false)
        setItems(res.items)
      })
      .catch(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    if (approvedScholarship) {
      fetchTrackingList()
    }
  }, [approvedScholarship])

  return (
    <Box p={1}>
      <Box display="flex" justifyContent="space-between">
        <Typography>Seguimiento</Typography>
        <Button onClick={toggleOpenAdd}>Registrar</Button>
      </Box>
      <Box>
        <BEAList list={items} loading={loading} />
        {openAdd && approvedScholarship && (
          <TrackingDialog
            open={openAdd}
            onClose={toggleOpenAdd}
            scholarshipType={
              approvedScholarship.postulation.scholarshipType.key
            }
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
