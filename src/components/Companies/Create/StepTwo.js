import * as Yup from 'yup'
import { useFormik } from 'formik'
import toast, { Toaster } from 'react-hot-toast'
import { useSelector, useDispatch } from 'react-redux'
import { Box, Grid, Typography } from '@material-ui/core'
import { ArrowBack as BackIcon } from '@material-ui/icons'
import useSuccess from '../../../hooks/useSuccess'
import useToggle from '../../../hooks/useToggle'
import companiesActions from '../../../state/actions/companies'
import { Button, Select, SubmitButton } from '../../UI'
import useStyles from './styles'
import CreateModal from '../../Contacts/CreateModal'
import { businessTypes, decisionList } from '../../../config'

const validationSchema = Yup.object({
  type: Yup.string().required('Seleccione tipo'),
  is_partner: Yup.string().required('Seleccione empresa socia'),
  social_service: Yup.string().required('Seleccione opción'),
  benefit_pyme: Yup.string(),
  parent_business_id: Yup.string()
})

const notify = (message) => toast.error(message)

const StepOne = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { success, changeSuccess } = useSuccess()
  const { open, toggleOpen } = useToggle()
  const { create } = useSelector((state) => state.companies)

  const formik = useFormik({
    validationSchema,
    initialValues: {
      type: '',
      is_partner: '',
      benefit_pyme: 'NO',
      social_service: '',
      social: ''
    },
    onSubmit: (values) => {
      const {
        rut,
        name,
        region,
        commune,
        email,
        address,
        phone,
        phone1,
        phone2
      } = create.company
      const data = {
        rut,
        name,
        email,
        business_name: create.company.businessName,
        address,
        phone,
        phone1,
        phone2,
        region_id: region,
        commune_id: commune,
        ...values
      }
      dispatch(companiesActions.createCompany(data))
        .then(() => {
          formik.setSubmitting(false)
          changeSuccess(true)
          dispatch(
            companiesActions.updateCreate({ ...create, step: create.step + 1 })
          )
        })
        .catch((err) => {
          notify(err.detail)
          formik.setSubmitting(false)
        })
    }
  })
  const goBack = () => {
    dispatch(
      companiesActions.updateCreate({ ...create, step: create.step - 1 })
    )
  }
  return (
    <Box className={classes.form}>
      <Typography className={classes.subtitle} align="center">
        Otros datos
      </Typography>
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Select
              label="Tipo de empresa"
              name="type"
              onChange={formik.handleChange}
              value={formik.values.type}
              required
            >
              <option value="">Seleccione tipo</option>
              {businessTypes.map((item, i) => (
                <option key={`business-type-${i}`} value={item.key}>
                  {item.name}
                </option>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12} md={6}>
            <Select label="Empresa madre" name="businessMain">
              <option>Seleccione empresa</option>
            </Select>
          </Grid>
          <Grid item xs={12} md={6}>
            <Select
              label="Asociada"
              name="is_partner"
              onChange={formik.handleChange}
              value={formik.values.is_partner}
              required
            >
              <option value="">Seleccione tipo</option>
              {decisionList.map((item, i) => (
                <option key={`option-${i}`} value={item}>
                  {item}
                </option>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12} md={6}>
            <Select
              label="Beneficio Pyme"
              name="benefit_pyme"
              onChange={formik.handleChange}
              value={formik.values.benefit_pyme}
            >
              {decisionList.map((item, i) => (
                <option key={`pyme-option-${i}`} value={item}>
                  {item}
                </option>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12} md={6}>
            <Select
              label="Servicio Social"
              name="social_service"
              onChange={formik.handleChange}
              value={formik.values.social_service}
              required
            >
              <option value="">Seleccione una opción</option>
              {decisionList.map((item, i) => (
                <option key={`social-option-${i}`} value={item}>
                  {item}
                </option>
              ))}
            </Select>
          </Grid>
        </Grid>
      </Box>
      <Box className={classes.actions}>
        <Button startIcon={<BackIcon />} variant="outlined" onClick={goBack}>
          Anterior
        </Button>
        <SubmitButton
          loading={formik.isSubmitting}
          onClick={formik.handleSubmit}
          success={success}
          disabled={!formik.isValid || formik.isSubmitting}
        >
          Crear empresa
        </SubmitButton>
      </Box>
      <CreateModal open={open} onClose={toggleOpen} />
      <Toaster />
    </Box>
  )
}

export default StepOne
