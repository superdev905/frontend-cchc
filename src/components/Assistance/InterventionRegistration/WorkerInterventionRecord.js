import { useEffect, useState } from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useSnackbar } from 'notistack'
import { useSelector, useDispatch } from 'react-redux'
import { FiTrash2 as DeleteIcon } from 'react-icons/fi'
import {
  Box,
  Grid,
  Typography,
  FormControlLabel,
  Radio,
  Avatar
} from '@material-ui/core'
import { Dialog, FilePicker } from '../../Shared'
import {
  Button,
  Select,
  SubmitButton,
  InputLabel,
  TextArea,
  LabeledRow,
  EmptyState
} from '../../UI'
import commonActions from '../../../state/actions/common'
import filesActions from '../../../state/actions/files'
import { AttentionStatus } from '../../../config'
import { formatDate, formatHours } from '../../../formatters'
import { useSuccess, useToggle } from '../../../hooks'
import BenefitDialog from '../BenefitDialog'
import { ActivityCard, BenefitCard } from '../../Benefits'
import benefitsActions from '../../../state/actions/benefits'
import useStyles from './styles'

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
  case_id: Yup.number().required('Seleccione caso'),
  task_id: Yup.number().required('Seleccione plan de intervención'),
  assigned_id: Yup.string('Ingrese profesional'),
  observation: Yup.string('Ingrese observaciones'),
  attached_url: Yup.mixed()
})

const attentionPlaces = ['OFICINA', 'TERRENO', 'VIRTUAL']

