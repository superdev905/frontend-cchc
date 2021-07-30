import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import { Box, Grid, Typography } from '@material-ui/core'
import { useToggle } from '../../hooks'
import employeesActions from '../../state/actions/employees'
import { Button, EmptyState, Wrapper } from '../UI'
import JobForm from './JobForm'
import CardJob from './CardJob'
import { ConfirmDelete } from '../Shared'

const PensionSituation = () => {
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()
  const { idEmployee } = useParams()
  const [list, setList] = useState([])
  const [current, setCurrent] = useState(null)
  const { open: openAdd, toggleOpen: toggleOpenAdd } = useToggle()
  const { open: openEdit, toggleOpen: toggleOpenEdit } = useToggle()
  const { open: openDelete, toggleOpen: toggleOpenDelete } = useToggle()

  const fetchData = () => {
    dispatch(
      employeesActions.getEmployeeJobs({ employee_id: idEmployee })
    ).then((data) => {
      setList(data)
    })
  }

  const createEvent = (values) =>
    dispatch(
      employeesActions.createEmployeeJob({
        ...values,
        employee_id: parseInt(idEmployee, 10)
      })
    )

  const updateEvent = (values) =>
    dispatch(
      employeesActions.updateEmployeeJob(current.id, {
        ...values,
        state: current.state,
        employee_id: parseInt(idEmployee, 10)
      })
    )
  const patchEvent = (id) => {
    dispatch(
      employeesActions.patchEmployeeJob(id, {
        state: 'DELETED'
      })
    ).then(() => {
      enqueueSnackbar('Especializacion eliminada', { variant: 'success' })
      fetchData()
      toggleOpenDelete()
    })
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <Wrapper>
      <Box>
        <Box display="flex" justifyContent="space-between">
          <Typography>Historial de trabajos</Typography>
          <Button onClick={toggleOpenAdd}>Nuevo trabajo </Button>
        </Box>
      </Box>
      <Box>
        <Grid container spacing={2}>
          {list.length === 0 ? (
            <EmptyState message="Este trabajador no tiene trabajos en su historial" />
          ) : (
            list.map((item) => (
              <CardJob
                key={`item-job-${item.id}`}
                data={item}
                onEdit={() => {
                  setCurrent(item)
                  toggleOpenEdit()
                }}
                onDelete={() => {
                  setCurrent(item)
                  toggleOpenDelete()
                }}
              />
            ))
          )}
        </Grid>
      </Box>
      <JobForm
        successMessage="Especialización creado"
        open={openAdd}
        onClose={toggleOpenAdd}
        submitFunction={createEvent}
        successFunction={fetchData}
      />
      {current && openEdit && (
        <JobForm
          type="UPDATE"
          successMessage="Especialización actualizado"
          open={openEdit}
          onClose={toggleOpenEdit}
          submitFunction={updateEvent}
          data={current}
          successFunction={fetchData}
        />
      )}
      {current && openDelete && (
        <ConfirmDelete
          open={openDelete}
          onClose={toggleOpenDelete}
          onConfirm={() => patchEvent(current.id)}
          message={
            <Typography variant="h6">
              ¿Estás seguro de eliminar esta especialización?
            </Typography>
          }
        />
      )}
    </Wrapper>
  )
}

PensionSituation.propTypes = {}

export default PensionSituation
