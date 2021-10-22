import { useState } from 'react'
import { useFormik } from 'formik'
import { useSnackbar } from 'notistack'
import { Box, Grid, Icon, makeStyles, Typography } from '@material-ui/core'
import {
  FaUserGraduate,
  FaAward,
  FaHome,
  FaCity,
  FaClipboardList
} from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { Button, SubmitButton } from '../../UI'
import { Dialog } from '../../Shared'
import { useSuccess } from '../../../hooks'

import benefitsActions from '../../../state/actions/benefits'

const useStyles = makeStyles(() => ({
  Box: {
    cursor: 'pointer',
    border: '2px solid grey',
    borderRadius: 7,
    padding: '7px',
    '&:hover': {
      backgroundColor: 'rgba(114, 115, 130, 0.11)'
    }
  }
}))

const Restrictions = ({
  open,
  onClose,
  type,
  data,
  submitFunction,
  successMessage,
  successFunction
}) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()
  const { success, changeSuccess } = useSuccess()
  const { isMobile } = useSelector((state) => state.ui)
  const { create } = useSelector((state) => state.benefits)
  const [step, setStep] = useState(0)
  const [currentType, setCurrentType] = useState()

  const RestrictionsTypes = [
    { name: 'General', type: 'GENERAL', icon: <FaClipboardList /> },
    { name: 'Beca', type: 'SCHOLARSHIP', icon: <FaAward /> },
    { name: 'Curso', type: 'COURSE', icon: <FaUserGraduate /> },
    { name: 'Empresa', type: 'BUSINESS', icon: <FaCity /> },
    { name: 'Vivienda', type: 'HOME', icon: <FaHome /> }
  ]

  const formik = useFormik({
    validateOnMount: true,
    initialValues: {
      code: type === 'UPDATE' ? data.code : ''
    },
    onSubmit: (values, { resetForm }) => {
      submitFunction({
        ...values,
        createDate: new Date().toISOString()
      })
        .then(() => {
          formik.setSubmitting(false)
          changeSuccess(true, () => {
            onClose()
            enqueueSnackbar(successMessage, {
              variant: 'success'
            })
            resetForm()
            if (successFunction) {
              successFunction()
            }
          })
        })
        .catch((err) => {
          formik.setSubmitting(false)
          enqueueSnackbar(err, {
            variant: 'error'
          })
        })
    }
  })

  const handleBack = () => {
    dispatch(benefitsActions.updateCreate({ ...create, step: create.step - 1 }))
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth={'md'} fullScreen={isMobile}>
      <Box>
        <Box p={2}>
          {step === 0 && (
            <>
              <Grid container spacing={2}>
                {RestrictionsTypes.map((item, index) => (
                  <Grid item xs={12} md={6} key={`${index}-restrictionCard`}>
                    <Box
                      onClick={() => {
                        setStep(1)
                        setCurrentType(item.type)
                      }}
                      display="flex"
                      alignItems="center"
                      className={classes.Box}
                    >
                      <Icon>{item.icon}</Icon>
                      <Typography>{item.name} </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </>
          )}

          {step === 1 && currentType}

          <Box textAlign="center" marginTop="10px">
            <Button onClick={onClose} variant="outlined">
              Cancelar
            </Button>
            <Button onClick={handleBack} variant="outlined">
              Volver
            </Button>
            <SubmitButton
              onClick={formik.handleSubmit}
              disabled={!formik.isValid || formik.isSubmitting}
              success={success}
            >
              {`${type === 'UPDATE' ? 'Actualizar' : 'Crear'} restricción`}
            </SubmitButton>
          </Box>
        </Box>
      </Box>
    </Dialog>
  )
}

Restrictions.defaultProps = {
  type: 'CREATE'
}

export default Restrictions
