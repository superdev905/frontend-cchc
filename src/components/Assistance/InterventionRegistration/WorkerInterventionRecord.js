import React, { useEffect, useState } from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useSnackbar } from 'notistack'
import { useSelector, useDispatch } from 'react-redux'
import {
  Box,
  Grid,
  Typography,
  InputLabel,
  FormControlLabel,
  Radio
} from '@material-ui/core'
import CloudUploadOutlinedIcon from '@material-ui/icons/CloudUploadOutlined'
import { DatePicker, Dialog } from '../../Shared'
import { Button, Select, SubmitButton, TextField } from '../../UI'
import commonActions from '../../../state/actions/common'
// import { decisionList } from '../../../config'

const validationSchema = Yup.object().shape({
  date: Yup.date().required('Seleccione fecha'),
  attention_place: Yup.string().required('Ingrese lugar'),
  business_name: Yup.string().required('Ingrese empresa'),
  construction_name: Yup.string().required('Ingrese obra'),
  topic: Yup.string().required('Seleccione topic'),
  area: Yup.string().required('Seleccione tema'),
  management: Yup.string().required('Seleccione gestión'),
  status: Yup.string().required('Seleccione estado'),
  company_report: Yup.string().required('Seleccione opcion'),
  contact_method: Yup.number().required('Seleccione metodo de contacto'),
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
  successFunction
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
      attention_place: type === 'UPDATE' ? data.attention_place : '',
      business_name: type === 'UPDATE' ? data.business_name : '',
      construction_name: type === 'UPDATE' ? data.construction_name : '',
      area: type === 'UPDATE' ? data.topic_id : null,
      topic: type === 'UPDATE' ? data.area_id : '',
      management: type === 'UPDATE' ? data.management_id : '',
      status: type === 'UPDATE' ? data.status : '',
      company_report: type === 'UPDATE' ? data.company_report : '',
      contact_method: type === 'UPDATE' ? data.contact_method : '',
      is_social_case: type === 'UPDATE' ? data.is_social_case : '',
      case_id: type === 'UPDATE' ? data.case_id : '',
      task_id: type === 'UPDATE' ? data.task_id : '',
      assigned_id: type === 'UPDATE' ? data.assigned_id : '',
      observation: type === 'UPDATE' ? data.observation : '',
      attached_url: type === 'UPDATE' ? data.attached_url : ''
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

  const handleSelectChange = (e) => {
    const { name, value } = e.target
    switch (name) {
      case 'area': {
        const area = areas.find((item) => item.id === parseInt(value, 10))
        setTopics(area.topics)
        // setAreas(area?.areas || [])
        formik.setFieldValue('area', area.id)
        break
      }
      case 'topic': {
        const topic = topics.find((item) => item.id === parseInt(value, 10))
        formik.setFieldValue('topic', topic.id)
        break
      }
      default:
        throw new Error('Error')
    }
  }

  useEffect(() => {
    if (formik.values.area && areas.length > 0) {
      handleSelectChange({
        target: { name: 'area', value: formik.values.area }
      })
    }
  }, [formik.values.area, areas])

  useEffect(() => {
    dispatch(commonActions.getAreas())
    dispatch(commonActions.getManagement())
    dispatch(commonActions.getTopics())
    dispatch(commonActions.getNationalities())
  }, [])

  console.log(formik.errors)
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
                {['lugar 1', 'lugar 2', 'lugar 3'].map((item, i) => (
                  <option key={`plce-${i}-${item}`} value={item}>
                    {item}
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
                {['empresa 1', 'empresa 2', 'empresa 3'].map((item, i) => (
                  <option key={`company-${i}-${item}`} value={item}>
                    {item}
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
                {['obra 1', 'obra 2', 'obra 3'].map((item, i) => (
                  <option key={`construction-${i}-${item}`} value={item}>
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
                value={formik.values.area}
                // onChange={formik.handleChange}
                onChange={handleSelectChange}
                error={formik.touched.area && Boolean(formik.errors.area)}
                helperText={formik.touched.area && formik.errors.area}
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
                value={formik.values.topic}
                onChange={handleSelectChange}
                // onChange={formik.handleChange}
                error={formik.touched.topic && Boolean(formik.errors.topic)}
                helperText={formik.touched.topic && formik.errors.topic}
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
                {['estado 1', 'estado 2', 'estado 3'].map((item, i) => (
                  <option key={`status-${i}-${item}`} value={item}>
                    {item}
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
                  <option value="">Seleccione método</option>
                  {[1, 2, 3].map((item, i) => (
                    <option key={`status-${i}-${item}`} value={item}>
                      {item}
                    </option>
                  ))}
                </Select>
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

            <Grid item xs={12} md={6} lg={3}>
              <TextField
                label="Profesional"
                name="assigned_id"
                value={user?.names}
                onChange={formik.handleChange}
                error={
                  formik.touched.assigned_id &&
                  Boolean(formik.errors.assigned_id)
                }
                helperText={
                  formik.touched.assigned_id && formik.errors.assigned_id
                }
              />
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <TextField
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
              <Button fullWidth variant="outlined" component="label">
                <CloudUploadOutlinedIcon />
                <input type="file" hidden />
              </Button>
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
