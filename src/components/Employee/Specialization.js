import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import { Box, Grid, Typography } from '@material-ui/core'
import { useToggle } from '../../hooks'
import employeesActions from '../../state/actions/employees'
import { Button, EmptyState, Wrapper } from '../UI'
import SpecForm from './SpecForm'
import CardSpecialization from './CardSpecialization'
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
      employeesActions.getSpecializationHistory({ employee_id: idEmployee })
    ).then((data) => {
      setList(data)
    })
  }

  const createEvent = (values) =>
    dispatch(
      employeesActions.createSpecialization({
        ...values,
        employee_id: parseInt(idEmployee, 10)
      })
    )

  const updateEvent = (values) =>
    dispatch(
      employeesActions.updateSpecialization(current.id, {
        ...values,
        certification_url: current.certification_url || '',
        state: current.state,
        employee_id: parseInt(idEmployee, 10)
      })
    )
  const patchEvent = (id) => {
    dispatch(
      employeesActions.patchSpecialization(id, {
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
          <Typography>Historial de especialidades</Typography>
          <Button onClick={toggleOpenAdd}>Registrar </Button>
        </Box>
      </Box>
      <Box>
        <Grid container spacing={2}>
          {list.length === 0 ? (
            <EmptyState message="Este trabajador no tiene especializaciones" />
          ) : (
            list.map((item) => (
              <CardSpecialization
                key={`item-housing-${item.id}`}
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
      <SpecForm
        successMessage="Especialización creado"
        open={openAdd}
        onClose={toggleOpenAdd}
        submitFunction={createEvent}
        successFunction={fetchData}
      />
      {current && openEdit && (
        <SpecForm
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
