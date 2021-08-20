import { useEffect, useState } from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useSnackbar } from 'notistack'
import { useSelector, useDispatch } from 'react-redux'
import {
  Box,
  Grid,
  Typography,
  FormControlLabel,
  Radio,
  Avatar
} from '@material-ui/core'
import { DatePicker, Dialog, FilePicker } from '../../Shared'
import {
  Button,
  Select,
  SubmitButton,
  TextField,
  InputLabel,
  TextArea
} from '../../UI'
import commonActions from '../../../state/actions/common'
import { AttentionStatus } from '../../../config'

const validationSchema = Yup.object().shape({
  date: Yup.date().required('Seleccione fecha'),
  attention_place: Yup.string().required('Seleccione lugar de atención'),
  contact_method: Yup.string().required('Seleccione método de contacto lugar'),
  topic_id: Yup.string().required('Seleccione tema'),
  area_id: Yup.string().required('Seleccione area'),
  area_name: Yup.string().required('Seleccione area'),
  management_id: Yup.string().required('Seleccione gestión'),
  status: Yup.string().required('Seleccione estado'),
  company_report: Yup.string().required('Seleccione opcion'),
  is_social_case: Yup.string().required('Seleccione caso social'),
  case_id: Yup.number('Seleccione caso'),
  task_id: Yup.number('Seleccione plan de intervención '),
  assigned_id: Yup.string('Ingrese profesional'),
  observation: Yup.string('Ingrese observaciones')
  // attached_url: Yup.mixed().required()
})

