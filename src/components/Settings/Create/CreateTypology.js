import * as Yup from 'yup'
import toast, { Toaster } from 'react-hot-toast'
import { useFormik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Box, Grid } from '@material-ui/core'
import useSuccess from '../../../hooks/useSuccess'
import { Heading, TextField, SubmitButton } from '../../UI'
import constructionsActions from '../../../state/actions/constructions'
import { Dialog } from '../../Shared'

const validationSchema = Yup.object({
  name: Yup.string().required('Ingrese nombre')
})

const notify = (message) => toast.error(message)

const TypologyModal = ({ open, onClose, type, typology }) => {
  const { isMobile } = useSelector((state) => state.ui)
  const dispatch = useDispatch()
  const { success, changeSuccess } = useSuccess()

  const formik = useFormik({
    validateOnMount: true,
    enableReinitialize: true,
    validationSchema,
    initialValues: {
      name: type === 'UPDATE' ? typology.name : ''
    },
    onSubmit: (values, { resetForm }) => {
      const data = {
        name: values.name
      }
      if (type === 'CREATE') {
        dispatch(constructionsActions.createConstructionTypology(data))
          .then(() => {
            formik.setSubmitting(false)
            changeSuccess(false)
            setTimeout(() => {
              resetForm()
              dispatch(constructionsActions.getConstructionTypology())
              onClose()
            }, 500)
          })
          .catch((err) => {
            formik.setSubmitting(false)
            notify(err)
            changeSuccess(false)
          })
      } else {
        dispatch(
          constructionsActions.updateConstructionTypology(typology.id, data)
        )
          .then(() => {
            formik.setSubmitting(false)
            changeSuccess(false)
            setTimeout(() => {
              resetForm()
              dispatch(constructionsActions.getConstructionTypology())
              onClose()
            }, 500)
          })
          .catch((err) => {
            formik.setSubmitting(false)
            notify(err)
            changeSuccess(false)
          })
      }
    }
  })

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      fullScreen={isMobile}
    >
      <Box p={2}>
        <Box>
          <Heading align="center">
            {`${type === 'UPDATE' ? 'Editar' : 'Nueva'} tipología`}
          </Heading>
        </Box>
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Nombre"
                name="name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                helperText={formik.touched.name && formik.errors.name}
                error={formik.touched.name && Boolean(formik.errors.name)}
              />
            </Grid>
          </Grid>
        </Box>
        <Box textAlign="center">
          <SubmitButton
            onClick={formik.handleSubmit}
            success={success}
            loading={formik.isSubmitting}
            disabled={!formik.isValid}
          >
            {`${type === 'UPDATE' ? 'Actualizar' : 'Crear'} tipología`}
          </SubmitButton>
        </Box>
      </Box>

      <Toaster />
    </Dialog>
  )
}

TypologyModal.defaultProps = {
  type: 'CREATE'
}

export default withRouter(TypologyModal)
