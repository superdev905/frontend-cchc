import { Box } from '@material-ui/core'
import { formatDate } from '../../../formatters'
import { DataTable } from '../../Shared'
import { ActionsTable } from '../../UI'

const BEAList = ({ list, loading, onEdit, onDelete }) => (
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
        selector: (row) => (
          <>
            <ActionsTable
              onDelete={() => onDelete(row)}
              onEdit={() => onEdit(row)}
            />
          </>
        )
      }
    ]}
    data={list}
  />
)
const BeshBestList = ({ list, loading, onEdit, onDelete }) => (
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
        selector: (row) => (
          <>
            <ActionsTable
              onDelete={() => onDelete(row)}
              onEdit={() => onEdit(row)}
            />
          </>
        )
      }
    ]}
    data={list}
  />
)

const PMAList = ({ list, loading, onEdit, onDelete }) => (
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
        selector: (row) => (
          <>
            <ActionsTable
              onDelete={() => onDelete(row)}
              onEdit={() => onEdit(row)}
            />
          </>
        )
      }
    ]}
    data={list}
  />
)

const TableTracking = ({ loading, list, onDelete, onEdit, type }) => (
  <Box>
    {(type === 'BEST' || type === 'BESH') && (
      <BeshBestList
        list={list}
        loading={loading}
        onEdit={(item) => {
          onEdit(item)
        }}
        onDelete={(item) => {
          onDelete(item)
        }}
      />
    )}
    {type === 'ACADEMIC_EXCELLENCE_SCHOLARSHIP' && (
      <BEAList
        list={list}
        loading={loading}
        onEdit={(item) => {
          onEdit(item)
        }}
        onDelete={(item) => {
          onDelete(item)
        }}
      />
    )}
    {type === 'PMA' && (
      <PMAList
        list={list}
        loading={loading}
        onEdit={(item) => {
          onEdit(item)
        }}
        onDelete={(item) => {
          onDelete(item)
        }}
      />
    )}
  </Box>
)

export default TableTracking
