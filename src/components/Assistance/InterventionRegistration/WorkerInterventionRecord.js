import { useEffect } from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useSnackbar } from 'notistack'
import { useSelector, useDispatch } from 'react-redux'
import { Box, Grid, Typography } from '@material-ui/core'
import { DatePicker, Dialog } from '../../Shared'
import { Button, Select, SubmitButton, TextField } from '../../UI'
import commonActions from '../../../state/actions/common'
// import { decisionList } from '../../../config'

const validationSchema = Yup.object().shape({
  date: Yup.date().required('Seleccione fecha'),
  place: Yup.string().required('Ingrese lugar'),
  business_name: Yup.string().required('Ingrese empresa'),
  construction_name: Yup.string().required('Ingrese obra'),
  area: Yup.string().required('Seleccione area'),
  topic: Yup.string().required('Seleccione tema'),
  management: Yup.string().required('Seleccione gestión'),
  state: Yup.string().required('Seleccione estado'),
  business_report: Yup.string().required(),
  contact_method: Yup.number().required('Seleccione metodo de contacto'),
  social_case: Yup.string().required('Seleccione caso social'),
  case: Yup.number('Seleccione caso'),
  intervention_plan: Yup.string('Seleccione plan de intervención '),
  professional: Yup.string('Ingrese profesional'),
  observations: Yup.string('Ingrese observaciones')
})

