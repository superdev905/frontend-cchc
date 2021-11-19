import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import { Box, Typography } from '@material-ui/core'
import { useSuccess, useToggle } from '../../hooks'
import employeesActions from '../../state/actions/employees'
import { Button, EmptyState, Wrapper } from '../UI'
import HousingSituationForm from './HousingSituationForm'
import CardHousingSituation from './CardHousingSituation'
import { ConfirmDelete } from '../Shared'

const PensionSituation = ({ employeeId }) => {
  const dispatch = useDispatch()
  const { idEmployee } = useParams()
  const { enqueueSnackbar } = useSnackbar()
  const { success, changeSuccess } = useSuccess()
  const [currentEmployeeId] = useState(idEmployee || employeeId)
  const [list, setList] = useState([])
  const [current, setCurrent] = useState(null)
  const { user } = useSelector((state) => state.auth)
  const { open: openAdd, toggleOpen: toggleOpenAdd } = useToggle()
  const { open: openEdit, toggleOpen: toggleOpenEdit } = useToggle()
  const { open: openDelete, toggleOpen: toggleOpenDelete } = useToggle()

  const fetchData = () => {
    dispatch(
      employeesActions.getHousingSituation({ employee_id: currentEmployeeId })
    ).then((data) => {
      setList(data)
    })
  }
  const createSituation = (values) =>
    dispatch(
      employeesActions.createHousingSituation({
        ...values,
        employee_id: parseInt(currentEmployeeId, 10),
        created_by: user.id
      })
    )

  const updateSituation = (values) =>
    dispatch(
      employeesActions.updateHousingSituation(current.id, {
        ...current,
        ...values,
        employee_id: parseInt(currentEmployeeId, 10),
        created_by: current.created_by
      })
    )
  const patchSituation = (id) =>
    dispatch(
      employeesActions.patchHousingSituation(id, {
        state: 'DELETED'
      })
    )
      .then(() => {
        changeSuccess(true, () => {
          toggleOpenDelete()
          enqueueSnackbar('Situación habitacional elimado exitosamente', {
            variant: 'success'
          })
          fetchData()
        })
      })
      .catch((err) => {
        enqueueSnackbar(err, {
          variant: 'error'
        })
      })

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <Wrapper>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography style={{ fontSize: '19px', fontWeight: 'bold' }}>
          Situación habitacional
        </Typography>
        <Button disabled={list.length > 0} onClick={toggleOpenAdd}>
          Registrar
        </Button>
      </Box>
      <Box>
        {list.length === 0 ? (
          <EmptyState message="Este trabajador no tiene situación habitacional" />
        ) : (
          list.map((item) => (
            <CardHousingSituation
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
      </Box>
      <HousingSituationForm
        successMessage="Situación habitacional creado"
        open={openAdd}
        onClose={toggleOpenAdd}
        submitFunction={createSituation}
        successFunction={fetchData}
      />
      {current && openEdit && (
        <HousingSituationForm
          type="UPDATE"
          successMessage="Situación habitacional editado"
          open={openEdit}
          onClose={toggleOpenEdit}
          submitFunction={updateSituation}
          data={current}
          successFunction={fetchData}
        />
      )}
      {current && openDelete && (
        <ConfirmDelete
          open={openDelete}
          onClose={toggleOpenDelete}
          success={success}
          onConfirm={() => patchSituation(current.id)}
          message={
            <Typography variant="h6">
              ¿Estás seguro de eliminar la situación habitacional?
            </Typography>
          }
        />
      )}
    </Wrapper>
  )
}

PensionSituation.propTypes = {}

export default PensionSituation
