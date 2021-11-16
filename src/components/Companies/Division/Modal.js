import * as Yup from 'yup'
import toast, { Toaster } from 'react-hot-toast'
import { useFormik } from 'formik'
import { withRouter } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Grid, makeStyles } from '@material-ui/core'
import useSuccess from '../../../hooks/useSuccess'
import companyActions from '../../../state/actions/companies'
import {
  Heading,
  TextField,
  SubmitButton,
  Select,
  RutTextField
} from '../../UI'
import { Dialog } from '../../Shared'
import { decisionList } from '../../../config'

const validationSchema = Yup.object({
  rut: Yup.string().required('Ingrese rut'),
  name: Yup.string(),
  business_name: Yup.string().required('Ingrese razón social'),
  is_partner: Yup.string().required('Seleccion como empresa socia')
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
      business_name: type === 'UPDATE' ? division.business_name : '',
      is_partner: type === 'UPDATE' ? division.is_partner : ''
    },
    onSubmit: (values, { resetForm }) => {
      const data = { ...values, business_id: parseInt(idCompany, 10) }
      if (type === 'CREATE') {
        dispatch(companyActions.createDivision(data))
          .then(() => {
            formik.setSubmitting(false)
            changeSuccess(false)
            setTimeout(() => {
              resetForm()
              onClose()
            }, 500)
            dispatch(companyActions.getDivisions(idCompany))
          })
          .catch((err) => {
            formik.setSubmitting(false)
            notify(err.detail)
            changeSuccess(false)
          })
      } else {
        dispatch(companyActions.updateDivision(division.id, data))
          .then(() => {
            formik.setSubmitting(false)
            changeSuccess(false)
            setTimeout(() => {
              resetForm()
              onClose()
            }, 500)
            dispatch(companyActions.getDivisions(idCompany))
          })
          .catch((err) => {
            formik.setSubmitting(false)
            notify(err.detail)
            changeSuccess(false)
          })
      }
    }
  })

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullScreen={isMobile}>
      <Box>
        <Box>
          <Heading align="center">{`${
            type === 'CREATE' ? 'Nueva' : 'Actualizar'
          } División`}</Heading>
        </Box>
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <RutTextField
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
            <Grid item xs={12}>
              <Select
                label="Empresa socia"
                name="is_partner"
                value={formik.values.is_partner}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                helperText={
                  formik.touched.is_partner && formik.errors.is_partner
                }
                error={
                  formik.touched.is_partner && Boolean(formik.errors.is_partner)
                }
              >
                <option value="">SELECCIONE OPCIÓN</option>
                {decisionList.map((item, i) => (
                  <option key={`option-${i}`} value={item}>
                    {item}
                  </option>
                ))}
              </Select>
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
            {`${type === 'CREATE' ? 'Crear' : 'Actualizar'} división`}
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
