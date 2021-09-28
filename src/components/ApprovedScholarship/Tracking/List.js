import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Typography } from '@material-ui/core'
import approvedActions from '../../../state/actions/approvedScholarship'
import { useToggle } from '../../../hooks'
import { DataTable } from '../../Shared'
import { ActionsTable, Button } from '../../UI'
import TrackingDialog from './Dialog'
import { formatDate } from '../../../formatters'

const BEAList = ({ list, loading }) => (
  <DataTable
    progressPending={loading}
    emptyMessage={'Esta beca no tiene seguimientos registrados'}
    columns={[
      { name: 'Fecha', selector: (row) => formatDate(row.date) },
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
      },
      {
        right: true,
        selector: () => (
          <>
            <ActionsTable onDelete={() => {}} onEdit={() => {}} />
          </>
        )
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
      { name: 'Fecha', selector: (row) => formatDate(row.date) },
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
      },
      {
        right: true,
        selector: () => (
          <>
            <ActionsTable onDelete={() => {}} onEdit={() => {}} />
          </>
        )
      }
    ]}
    data={list}
  />
)

const PMAList = ({ list, loading }) => (
  <DataTable
    progressPending={loading}
    emptyMessage={'Esta beca no tiene seguimientos registrados'}
    columns={[
      { name: 'Fecha', selector: (row) => formatDate(row.date) },
      {
        name: 'Beneficio',
        selector: (row) => row.benefit.name
      },
      {
        name: 'Estado de beca',
        selector: (row) => row.scholarshipStatus
      },
      {
        right: true,
        selector: () => (
          <>
            <ActionsTable onDelete={() => {}} onEdit={() => {}} />
          </>
        )
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
    const data = {
      ...values,
      date: new Date().toISOString(),
      approvedScholarshipId: details.id
    }

    if (scholarshipType.key === 'ACADEMIC_EXCELLENCE_SCHOLARSHIP')
      return dispatch(approvedActions.createBEATracking(data))
    if (scholarshipType.key === 'BEST' || scholarshipType.key === 'BESH')
      return dispatch(approvedActions.createBeshBestTracking(data))
    return dispatch(approvedActions.createPMATracking(data))
  }

  const getAction = (type, query) => {
    if (type === 'ACADEMIC_EXCELLENCE_SCHOLARSHIP')
      return dispatch(approvedActions.getBEATrackingList(query))
    if (type === 'BEST' || type === 'BESH')
      return dispatch(approvedActions.getBeshBestrackingList(query))
    return dispatch(approvedActions.getPMATrackingList(query))
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
        {details && (
          <>
            {details.postulation.scholarshipType.key === 'BEST' ||
              (details.postulation.scholarshipType.key === 'BESH' && (
                <BeshBestList list={items} loading={loading} />
              ))}
            {details.postulation.scholarshipType.key ===
              'ACADEMIC_EXCELLENCE_SCHOLARSHIP' && (
              <BEAList list={items} loading={loading} />
            )}
            {details.postulation.scholarshipType.key === 'PMA' && (
              <PMAList list={items} loading={loading} />
            )}
          </>
        )}

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

export default TrackingList
