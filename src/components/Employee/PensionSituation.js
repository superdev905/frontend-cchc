import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import { Box, Typography } from '@material-ui/core'
import { useSuccess, useToggle } from '../../hooks'
import employeesActions from '../../state/actions/employees'
import { Button, EmptyState, Wrapper } from '../UI'
import PensionSituationForm from './PensionSituationForm'
import CardPensionSituation from './CardPensionSituation'
import { ConfirmDelete } from '../Shared'

const PensionSituation = () => {
  const dispatch = useDispatch()
  const { idEmployee } = useParams()
  const [list, setList] = useState([])
  const { enqueueSnackbar } = useSnackbar()
  const { success, changeSuccess } = useSuccess()
  const [current, setCurrent] = useState(null)
  const { user } = useSelector((state) => state.auth)
  const { open: openAdd, toggleOpen: toggleOpenAdd } = useToggle()
  const { open: openEdit, toggleOpen: toggleOpenEdit } = useToggle()
  const { open: openDelete, toggleOpen: toggleOpenDelete } = useToggle()

  const fetchData = () => {
    dispatch(
      employeesActions.getPensionSituation({ employee_id: idEmployee })
    ).then((data) => {
      setList(data)
    })
  }

  const createSituation = (values) => {
    if (!values.pension_amount) {
      values.pension_amount = 0
    }
    return dispatch(
      employeesActions.createPensionSituation({
        ...values,
        employee_id: parseInt(idEmployee, 10),
        created_by: user.id
      })
    )
  }
  const updateSituation = (values) => {
    if (!values.pension_amount) {
      values.pension_amount = 0
    }
    return dispatch(
      employeesActions.updatePensionSituation(current.id, {
        state: current.state,
        is_main: current.is_main,
        ...values,
        employee_id: parseInt(idEmployee, 10),
        created_by: current.created_by
      })
    )
  }
  const patchSituation = (id) =>
    dispatch(
      employeesActions.patchPensionSituation(id, {
        state: 'DELETED'
      })
    )
      .then(() => {
        changeSuccess(true, () => {
          toggleOpenDelete()
          enqueueSnackbar('Situación previsional elimado exitosamente', {
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
          Situación previsional
        </Typography>
        <Button disabled={list.length > 0} onClick={toggleOpenAdd}>
          Registrar{' '}
        </Button>
      </Box>
      <Box>
        {list.length === 0 ? (
          <EmptyState message="Este trabajador no tiene una situación previsonal" />
        ) : (
          list.map((item) => (
            <CardPensionSituation
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
      <PensionSituationForm
        successMessage="Situación previsional creado"
        open={openAdd}
        onClose={toggleOpenAdd}
        submitFunction={createSituation}
        successFunction={fetchData}
      />
      {current && openEdit && (
        <PensionSituationForm
          type="UPDATE"
          successMessage="Situación previsional editado"
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
          success={success}
          onClose={toggleOpenDelete}
          onConfirm={() => patchSituation(current.id)}
          message={
            <Typography variant="h6">
              ¿Estás seguro de eliminar la situación previsional?
            </Typography>
          }
        />
      )}
    </Wrapper>
  )
}

PensionSituation.propTypes = {}

export default PensionSituation
