import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import { Box, Grid, Typography, makeStyles } from '@material-ui/core'
import { useSuccess, useToggle } from '../../hooks'
import employeesActions from '../../state/actions/employees'
import { Button, EmptyState } from '../UI'
import PensionSituationForm from './PensionSituationForm'
import CardPensionSituation from './CardPensionSituation'
import { ConfirmDelete } from '../Shared'

const useStyles = makeStyles(() => ({
  Grid: {
    textAlign: 'center'
  }
}))

const PensionSituation = () => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const { idEmployee } = useParams()
  const [list, setList] = useState([])
  const { enqueueSnackbar } = useSnackbar()
  const { success, changeSuccess } = useSuccess()
  const [current, setCurrent] = useState(null)
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
        employee_id: parseInt(idEmployee, 10)
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
        employee_id: parseInt(idEmployee, 10)
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
          enqueueSnackbar('Situación provisional elimado exitosamente', {
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
    <Box width="50%" component="div" display="inline" className={classes.Grid}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography style={{ fontSize: '19px', fontWeight: 'bold' }}>
          Situación provisional
        </Typography>
      </Box>
      <Box>
        <Grid container spacing={2}>
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
          <Button disabled={list.length > 0} onClick={toggleOpenAdd}>
            Registrar{' '}
          </Button>
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
          success={success}
          onClose={toggleOpenDelete}
          onConfirm={() => patchSituation(current.id)}
          message={
            <Typography variant="h6">
              ¿Estás seguro de eliminar la situación provisional?
            </Typography>
          }
        />
      )}
    </Box>
  )
}

PensionSituation.propTypes = {}

export default PensionSituation
