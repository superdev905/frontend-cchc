import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSnackbar } from 'notistack'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { Box, Typography } from '@material-ui/core'
import { Dialog } from '../../Shared'
import { TextField, SubmitButton } from '../../UI'
import questionActions from '../../../state/actions/questions'

const EditHoursModal = ({ open, onClose }) => {
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()
  const formik = useFormik({
    initialValues: {
      maxHours: ''
    },
    validationSchema: Yup.object({
      maxHours: Yup.string().required('El campo es Requerido')
    }),
    onSubmit: (values) => {
      try {
        dispatch(questionActions.setMaxHours(values)).then(() => {
          formik.setSubmitting(false)
          enqueueSnackbar('Horas Actualizada Correctamente', {
            variant: 'success'
          })
          dispatch(questionActions.getMaxHours())
        })
      } catch (error) {
        enqueueSnackbar(error, {
          variant: 'error'
        })
      }
      onClose()
    }
  })

  useEffect(() => {
    if (open) {
      formik.resetForm()
    }
  }, [open])
  return (
    <Dialog open={open} onClose={onClose} maxWidth={'lg'}>
      <Box>
        <Typography variant="h6" align="center">
          Actualizar Máximo de Horas
        </Typography>
        <Box p={2} display="flex" flexDirection="column" alignItems="center">
          <TextField
            label="Horas"
            name="maxHours"
            type="number"
            value={formik.values.maxHours}
            onChange={formik.handleChange}
            error={formik.touched.maxHours && Boolean(formik.errors.maxHours)}
            helperText={formik.touched.maxHours && formik.errors.maxHours}
            required
          />
          <SubmitButton
            loading={formik.isSubmitting}
            onClick={formik.handleSubmit}
          >
            Actualizar
          </SubmitButton>
        </Box>
      </Box>
    </Dialog>
  )
}

export default EditHoursModal
