import { useSelector, useDispatch } from 'react-redux'
import { useSnackbar } from 'notistack'
import { useHistory } from 'react-router-dom'
import { Box } from '@material-ui/core'
import { ArrowBack as BackIcon } from '@material-ui/icons'
import { Button, SubmitButton, EmptyState } from '../UI'
import { useToggle } from '../../hooks'
import useStyles from './styles'
import benefitsActions from '../../state/actions/benefits'
import Restrictions from './Restrictions'

const StepTwo = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()
  const { enqueueSnackbar } = useSnackbar()
  const { create } = useSelector((state) => state.benefits)
  const { open: openAdd, toggleOpen: toggleOpenAdd } = useToggle()

  const onCreate = () => {
    const data = {
      ...create.benefit,
      date: new Date()
    }
    if (create.type === 'CREATE') {
      dispatch(benefitsActions.createBenefit(data)).then(() => {
        dispatch(
          benefitsActions.updateCreate({
            ...create,
            step: create.step + 1
          })
        )
      })
      history.push('/benefits')
      enqueueSnackbar('Beneficio creado exitosamente', {
        autoHideDuration: 1500,
        variant: 'success'
      })
    } else {
      dispatch(benefitsActions.updatePostulation(create.benefit.id, data)).then(
        () => {
          enqueueSnackbar('Beneficio actualizado exitosamente', {
            autoHideDuration: 1500,
            variant: 'success'
          })
          dispatch(
            benefitsActions.updateCreate({
              ...create,
              step: create.step + 1
            })
          )
        }
      )
    }
  }

  const goBack = () => {
    dispatch(benefitsActions.updateCreate({ ...create, step: create.step - 1 }))
  }

  return (
    <Box className={classes.form}>
      <EmptyState
        message="No se agregarón restricciones"
        actionMessage="Agregar restricción"
        event={toggleOpenAdd}
      />
      <Box className={classes.actions}>
        <Button startIcon={<BackIcon />} variant="outlined" onClick={goBack}>
          Anterior
        </Button>

        <SubmitButton onClick={onCreate}>
          {create.type === 'UPDATE' ? 'Actualizar' : 'Crear'} Beneficio
        </SubmitButton>
      </Box>
      <Restrictions open={openAdd} onClose={toggleOpenAdd} />
    </Box>
  )
}

export default StepTwo
