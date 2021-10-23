import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useSnackbar } from 'notistack'
import { useHistory } from 'react-router-dom'
import { Box } from '@material-ui/core'
import { ArrowBack as BackIcon } from '@material-ui/icons'
import { Button, SubmitButton, EmptyState } from '../../UI'
import useStyles from '../styles'
import benefitsActions from '../../../state/actions/benefits'
import { useToggle } from '../../../hooks'
import Restrictions from '../Restrictions/Restrictions'
import RestrictionCard from '../../Restriction/Cards'

const StepTwo = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()
  const { enqueueSnackbar } = useSnackbar()
  const { create } = useSelector((state) => state.benefits)
  const { open: openAdd, toggleOpen: toggleOpenAdd } = useToggle()
  const { open: openEdit, toggleOpen: toggleOpenEdit } = useToggle()
  const [currentRes, setCurrentRes] = useState(null)
  const [currentType, setCurrentType] = useState('')

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

  const onEditClick = (type, values) => {
    setCurrentRes(values)
    setCurrentType(type)
    toggleOpenEdit()
  }

  return (
    <Box className={classes.form}>
      <EmptyState
        message="No se agregaron restricciones"
        actionMessage="Agregar restricción"
        event={toggleOpenAdd}
      />
      {create.benefit && create.benefit.businessRestriction && (
        <RestrictionCard
          type="BUSINESS"
          restriction={create.benefit.businessRestriction}
        />
      )}

      {create.benefit && create.benefit.generalRestriction && (
        <RestrictionCard
          type="GENERAL"
          restriction={create.benefit.generalRestriction}
          onEdit={() =>
            onEditClick('GENERAL', create.benefit.generalRestriction)
          }
        />
      )}

      <Box className={classes.actions}>
        <Button startIcon={<BackIcon />} variant="outlined" onClick={goBack}>
          Anterior
        </Button>

        <SubmitButton onClick={onCreate}>
          {create.type === 'UPDATE' ? 'Actualizar' : 'Crear'} Beneficio
        </SubmitButton>
      </Box>

      <Restrictions
        open={openAdd}
        onClose={toggleOpenAdd}
        // submitFunction={createDoc}
      />

      {currentRes && (
        <Restrictions
          type="UPDATE"
          currentStep={1}
          formType={currentType.toLowerCase()}
          open={openEdit}
          onClose={toggleOpenEdit}
          // submitFunction={createDoc}
        />
      )}
    </Box>
  )
}

export default StepTwo
