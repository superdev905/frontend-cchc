import { useSelector, useDispatch } from 'react-redux'
import { useSnackbar } from 'notistack'
import { useHistory } from 'react-router-dom'
import { Box } from '@material-ui/core'
import { ArrowBack as BackIcon } from '@material-ui/icons'
import { Button, SubmitButton, EmptyState } from '../../UI'
import useStyles from '../styles'
import benefitsActions from '../../../state/actions/benefits'

const StepTwo = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()
  const { enqueueSnackbar } = useSnackbar()
  const { create } = useSelector((state) => state.benefits)

  const onCreate = () => {
    const data = {
      ...create.benefit,
      description: '',
      isActive: true,
      createdDate: new Date()
    }
    if (create.type === 'CREATE') {
      dispatch(benefitsActions.createBenefit(data)).then(() => {
        dispatch(
          benefitsActions.updateCreate({
            ...create,
            step: create.step + 2
          })
        )
      })
      history.push('/benefits')
      enqueueSnackbar('Beneficio creado exitosamente', {
        autoHideDuration: 1500,
        variant: 'success'
      })
    } else {
      dispatch(benefitsActions.updateBenefit(create.benefit.id, data)).then(
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

  const handleNext = () => {
    dispatch(benefitsActions.updateCreate({ ...create, step: create.step + 1 }))
  }

  return (
    <Box className={classes.form}>
      <EmptyState
        message="No se agregaron restricciones"
        actionMessage="Agregar restricción"
        event={handleNext}
      />
      <Box className={classes.actions}>
        <Button startIcon={<BackIcon />} variant="outlined" onClick={goBack}>
          Anterior
        </Button>

        <SubmitButton onClick={onCreate}>
          {create.type === 'UPDATE' ? 'Actualizar' : 'Crear'} Beneficio
        </SubmitButton>
      </Box>
    </Box>
  )
}

export default StepTwo
