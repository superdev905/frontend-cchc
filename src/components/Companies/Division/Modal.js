import * as Yup from 'yup'
import toast, { Toaster } from 'react-hot-toast'
import { useFormik } from 'formik'
import { withRouter } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Grid, makeStyles } from '@material-ui/core'
import useSuccess from '../../../hooks/useSuccess'
import companyActions from '../../../state/actions/companies'
import { Heading, TextField, SubmitButton } from '../../UI'
import { Dialog } from '../../Shared'

const validationSchema = Yup.object({
  rut: Yup.string().required('Ingrese rut'),
  name: Yup.string(),
  business_name: Yup.string().required('Ingrese razón social')
})
const useStyles = makeStyles(() => ({
  actions: {
    marginTop: 15,
    textAlign: 'center',
    '& button': {
      margin: 0
    }
  }
}))

const notify = (message) => toast.error(message)

const DivisionModal = ({ open, onClose, division, type, ...props }) => {
  const classes = useStyles()
  const { idCompany } = props.match.params
  const { isMobile } = useSelector((state) => state.ui)
  const dispatch = useDispatch()
  const { success, changeSuccess } = useSuccess()

  const formik = useFormik({
    validateOnMount: true,
    validationSchema,
    initialValues: {
      rut: type === 'UPDATE' ? division.rut : '',
      name: type === 'UPDATE' ? division.name : '',
      business_name: type === 'UPDATE' ? division.business_name : ''
    },
    onSubmit: (values, { resetForm }) => {
      const data = { ...values, business_id: parseInt(idCompany, 10) }
      dispatch(companyActions.createDivision(data))
        .then(() => {
          formik.setSubmitting(false)
          changeSuccess(false)
          setTimeout(() => {
            resetForm()
            onClose()
          }, 500)
        })
        .catch((err) => {
          formik.setSubmitting(false)
          notify(err.detail)
          changeSuccess(false)
        })
    }
  })

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullScreen={isMobile}>
      <Box>
        <Box>
          <Heading align="center">Nueva División</Heading>
        </Box>
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Rut"
                name="rut"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.rut}
                helperText={formik.touched.rut && formik.errors.rut}
                error={formik.touched.rut && Boolean(formik.errors.rut)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Razon social"
                name="business_name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.business_name}
                helperText={
                  formik.touched.business_name && formik.errors.business_name
                }
                error={
                  formik.touched.business_name &&
                  Boolean(formik.errors.business_name)
                }
                required
              />
            </Grid>
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
        <Box className={classes.actions}>
          <SubmitButton
            onClick={formik.handleSubmit}
            success={success}
            loading={formik.isSubmitting}
            disabled={!formik.isValid}
          >
            Crear división
          </SubmitButton>
        </Box>
      </Box>
      <Toaster />
    </Dialog>
  )
}

DivisionModal.defaultProps = {
  type: 'CREATE'
}

export default withRouter(DivisionModal)
