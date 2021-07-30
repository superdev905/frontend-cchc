import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Box, Grid, Typography } from '@material-ui/core'
import { useToggle } from '../../hooks'
import employeesActions from '../../state/actions/employees'
import { Button, EmptyState, Wrapper } from '../UI'
import HousingSituationForm from './HousingSituationForm'
import CardHousingSituation from './CardHousingSituation'
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
      employeesActions.createHousingSituation({
        ...values,
        employee_id: parseInt(idEmployee, 10)
      })
    )

  const updateSituation = (values) =>
    dispatch(
      employeesActions.updateHousingSituation(current.id, {
        ...current,
        ...values,
        employee_id: parseInt(idEmployee, 10)
      })
    )
  const patchSituation = (id) =>
    dispatch(
      employeesActions.patchHousingSituation(id, {
        state: 'DELETED'
      })
    )

  const fetchData = () => {
    dispatch(
      employeesActions.getHousingSituation({ employee_id: idEmployee })
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
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography style={{ fontSize: '19px', fontWeight: 'bold' }}>
            Situación habitacional
          </Typography>
          <Button onClick={toggleOpenAdd}>Registrar </Button>
        </Box>
      </Box>
      <Box>
        <Grid container spacing={2}>
          {list.length === 0 ? (
            <EmptyState message="Ese trabajador no tiene situacial habitacional" />
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
        </Grid>
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
