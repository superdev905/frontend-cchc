import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import { Box, Grid, Typography } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { FiPlus as AddIcon } from 'react-icons/fi'
import socialCasesActions from '../../../state/actions/socialCase'
import { ConfirmDelete, DataTable } from '../../Shared'
import { ActionsTable, Button, SearchInput, StatusChip } from '../../UI'
import PlanDialog from './Dialog'
import { useSuccess, useToggle } from '../../../hooks'
import { formatDate } from '../../../formatters'

const List = () => {
  const dispatch = useDispatch()
  const { socialCaseId } = useParams()
  const { enqueueSnackbar } = useSnackbar()
  const [loading, setLoading] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const { caseDetails } = useSelector((state) => state.socialCase)
  const [query, setQuery] = useState({
    size: 30,
    page: 1,
    search: '',
<<<<<<< HEAD
    socialCaseId
=======
    socialCaseId,
    user_id: user?.id,
    rol: user?.role.key
>>>>>>> 47444b9c986d6aa13b3d88bb8f8f557d79ba2ebc
  })
  const [currentTask, setCurrentTask] = useState(null)
  const { interventionPlans: list, totalInterventions: totalDocs } =
    useSelector((state) => state.socialCase)
  const { open: openAdd, toggleOpen: toggleOpenAdd } = useToggle()
  const { open: openEdit, toggleOpen: toggleOpenEdit } = useToggle()
  const { open: openDelete, toggleOpen: toggleOpenDelete } = useToggle()
  const { success, changeSuccess } = useSuccess()

  const createTask = (values) =>
    dispatch(
      socialCasesActions.createInterventionTask({ ...values, socialCaseId })
    )

  const editTask = (values) =>
    dispatch(
      socialCasesActions.updateInterventionTask(currentTask.id, {
        ...values,
        socialCaseId
      })
    )

  const deleteTask = () => {
    setDeleting(true)
    dispatch(socialCasesActions.deleteInterventionTask(currentTask.id))
      .then(() => {
        setDeleting(false)
        changeSuccess(true, () => {
          toggleOpenDelete()
          enqueueSnackbar('Tarea eliminada exitosamente', {
            variant: 'success'
          })
        })
      })
      .catch((err) => {
        setDeleting(false)
        enqueueSnackbar(err, { variant: 'error' })
      })
  }

  const fetchList = () => {
    setLoading(true)
    dispatch(
      socialCasesActions.getInterventionPlans({
        ...query,
        search: query.search.trim(),
        user_Id: caseDetails.employeeId
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
    if (caseDetails) {
      fetchList()
    }
  }, [query, caseDetails])
  return (
    <Box>
      <Box my={1}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={7} lg={5}>
            <SearchInput
              placeholder="Buscar por: Gestión, Responsable"
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
        progressPending={loading}
        columns={[
          {
            name: 'Fecha',
            selector: (row) => formatDate(row.nextDate)
          },
          {
            name: 'Gestión',
            selector: (row) => row.managementName
          },
          {
            name: 'Responsable',
            selector: (row) => row.professionalNames
          },
          {
            name: 'Frecuencia',
            selector: (row) => row.frequency
          },
          {
            name: 'Estado',
            selector: (row) => (
              <StatusChip
                success={row.isCompleted}
                error={!row.isCompleted}
                label={row.isCompleted ? 'Completado' : 'Pendiente'}
              />
            )
          },
          {
            right: true,
            selector: (row) => (
              <ActionsTable
                disableEdit={row.isCompleted === true}
                onEdit={() => {
                  toggleOpenEdit()
                  setCurrentTask(row)
                }}
                onDelete={() => {
                  setCurrentTask(row)
                  toggleOpenDelete()
                }}
              />
            )
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
          submitFunction={createTask}
        />
      )}
      {openEdit && currentTask && (
        <PlanDialog
          type="UPDATE"
          data={currentTask}
          open={openEdit}
          onClose={toggleOpenEdit}
          successMessage="Tarea actualizada exitosamente"
          submitFunction={editTask}
        />
      )}
      {openDelete && currentTask && (
        <ConfirmDelete
          open={openDelete}
          onConfirm={() => deleteTask(currentTask.id)}
          loading={deleting}
          success={success}
          message={
            <Box>
              <Typography variant="h6" align="center">
                ¿Estás seguro de eliminar esta tarea?
              </Typography>
              <Typography align="center">
                <strong>{currentTask.managementName}</strong>
              </Typography>
              <Typography align="center">
                {`Fecha: ${formatDate(currentTask.nextDate)}`}
              </Typography>
            </Box>
          }
          onClose={toggleOpenDelete}
        />
      )}
    </Box>
  )
}

export default List
