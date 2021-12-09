import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Box, Grid } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { FiPlus as AddIcon } from 'react-icons/fi'
import socialCasesActions from '../../../state/actions/socialCase'
import { DataTable } from '../../Shared'
import { ActionsTable, Button, SearchInput } from '../../UI'
import PlanDialog from './Dialog'
import { useToggle } from '../../../hooks'

const List = () => {
  const dispatch = useDispatch()
  const { socialCaseId } = useParams()
  const [loading, setLoading] = useState(false)
  const [query, setQuery] = useState({
    size: 30,
    page: 1,
    search: '',
    socialCaseId
  })
  const { interventionPlans: list, totalInterventions: totalDocs } =
    useSelector((state) => state.socialCase)
  const { open: openAdd, toggleOpen: toggleOpenAdd } = useToggle()

  const fetchList = () => {
    setLoading(true)
    dispatch(
      socialCasesActions.getInterventionPlans({
        ...query,
        search: query.search.trim()
      })
    )
      .then(() => {
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchList()
  }, [query])
  return (
    <Box>
      <Box my={1}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={7} lg={5}>
            <SearchInput
              placeholder="Buscar por: Gestión"
              value={query.search}
              onChange={(e) => setQuery({ ...query, search: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} md={5} lg={7}>
            <Box display="flex" justifyContent="flex-end">
              <Button onClick={toggleOpenAdd} startIcon={<AddIcon />}>
                Nueva tarea
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <DataTable
        emptyMessage={
          query.search
            ? `No se encontraron resultados para: ${query.search}`
            : 'Este caso no tiene tareas'
        }
        highlightOnHover
        pointerOnHover
        progressPending={loading}
        columns={[
          {
            name: 'Fecha',
            selector: (row) => row.nextDate
          },
          {
            name: 'Gestión',
            selector: (row) => row.managementName
          },
          {
            name: 'Responsable',
            selector: (row) => row.professionalName
          },
          {
            name: 'Frecuencia',
            selector: (row) => row.frequency
          },
          {
            right: true,
            cell: () => <ActionsTable onView={() => {}} />
          }
        ]}
        data={list}
        pagination
        paginationRowsPerPageOptions={[30, 40]}
        paginationPerPage={query.size}
        paginationServer={true}
        onChangeRowsPerPage={(limit) => {
          setQuery({ ...query, size: limit })
        }}
        onChangePage={(page) => {
          setQuery({ ...query, page })
        }}
        paginationTotalRows={totalDocs}
      />
      {openAdd && (
        <PlanDialog
          open={openAdd}
          onClose={toggleOpenAdd}
          successMessage="Tarea creada exitosamente"
        />
      )}
    </Box>
  )
}

export default List