const WorkerInterventionRecord = ({
  open,
  onClose,
  type,
  data,
  submitFunction,
  successMessage,
  successFunction,
  company,
  construction
}) => {
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()
  const { areas, managementList } = useSelector((state) => state.common)
  const { user } = useSelector((state) => state.auth)
  const [topics, setTopics] = useState([])
  //  const [file, setFile] = useState(null)

  const formik = useFormik({
    validateOnMount: true,
    validationSchema,
    initialValues: {
      date: type === 'UPDATE' ? data.date : '',
      source_system: type === 'UPDATE' ? data.source_system : 'VISITAS',
      source_business:
        type === 'UPDATE' ? data.source_business : 'FUNDACIÓN CHCC',
      attention_place: type === 'UPDATE' ? data.attention_place : '',
      contact_method: type === 'UPDATE' ? data.contact_method : '',
      business_name: type === 'UPDATE' ? data.business_name : '',
      construction_name: type === 'UPDATE' ? data.construction_name : '',
      area_id: type === 'UPDATE' ? data.area_id : null,
      area_name: type === 'UPDATE' ? data.area_name : '',
      topic_id: type === 'UPDATE' ? data.topic_id : '',
      management_id: type === 'UPDATE' ? data.management_id : '',
      status: type === 'UPDATE' ? data.status : '',
      company_report: type === 'UPDATE' ? data.company_report : '',
      is_social_case: type === 'UPDATE' ? data.is_social_case : '',
      case_id: type === 'UPDATE' ? data.case_id : '',
      task_id: type === 'UPDATE' ? data.task_id : '',
      assigned_id: type === 'UPDATE' ? data.assigned_id : '',
      observation: type === 'UPDATE' ? data.observation : '',
      attached_url: type === 'UPDATE' ? data.attached_url : ''
    },
    onSubmit: (values) => {
      submitFunction({
        ...values,
        assigned_id: user.id,
        created_by: user.id
      }).then((result) => {
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

  const handleSelectChange = (e) => {
    const { name, value } = e.target
    switch (name) {
      case 'area': {
        const area = areas.find((item) => item.id === parseInt(value, 10))
        setTopics(area.topics)
        // setAreas(area?.areas || [])
        formik.setFieldValue('area_id', area.id)
        formik.setFieldValue('area_name', area.name)
        break
      }
      case 'topic': {
        const topic = topics.find((item) => item.id === parseInt(value, 10))
        formik.setFieldValue('topic_id', topic.id)
        break
      }
      default:
        throw new Error('Error')
    }
  }

  useEffect(() => {
    if (type === 'CREATE') {
      formik.setFieldValue('date', new Date())
    }
  }, [type])

  useEffect(() => {
    if (formik.values.area_id && areas.length > 0) {
      handleSelectChange({
        target: { name: 'area', value: formik.values.area_id }
      })
    }
  }, [formik.values.area_id, areas])

  useEffect(() => {
    if (open) {
      dispatch(commonActions.getAreas())
      dispatch(commonActions.getManagement())
    }
  }, [open])

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
              <TextField
                label="Origen sistema"
                value={formik.values.source_system}
                inputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <TextField
                label="Origen Empresa"
                value={formik.values.source_business}
                inputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <TextField
                label="Empresa"
                value={company.business_name}
                inputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <TextField
                label="Obra"
                value={construction.name}
                inputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <Select
                label="Lugar de atención"
                name="attention_place"
                required
                value={formik.values.attention_place}
                onChange={formik.handleChange}
                error={
                  formik.touched.attention_place &&
                  Boolean(formik.errors.attention_place)
                }
                helperText={
                  formik.touched.attention_place &&
                  formik.errors.attention_place
                }
              >
                <option value="">Seleccione Lugar</option>
                {['OfICINA', 'TERRENO', 'VIRTUAL'].map((item, i) => (
                  <option key={`plce-${i}-${item}`} value={item}>
                    {item}
                  </option>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <Select
                label="Método de contacto"
                name="contact_method"
                required
                value={formik.values.contact_method}
                onChange={formik.handleChange}
                error={
                  formik.touched.contact_method &&
                  Boolean(formik.errors.contact_method)
                }
                helperText={
                  formik.touched.contact_method && formik.errors.contact_method
                }
              >
                <option value="">Seleccione opción</option>
                {[
                  'PRESENCIAL',
                  'TELEFÓINICO',
                  'RED SOCIAL',
                  'VIDEO CONFERENCIA'
                ].map((item, i) => (
                  <option key={`plce-${i}-${item}`} value={item}>
                    {item}
                  </option>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <Select
                label="Area"
                name="area"
                required
                value={formik.values.area_id}
                onChange={handleSelectChange}
                error={formik.touched.area_id && Boolean(formik.errors.area_id)}
                helperText={formik.touched.area_id && formik.errors.area_id}
              >
                <option value={`INVALID`}>Seleccione area</option>
                {areas.map((item, index) => (
                  <option key={`area--${index}`} value={`${item.id}`}>
                    {item.name}
                  </option>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <Select
                label="Tema"
                name="topic"
                required
                value={formik.values.topic_id}
                onChange={handleSelectChange}
                // onChange={formik.handleChange}
                error={
                  formik.touched.topic_id && Boolean(formik.errors.topic_id)
                }
                helperText={formik.touched.topic_id && formik.errors.topic_id}
              >
                <option value={`INVALID`}>Seleccione tema</option>
                {topics.map((item, index) => (
                  <option key={`area--${index}`} value={`${item.id}`}>
                    {item.name}
                  </option>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <Select
                label="Gestión"
                name="management_id"
                required
                value={formik.values.management_id}
                onChange={formik.handleChange}
                error={
                  formik.touched.management_id &&
                  Boolean(formik.errors.management_id)
                }
                helperText={
                  formik.touched.management_id && formik.errors.management_id
                }
              >
                <option value="">Seleccione gestion</option>
                {managementList.map((item, i) => (
                  <option key={`management-${i}-${item.id}`} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <Select
                label="Estado"
                name="status"
                required
                value={formik.values.status}
                onChange={formik.handleChange}
                error={formik.touched.status && Boolean(formik.errors.status)}
                helperText={formik.touched.status && formik.errors.status}
              >
                <option value="">Seleccione estado</option>
                {AttentionStatus.map((item, i) => (
                  <option key={`status-${i}-${item}`} value={`${item.name}`}>
                    {`${item.short}: ${item.name}`}
                  </option>
                ))}
              </Select>
            </Grid>

            <Grid container spacing={2} item xs={12} md={12} lg={12}>
              <Grid item xs={12} md={3} lg={3}>
                <InputLabel required>Informe Empresa</InputLabel>
                <Box>
                  <FormControlLabel
                    value="end"
                    control={
                      <Radio
                        color="primary"
                        checked={formik.values.company_report === 'SI'}
                        onChange={() => {
                          formik.setFieldValue('company_report', 'SI')
                        }}
                      />
                    }
                    label="SI"
                  />
                  <FormControlLabel
                    value="end"
                    control={
                      <Radio
                        color="primary"
                        checked={formik.values.company_report === 'NO'}
                        onChange={() => {
                          formik.setFieldValue('company_report', 'NO')
                        }}
                      />
                    }
                    label="NO"
                  />
                </Box>
              </Grid>
            </Grid>

            <Grid container spacing={2} item xs={12} md={12} lg={12}>
              <Grid item xs={12} md={3} lg={3}>
                <InputLabel required>Caso Social</InputLabel>
                <Box>
                  <FormControlLabel
                    value="end"
                    control={
                      <Radio
                        color="primary"
                        checked={formik.values.is_social_case === 'SI'}
                        onChange={() => {
                          formik.setFieldValue('is_social_case', 'SI')
                        }}
                      />
                    }
                    label="SI"
                  />
                  <FormControlLabel
                    value="end"
                    control={
                      <Radio
                        color="primary"
                        checked={formik.values.is_social_case === 'NO'}
                        onChange={() => {
                          formik.setFieldValue('is_social_case', 'NO')
                        }}
                      />
                    }
                    label="NO"
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={3} lg={3}>
                <Select
                  label="Caso"
                  name="case_id"
                  value={formik.values.case_id}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.case_id && Boolean(formik.errors.case_id)
                  }
                  helperText={formik.touched.case_id && formik.errors.case_id}
                >
                  <option value="">Seleccione caso</option>
                  {[1, 2, 3].map((item, i) => (
                    <option key={`case_id-${i}-${item}`} value={item}>
                      {item}
                    </option>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={12} md={3} lg={3}>
                <Select
                  label="Plan de Intervención"
                  name="task_id"
                  value={formik.values.task_id}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.task_id && Boolean(formik.errors.task_id)
                  }
                  helperText={formik.touched.task_id && formik.errors.task_id}
                >
                  <option value="">Seleccione plan de intervención</option>
                  {[1, 2, 3].map((item, i) => (
                    <option key={`plan-${i}-${item}`} value={item}>
                      {item}
                    </option>
                  ))}
                </Select>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Box display="flex" alignItems="center">
                <Typography style={{ marginRight: '10px' }}>
                  Profesional:
                </Typography>
                <Avatar>{user ? user.names.charAt(0) : ''}</Avatar>
                <Typography
                  style={{ marginLeft: '10px' }}
                >{`${user?.names} ${user?.paternal_surname}`}</Typography>
              </Box>
            </Grid>

            <Grid item xs={12} md={12} lg={12}>
              <TextArea
                rowsMin={4}
                label="Observaciones"
                name="observation"
                value={formik.values.observation}
                onChange={formik.handleChange}
                error={
                  formik.touched.observation &&
                  Boolean(formik.errors.observation)
                }
                helperText={
                  formik.touched.observation && formik.errors.observation
                }
              />
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <InputLabel>Archivo adjunto</InputLabel>

              <FilePicker
                onChangeImage={(e) => {
                  //  eslint-disable-next-line
                  console.log(e)
                }}
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