const WorkerInterventionRecord = ({
  open,
  onClose,
  employee,
  type,
  data,
  submitFunction,
  successMessage,
  successFunction,
  company,
  construction,
  visitShift
}) => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const { enqueueSnackbar } = useSnackbar()
  const { success, changeSuccess } = useSuccess()
  const { areas, managementList } = useSelector((state) => state.common)
  const { user } = useSelector((state) => state.auth)
  const [topics, setTopics] = useState([])
  const [attachedFile, setAttachedFile] = useState(null)
  const [selectedManagement, setSelectedManagement] = useState('')
  const [activityDetails, setActivityDetails] = useState({
    benefit: null,
    activity: null
  })
  const { open: openBenefit, toggleOpen: toggleOpenBenefit } = useToggle()

  const handleActivityCreate = (benefit, activity, assistanceId) => {
    dispatch(
      benefitsActions.createActivity({
        ...activity,
        benefitId: benefit.id,
        createdDate: new Date().toISOString(),
        assistanceId,
        employeeId: employee.id,
        employeeName: `${employee.names} ${employee.paternal_surname} ${employee.maternal_surname}`
      })
    )
  }

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
      company_report_observation:
        type === 'UPDATE' ? data.company_report_observation : '',
      is_social_case: type === 'UPDATE' ? data.is_social_case : '',
      case_id: type === 'UPDATE' ? data.case_id : '',
      task_id: type === 'UPDATE' ? data.task_id : '',
      assigned_id: type === 'UPDATE' ? data.assigned_id : '',
      observation: type === 'UPDATE' ? data.observation : '',
      attached_url: type === 'UPDATE' ? data.attached_url : '',
      attached_key: type === 'UPDATE' ? data.attached_url : ''
    },
    onSubmit: async (values) => {
      let resultUpload = null
      if (attachedFile) {
        const formData = new FormData()
        formData.append('file', attachedFile, attachedFile.name)
        resultUpload = await dispatch(
          filesActions.uploadFileToStorage(formData)
        )
      }
      submitFunction({
        ...values,
        attached_key: resultUpload
          ? resultUpload.file_key
          : values.attached_key,
        attached_url: resultUpload
          ? resultUpload.file_url
          : values.attached_url,
        assigned_id: user.id,
        created_by: user.id
      }).then((result) => {
        formik.setSubmitting(false)
        changeSuccess(true, () => {
          enqueueSnackbar(successMessage, {
            variant: 'success',
            autoHideDuration: 1500
          })
          onClose()
          if (successFunction) {
            successFunction(result)
          }
          if (selectedManagement === 'ENTREGA DE BENEFICIO') {
            handleActivityCreate(
              activityDetails.benefit,
              activityDetails.activity,
              result.id
            )
          }
        })
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

  const setAttentionPlace = (shiftName) => {
    if (shiftName === 'COVID') return 'VIRTUAL'
    if (shiftName === 'AT.CESANTES') return 'OFICINA'
    return 'TERRENO'
  }

  const getActivityValidation = () => {
    if (selectedManagement === 'ENTREGA DE BENEFICIO') {
      return !activityDetails.benefit && !activityDetails.activity
    }
    return false
  }

  useEffect(() => {
    const { management_id } = formik.values
    if (management_id) {
      const selected = managementList.find(
        (item) => item.id === parseInt(management_id, 10)
      )
      if (selected.name === 'ENTREGA DE BENEFICIO') {
        toggleOpenBenefit()
      }
      setSelectedManagement(selected.name)
    } else {
      setSelectedManagement('')
    }
  }, [formik.values.management_id])

  useEffect(() => {
    if (type === 'CREATE') {
      formik.setFieldValue('date', new Date())
      formik.setFieldValue('attention_place', setAttentionPlace(visitShift))
    }
  }, [type, visitShift])

  useEffect(() => {
    if (formik.values.area_id && areas.length > 0) {
      handleSelectChange({
        target: { name: 'area', value: formik.values.area_id }
      })
    }
  }, [formik.values.area_id, areas])

  useEffect(() => {
    if (open) {
      setAttachedFile(null)
      dispatch(commonActions.getAreas())
      dispatch(commonActions.getManagement())
    }
  }, [open])

  return (
    <Dialog open={open} onClose={onClose} maxWidth={'lg'}>
      <Box>
        <Typography variant="h6" align="center">
          {`${type === 'UPDATE' ? 'Actualizar' : 'Crear'} Asistencia`}
        </Typography>
        <Box p={2}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Box>
                <LabeledRow label="Fecha:">
                  {formatDate(formik.values.date)}
                </LabeledRow>
                <LabeledRow label="Hora:">
                  {formatHours(formik.values.date)}
                </LabeledRow>
                <LabeledRow label="Origen Sistema:">
                  {formik.values.source_system}
                </LabeledRow>
                <LabeledRow label="Origen Empresa:">
                  {formik.values.source_business}
                </LabeledRow>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box>
                <LabeledRow label="Empresa:">
                  {company.business_name}
                </LabeledRow>
                <LabeledRow label="Obra:">{construction.name}</LabeledRow>
                <LabeledRow label="Profesional:">
                  <Box display="flex" alignItems="center">
                    <Avatar>{user ? user.names.charAt(0) : ''}</Avatar>
                    <Typography
                      style={{ marginLeft: '10px' }}
                    >{`${user?.names} ${user?.paternal_surname}`}</Typography>
                  </Box>
                </LabeledRow>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Typography>
                <strong>Complete los siguientes campos</strong>
              </Typography>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Select
                label="Lugar de atención"
                name="attention_place"
                required
                value={formik.values.attention_place}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
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
                {attentionPlaces.map((item, i) => (
                  <option key={`plce-${i}-${item}`} value={item}>
                    {item}
                  </option>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Select
                label="Método de contacto"
                name="contact_method"
                required
                value={formik.values.contact_method}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
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
                  'TELEFÓNICO',
                  'RED SOCIAL',
                  'VIDEO CONFERENCIA'
                ].map((item, i) => (
                  <option key={`plce-${i}-${item}`} value={item}>
                    {item}
                  </option>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Select
                label="Area"
                name="area"
                required
                value={formik.values.area_id}
                onChange={handleSelectChange}
                onBlur={formik.handleBlur}
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
            <Grid item xs={12} md={6} lg={4}>
              <Select
                label="Tema"
                name="topic"
                required
                value={formik.values.topic_id}
                onChange={handleSelectChange}
                onBlur={formik.handleBlur}
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
            <Grid item xs={12} md={6} lg={4}>
              <Select
                label="Gestión"
                name="management_id"
                required
                value={formik.values.management_id}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
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
            <Grid item xs={12} md={6} lg={4}>
              <Select
                label="Estado"
                name="status"
                required
                value={formik.values.status}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
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
            {selectedManagement === 'ENTREGA DE BENEFICIO' && (
              <Grid item xs={12}>
                <Box className={classes.benefitBox} p={2}>
                  <Box
                    display={'flex'}
                    justifyContent={'space-between'}
                    alignItems={'center'}
                  >
                    <Typography style={{ marginBottom: 15 }}>
                      <strong>Detalles de beneficio</strong>
                    </Typography>
                    {activityDetails.benefit && activityDetails.activity && (
                      <Button
                        startIcon={<DeleteIcon />}
                        size="small"
                        danger
                        onClick={() =>
                          setActivityDetails({ benefit: null, activity: null })
                        }
                      >
                        Eliminar
                      </Button>
                    )}
                  </Box>
                  {activityDetails.benefit && activityDetails.activity ? (
                    <>
                      <BenefitCard benefit={activityDetails.benefit} selected />
                      <ActivityCard activity={activityDetails.activity} />
                    </>
                  ) : (
                    <Box>
                      <EmptyState
                        message="Seleccione beneficio y actividad"
                        event={toggleOpenBenefit}
                        actionMessage="Ver beneficios"
                      ></EmptyState>
                    </Box>
                  )}
                </Box>
              </Grid>
            )}
            <Grid item xs={12} md={2}>
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

            {formik.values.company_report === 'SI' && (
              <Grid item xs={12} md={10}>
                <TextArea
                  rowsMin={4}
                  label="Comentarios de informe"
                  name="company_report_observation"
                  value={formik.values.company_report_observation}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.company_report_observation &&
                    Boolean(formik.errors.company_report_observation)
                  }
                  helperText={
                    formik.touched.company_report_observation &&
                    formik.errors.company_report_observation
                  }
                />
              </Grid>
            )}

            <Grid container spacing={2} item xs={12} md={12} lg={12}>
              <Grid item xs={12} md={3} lg={2}>
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
              <Grid item xs={12} md={3} lg={4}>
                <Select
                  label="Caso"
                  name="case_id"
                  required
                  value={formik.values.case_id}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.case_id && Boolean(formik.errors.case_id)
                  }
                  helperText={formik.touched.case_id && formik.errors.case_id}
                >
                  <option value="">Seleccione caso</option>
                  {[
                    { index: 1, name: 'CASO 1' },
                    { index: 2, name: 'CASO 2' }
                  ].map((item, i) => (
                    <option key={`case_id-${i}-${item}`} value={item.index}>
                      {item.name}
                    </option>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={12} md={3} lg={4}>
                <Select
                  label="Plan de Intervención"
                  name="task_id"
                  required
                  value={formik.values.task_id}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.task_id && Boolean(formik.errors.task_id)
                  }
                  helperText={formik.touched.task_id && formik.errors.task_id}
                >
                  <option value="">Seleccione plan de intervención</option>
                  {[
                    { index: 1, name: 'Plan de Intervención 1' },
                    { index: 2, name: 'Plan de Intervención 2' }
                  ].map((item, i) => (
                    <option key={`plan-${i}-${item}`} value={item.index}>
                      {item.name}
                    </option>
                  ))}
                </Select>
              </Grid>
            </Grid>

            <Grid item xs={12} md={12} lg={12}>
              <TextArea
                rowsMin={4}
                label="Observaciones"
                name="observation"
                value={formik.values.observation}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
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
                onChange={(e) => {
                  setAttachedFile(e)
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
              disabled={
                !formik.isValid ||
                formik.isSubmitting ||
                getActivityValidation()
              }
              loading={formik.isSubmitting}
              success={success}
            >
              {`${type === 'UPDATE' ? 'Actualizar' : 'Crear'} Registro`}
            </SubmitButton>
          </Box>
        </Box>
      </Box>

      {openBenefit && (
        <BenefitDialog
          open={openBenefit}
          onClose={toggleOpenBenefit}
          employee={employee}
          onSave={(benefit, activity) =>
            setActivityDetails({ benefit, activity })
          }
        />
      )}
    </Dialog>
  )
}

WorkerInterventionRecord.defaultProps = {
  type: 'CREATE'
}

export default WorkerInterventionRecord
