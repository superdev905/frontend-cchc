import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Box, Grid, Typography } from '@material-ui/core'
import { useToggle } from '../../hooks'
import employeesActions from '../../state/actions/employees'
import { Button, Wrapper } from '../UI'
import PensionSituationForm from './PensionSituationForm'
import CardPensionSituation from './CardPensionSituation'
import { ConfirmDelete } from '../Shared'

const PensionSituation = () => {
  const dispatch = useDispatch()
  const { idEmployee } = useParams()
  const [list, setList] = useState([])
  const [current, setCurrent] = useState(null)
  const { open: openAdd, toggleOpen: toggleOpenAdd } = useToggle()
  const { open: openEdit, toggleOpen: toggleOpenEdit } = useToggle()
  const { open: openDelete, toggleOpen: toggleOpenDelete } = useToggle()

  const createSituation = (values) =>
    dispatch(
      employeesActions.createPensionSituation({
        ...values,
        employee_id: parseInt(idEmployee, 10)
      })
    )

  const updateSituation = (values) =>
    dispatch(
      employeesActions.updatePensionSituation(current.id, {
        ...current,
        ...values,
        employee_id: parseInt(idEmployee, 10)
      })
    )
  const patchSituation = (id) =>
    dispatch(
      employeesActions.patchPensionSituation(id, {
        state: 'DELETED'
      })
    )

  const fetchData = () => {
    dispatch(
      employeesActions.getPensionSituation({ employee_id: idEmployee })
    ).then((data) => {
      setList(data)
    })
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <Wrapper>
      <Box>
        <Box display="flex" justifyContent="space-between">
          <Typography>Situación provisional</Typography>
          <Button onClick={toggleOpenAdd}>Registrar </Button>
        </Box>
      </Box>
      <Box>
        <Grid container spacing={2}>
          {list.map((item) => (
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
          ))}
        </Grid>
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
          onClose={toggleOpenDelete}
          onConfirm={() => patchSituation(current.id)}
          message={
            <Typography variant="h6">
              ¿Estás seguro de eliminar la situación provisional?
            </Typography>
          }
        />
      )}
    </Wrapper>
  )
}

PensionSituation.propTypes = {}

export default PensionSituation