const WorkerInterventionRecord = ({
  open,
  onClose,
  type,
  data,
  submitFunction,
  successMessage,
  successFunction
}) => {
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()
  const { nationalities, topicsList, managementList, areasList } = useSelector(
    (state) => state.common
  )
  const formik = useFormik({
    validateOnMount: true,
    validationSchema,
    initialValues: {
      date: type === 'UPDATE' ? data.date : '',
      place: type === 'UPDATE' ? data.place : '',
      business_name: type === 'UPDATE' ? data.business_name : '',
      construction_name: type === 'UPDATE' ? data.construction_name : '',
      area: type === 'UPDATE' ? data.area : '',
      topic: type === 'UPDATE' ? data.topic : null,
      management: type === 'UPDATE' ? data.management : '',
      state: type === 'UPDATE' ? data.state : '',
      business_report: type === 'UPDATE' ? data.business_report : '',
      contact_method: type === 'UPDATE' ? data.contact_method : '',
      social_case: type === 'UPDATE' ? data.social_case : '',
      case: type === 'UPDATE' ? data.case : '',
      intervention_plan: type === 'UPDATE' ? data.intervention_plan : '',
      professional: type === 'UPDATE' ? data.professional : '',
      observations: type === 'UPDATE' ? data.observations : ''
    },
    onSubmit: (values) => {
      submitFunction(values).then((result) => {
        formik.setSubmitting(false)
        enqueueSnackbar(successMessage, {
          variant: 'success',
          autoHideDuration: 1500
        })
        onClose()
        if (successFunction) {
          successFunction(result)
        }
      })
    }
  })

  useEffect(() => {
    dispatch(commonActions.getTopics())
    dispatch(commonActions.getManagement())
    dispatch(commonActions.getAreas())
    dispatch(commonActions.getNationalities())
  }, [])

  return (
    <Dialog open={open} onClose={onClose} maxWidth={'lg'}>
      <Box>
        <Typography variant="h6" align="center">
          {`${
            type === 'UPDATE' ? 'Actualizar' : 'Crear'
          } Registro de Intervención de personal`}
        </Typography>
        <Box p={2}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6} lg={3}>
              <DatePicker
                disabledFuture={false}
                label="Fecha"
                required
                value={formik.values.date}
                onChange={(dateSelected) => {
                  formik.setFieldValue('date', dateSelected)
                }}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <Select
                label="Lugar"
                name="place"
                required
                value={formik.values.place}
                onChange={formik.handleChange}
                error={formik.touched.place && Boolean(formik.errors.place)}
                helperText={formik.touched.place && formik.errors.place}
              >
                <option value="">Seleccione Lugar</option>
                {topicsList.map((item, i) => (
                  <option key={`place-${i}-${item.id}`} value={item.id}>
                    {item.description}
                  </option>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <Select
                label="Empresa"
                name="business_name"
                required
                value={formik.values.business_name}
                onChange={formik.handleChange}
                error={
                  formik.touched.business_name &&
                  Boolean(formik.errors.business_name)
                }
                helperText={
                  formik.touched.business_name && formik.errors.business_name
                }
              >
                <option value="">Seleccione empresa</option>
                {nationalities.map((item, i) => (
                  <option key={`company-${i}-${item.id}`} value={item.id}>
                    {item.description}
                  </option>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <Select
                label="Obra"
                name="construction_name"
                required
                value={formik.values.construction_name}
                onChange={formik.handleChange}
                error={
                  formik.touched.construction_name &&
                  Boolean(formik.errors.construction_name)
                }
                helperText={
                  formik.touched.construction_name &&
                  formik.errors.construction_name
                }
              >
                <option value="">Seleccione obra</option>
                {nationalities.map((item, i) => (
                  <option
                    key={`construction-name-${i}-${item.id}`}
                    value={item.id}
                  >
                    {item.description}
                  </option>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <Select
                label="Area"
                name="area"
                required
                value={formik.values.area}
                onChange={formik.handleChange}
                error={formik.touched.area && Boolean(formik.errors.area)}
                helperText={formik.touched.area && formik.errors.area}
              >
                <option value="">Seleccione Area</option>
                {areasList.map((item, i) => (
                  <option key={`area-${i}-${item.id}`} value={item.id}>
                    {item.description}
                  </option>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <Select
                label="Tema"
                name="topic"
                required
                value={formik.values.topic}
                onChange={formik.handleChange}
                error={formik.touched.topic && Boolean(formik.errors.topic)}
                helperText={formik.touched.topic && formik.errors.topic}
              >
                <option value="">Seleccione tema</option>
                {topicsList.map((item, i) => (
                  <option key={`topic-${i}-${item.id}`} value={item.id}>
                    {item.description}
                  </option>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <Select
                label="Gestión"
                name="management"
                required
                value={formik.values.management}
                onChange={formik.handleChange}
                error={
                  formik.touched.management && Boolean(formik.errors.management)
                }
                helperText={
                  formik.touched.management && formik.errors.management
                }
              >
                <option value="">Seleccione gestion</option>
                {managementList.map((item, i) => (
                  <option key={`management-${i}-${item.id}`} value={item.id}>
                    {item.description}
                  </option>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <Select
                label="Estado"
                name="state"
                required
                value={formik.values.state}
                onChange={formik.handleChange}
                error={formik.touched.state && Boolean(formik.errors.state)}
                helperText={formik.touched.state && formik.errors.state}
              >
                <option value="">Seleccione estado</option>
                {nationalities.map((item, i) => (
                  <option key={`state-${i}-${item.id}`} value={item.id}>
                    {item.description}
                  </option>
                ))}
              </Select>
            </Grid>

            <Grid container spacing={2} item xs={12} md={12} lg={12}>
              <Grid item xs={12} md={3} lg={3}>
                <Select
                  label="Informe Empresa"
                  name="business_report"
                  value={formik.values.business_report}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.business_report &&
                    Boolean(formik.errors.business_report)
                  }
                  helperText={
                    formik.touched.business_report &&
                    formik.errors.business_report
                  }
                >
                  <option value="">Seleccione informe de empresa</option>
                  {areasList.map((item, i) => (
                    <option
                      key={`business-report-${i}-${item}`}
                      value={item.id}
                    >
                      {item.description}
                    </option>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={12} md={3} lg={3}>
                <Select
                  label="Metodo de Contacto"
                  name="contact_method"
                  required
                  value={formik.values.contact_method}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.contact_method &&
                    Boolean(formik.errors.contact_method)
                  }
                  helperText={
                    formik.touched.contact_method &&
                    formik.errors.contact_method
                  }
                >
                  <option value="">Seleccione metodo de contacto</option>
                  {nationalities.map((item, i) => (
                    <option key={`contact-${i}-${item.id}`} value={item.id}>
                      {item.description}
                    </option>
                  ))}
                </Select>
              </Grid>
            </Grid>

            <Grid item xs={12} md={6} lg={3}>
              <Select
                label="Caso Social"
                name="social_case"
                required
                value={formik.values.social_case}
                onChange={formik.handleChange}
                error={
                  formik.touched.social_case &&
                  Boolean(formik.errors.social_case)
                }
                helperText={
                  formik.touched.social_case && formik.errors.social_case
                }
              >
                <option value="">Seleccione Caso Social</option>
                {topicsList.map((item, i) => (
                  <option key={`social-case-${i}-${item.id}`} value={item.id}>
                    {item.description}
                  </option>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Select
                label="Caso"
                name="case"
                value={formik.values.case}
                onChange={formik.handleChange}
                error={formik.touched.case && Boolean(formik.errors.case)}
                helperText={formik.touched.case && formik.errors.case}
              >
                <option value="">Seleccione caso</option>
                {['caso 1', 'caso 2', 'caso 3'].map((item, i) => (
                  <option key={`case-${i}-${item}`} value={item}>
                    {item}
                  </option>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Select
                label="Plan de Intervención"
                name="intervention_plan"
                value={formik.values.intervention_plan}
                onChange={formik.handleChange}
                error={
                  formik.touched.intervention_plan &&
                  Boolean(formik.errors.intervention_plan)
                }
                helperText={
                  formik.touched.intervention_plan &&
                  formik.errors.intervention_plan
                }
              >
                <option value="">Seleccione plan de intervención</option>
                {['Plan 1', 'Plan 2', 'Plan 3'].map((item, i) => (
                  <option key={`plan-${i}-${item}`} value={item}>
                    {item}
                  </option>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <TextField
                label="Profesional"
                name="professional"
                value={formik.values.professional}
                onChange={formik.handleChange}
                error={
                  formik.touched.professional &&
                  Boolean(formik.errors.professional)
                }
                helperText={
                  formik.touched.professional && formik.errors.professional
                }
              />
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <TextField
                label="Observaciones"
                name="observations"
                value={formik.values.observations}
                onChange={formik.handleChange}
                error={
                  formik.touched.observations &&
                  Boolean(formik.errors.observations)
                }
                helperText={
                  formik.touched.observations && formik.errors.observations
                }
              />
            </Grid>
          </Grid>
          <Box textAlign="center" marginTop="10px">
            <Button onClick={onClose} variant="outlined">
              Cancelar
            </Button>
            <SubmitButton
              onClick={formik.handleSubmit}
              disabled={!formik.isValid}
            >
              {`${type === 'UPDATE' ? 'Actualizar' : 'Crear'} Registro`}
            </SubmitButton>
          </Box>
        </Box>
      </Box>
    </Dialog>
  )
}

WorkerInterventionRecord.defaultProps = {
  type: 'CREATE'
}

export default WorkerInterventionRecord
