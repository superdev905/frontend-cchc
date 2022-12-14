import { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import { useSnackbar } from 'notistack'
import { useSelector, useDispatch } from 'react-redux'
import { FiTrash2 as DeleteIcon } from 'react-icons/fi'
import {
  Box,
  Grid,
  Typography,
  FormControlLabel,
  FormHelperText,
  Radio,
  Avatar,
  Switch
} from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import moment from 'moment'
import RowAutocomplete from './RowAutocomplete'
import EmployeeRow from './EmployeeRow'
import { Dialog, FilePicker } from '../../Shared'
import {
  Button,
  Select,
  SubmitButton,
  InputLabel,
  TextArea,
  LabeledRow,
  EmptyState,
  TextField
} from '../../UI'
import commonActions from '../../../state/actions/common'
import filesActions from '../../../state/actions/files'
import employeeActions from '../../../state/actions/employees'
import generateColor, { COLORS } from '../../../utils/generateColor'
import { AttentionStatus } from '../../../config'
import { formatDate, formatHours } from '../../../formatters'
import { useSuccess, useToggle } from '../../../hooks'
import BenefitDialog from '../BenefitDialog'
import { /* ActivityCard, */ BenefitCard } from '../../Benefits'
import benefitsActions from '../../../state/actions/benefits'
import useStyles from './styles'
import { validationSchema, caseAdditionalSchema } from './schema'
import socialCasesActions from '../../../state/actions/socialCase'
import CaseAdditionalForm from './CaseAdditionalForm'
import authActions from '../../../state/actions/auth'
import ConfirmAttend from './ConfirmAttend'

const attentionPlaces = ['OFICINA', 'TERRENO', 'VIRTUAL']

const WorkerInterventionRecord = ({
  eventType,
  event,
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
  visitShift,
  sourceSystem,
  defaultCaseId,
  defaultTaskId,
  defaultSocialCase,
  updateTaskId,
  setUpdateTasks
}) => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const { enqueueSnackbar } = useSnackbar()
  const { success, changeSuccess } = useSuccess()
  const [trying, setTrying] = useState(false)
  const [attachments, setAttachments] = useState([])
  const { areas, managementList } = useSelector((state) => state.common)
  const { casesForSelect } = useSelector((state) => state.socialCase)
  const { user } = useSelector((state) => state.auth)
  const [topics, setTopics] = useState([])
  const [selectedTopic, setSelectedTopic] = useState(null)
  const [selectedManagement, setSelectedManagement] = useState('')
  const [activityDetails, setActivityDetails] = useState({
    benefit: null,
    activity: null
  })
  //  const [selectedPlans, setSelectedPlans] = useState([])
  const [beneficiaryList, setBeneficiaryList] = useState([])
  const [selectedBeneficiary, setSelectedBeneficiary] = useState(null)
  const { open: openBenefit, toggleOpen: toggleOpenBenefit } = useToggle()
  const { open: openConfirm, toggleOpen: toggleOpenConfirm } = useToggle()

  const fetchBeneficiaryList = () => {
    dispatch(
      employeeActions.getEmployeeRelatives({
        employee_run: employee.run,
        state: 'CREATED'
      })
    ).then((result) => {
      setBeneficiaryList(
        result
          .map((item) => ({ ...item, isRelative: true }))
          .map((item) => ({
            ...item,
            avatarBg: generateColor()
          }))
      )
    })
  }

  useEffect(() => {
    fetchBeneficiaryList()
  }, [employee])

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

  const handleCreateCaseSocial = (body) => {
    dispatch(socialCasesActions.createSocialCase(body))
  }
  const caseFormik = useFormik({
    validationSchema: caseAdditionalSchema,
    validateOnChange: true,
    validateOnMount: true,
    initialValues: {
      requestType: ''
    }
  })

  const logAction = (action) => {
    const values = {
      user_id: user.id,
      user_name: `${user.names} ${user.paternal_surname} ${user.maternal_surname}`,
      action
    }
    dispatch(authActions.logs(values))
  }

  const formik = useFormik({
    validateOnMount: true,
    validateOnBlur: true,
    validateOnChange: true,
    validationSchema,
    initialValues: {
      date: type === 'UPDATE' ? data.date : '',
      source_system: type === 'UPDATE' ? data.source_system : sourceSystem,
      source_business:
        type === 'UPDATE' ? data.source_business : 'FUNDACI??N CHCC',
      attention_place: type === 'UPDATE' ? data.attention_place : '',
      contact_method: type === 'UPDATE' ? data.contact_method : '',
      business_name:
        type === 'UPDATE' ? data.business_name : company.business_name,
      construction_name:
        type === 'UPDATE' ? data.construction_name : company.construction_name,
      area_id: type === 'UPDATE' ? data.area_id : null,
      area_name: type === 'UPDATE' ? data.area_name : '',
      topic_id: type === 'UPDATE' ? data.topic_id : '',
      management_id: type === 'UPDATE' ? data.management_id : '',
      status: type === 'UPDATE' ? data.status : '',
      company_report: type === 'UPDATE' ? data.company_report : '',
      company_report_observation:
        type === 'UPDATE' ? data.company_report_observation : '',
      is_social_case:
        type === 'UPDATE' ? data.is_social_case : defaultSocialCase || '',
      case_id: type === 'UPDATE' ? data.case_id : defaultCaseId || '',
      task_id: type === 'UPDATE' ? data.task_id : defaultTaskId || '',
      assigned_id: type === 'UPDATE' ? data.assigned_id : '',
      observation: type === 'UPDATE' ? data.observation : '',
      attached_url: type === 'UPDATE' ? data.attached_url : '',
      attached_key: type === 'UPDATE' ? data.attached_url : '',
      attended_id: type === 'UPDATE' ? data.attended_id : '',
      attended_name: type === 'UPDATE' ? data.attended_name : '',
      is_attended_relative:
        type === 'UPDATE' ? data.is_attended_relative : false,
      attention_beneficiary:
        type === 'UPDATE' ? data.attention_beneficiary : '',
      beneficiary_selected:
        type === 'UPDATE' && data.is_attended_relative
          ? data.beneficiary_selected
          : ''
    },
    onSubmit: async (values) => {
      setTrying(true)
      const attachmentsList = []
      await Promise.all(
        attachments.map(async (item) => {
          const formData = new FormData()
          formData.append('file', item.file, item.file.name)
          const resultUpload = await dispatch(
            filesActions.uploadFileToStorage(formData)
          )
          attachmentsList.push({
            fileKey: resultUpload.file_key,
            fileUrl: resultUpload.file_url,
            fileSize: resultUpload.file_size,
            fileName: resultUpload.file_name,
            uploadDate: resultUpload.upload_date,
            sourceSystem: 'TRABAJADORES',
            dataId: employee.id
          })
        })
      )

      const body = {
        ...values,
        date: new Date().toISOString(),
        attachments: attachmentsList,
        case_id: values.case_id === 'NEW' ? null : values.case_id,
        task_id: values.task_id ? values.task_id : null,
        assigned_id: user.id,
        created_by: user.id
      }
      setTrying(true)

      if (!body.case_id) {
        delete body.case_id
      }

      submitFunction(body).then((result) => {
        setTrying(true)
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
          if (formik.values.case_id === 'NEW' && company.id) {
            const newCase = {
              date: new Date().toISOString(),
              assistanceId: result.id,
              businessId: company.id,
              businessName: company.business_name,
              constructionId: construction.id,
              constructionName: construction.construction_name,
              employeeId: employee.id,
              employeeRut: employee.run,
              employeeNames: `${employee.names} ${employee.paternal_surname} ${
                employee.maternal_surname || ''
              }`.trim(),
              areaId: values.area_id,
              professionalId: user.id,
              derivationState: body.task_id
                ? managementList.find(
                    (item) => item.id === parseInt(body.task_id, 10)
                  ).name
                : '',
              ...caseFormik.values
            }
            handleCreateCaseSocial(newCase)
            const actualDate = moment().format('DD/MM/YYYY')
            dispatch(
              socialCasesActions.SocialCaseMail(
                { type: 'CREATE' },
                {
                  date: actualDate.toString(),
                  derivatedBy: `${user?.names} ${user?.paternal_surname} ${user?.maternal_surname}`,
                  derivatedType: managementList.find(
                    (e) => e.id === parseInt(formik.values.task_id, 10)
                  )?.name,
                  attended: body.attended_name,
                  attendedRut: selectedBeneficiary.run,
                  obra: event.construction_name,
                  company: body.business_name,
                  createComment: body.observation,
                  createCommentEnd: caseFormik.values.requestType,
                  to: [
                    user.email,
                    'sistrac.derivacion@fundacioncchc.cl',
                    user?.bossEmail
                  ],
                  profesionalDerivatedList: []
                }
              )
            )
          }
          if (
            formik.values.case_id !== 'NEW' &&
            formik.values.task_id &&
            updateTaskId !== 'UPDATE'
          ) {
            dispatch(
              socialCasesActions.createInterventionTask({
                managementId: body.task_id,
                managementName: managementList.find(
                  (item) => item.id === parseInt(body.task_id, 10)
                ).name,
                socialCaseId: body.case_id,
                professionalId: user.id,
                professionalNames: `${user.names} ${user.paternal_surname} ${user.maternal_surname}`,
                frequency: 'FECHA FIJA',
                nextDate: new Date()
              })
            )
          }
          if (updateTaskId === 'UPDATE') {
            dispatch(socialCasesActions.completeInterventionTask(body.task_id))
            setUpdateTasks(true)
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
        setTopics(area?.topics || [])
        // setAreas(area?.areas || [])
        formik.setFieldValue('area_id', area?.id || '')
        formik.setFieldValue('area_name', area?.name || '')
        formik.setFieldTouched('area_id')
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

  const handleAddPicker = () => {
    const list = [...attachments]
    list.push({ id: list.length + 1 })
    setAttachments(list)
  }

  const deleteAttachment = (index) => {
    setAttachments(
      attachments
        .filter((file) => file.id !== index)
        .map((file, i) => ({
          ...file,
          id: i + 1
        }))
    )
  }

  useEffect(() => {
    const { management_id } = formik.values
    if (management_id) {
      const selected = managementList.find(
        (item) => item.id === parseInt(management_id, 10)
      )
      if (selected?.name === 'ENTREGA DE BENEFICIO') {
        toggleOpenBenefit()
      }
      setSelectedManagement(selected?.name)
    } else {
      setSelectedManagement('')
    }
  }, [formik.values.management_id])

  useEffect(() => {
    if (type === 'CREATE') {
      formik.setFieldValue('date', new Date())
      formik.setFieldValue(
        'attention_place',
        visitShift ? setAttentionPlace(visitShift) : ''
      )
    }
  }, [type, visitShift])

  /*  useEffect(() => {
    if (
      formik.values.case_id &&
      formik.values.case_id !== 'NEW' &&
      areas.length > 0
    ) {
      const foundCase = casesForSelect.find(
        (item) => item.id === parseInt(formik.values.case_id, 10)
      )
      setSelectedPlans(foundCase?.interventionPlans || [])
    }
  }, [formik.values.case_id, casesForSelect]) */

  useEffect(() => {
    if (formik.values.area_id && areas.length > 0) {
      handleSelectChange({
        target: { name: 'area', value: formik.values.area_id }
      })
    }
  }, [formik.values.area_id, areas])

  useEffect(() => {
    if (formik.values.topic_id) {
      setSelectedTopic(
        topics.find((item) => item.id === parseInt(formik.values.topic_id, 10))
      )
    }
  }, [formik.values.topic_id, data, topics])

  useEffect(() => {
    if (selectedBeneficiary) {
      formik.setFieldValue('attended_id', selectedBeneficiary.id)
      formik.setFieldValue(
        'attended_name',
        `${selectedBeneficiary.names} ${selectedBeneficiary.paternal_surname}`.toUpperCase()
      )
    }
  }, [selectedBeneficiary])

  useEffect(() => {
    if (open) {
      formik.resetForm()
      setAttachments([])
      dispatch(commonActions.getAreas())
      dispatch(commonActions.getManagement())
      dispatch(socialCasesActions.getListCases(employee.id))
    }
    setSelectedBeneficiary(employee)
    formik.setFieldValue('attended_id', employee.id)
    formik.setFieldValue(
      'attended_name',
      `${employee.names} ${employee.paternal_surname}`.toUpperCase()
    )
  }, [open, employee])

  useEffect(() => {
    if (formik.isSubmitting && !formik.isValid) {
      enqueueSnackbar('Completa los campos requeridos', {
        autoHideDuration: 2000,
        variant: 'info'
      })
    }
  }, [!formik.isValid, formik.isSubmitting])

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
                {event && (
                  <>
                    {eventType === 'VISIT' ? (
                      <>
                        <LabeledRow label="Visita N??:">{event.id}</LabeledRow>
                        <LabeledRow label="Titulo visita:">
                          {event.title}
                        </LabeledRow>
                        <LabeledRow label="Estado de visita:">
                          {event.status}
                        </LabeledRow>
                      </>
                    ) : (
                      <>
                        <LabeledRow label="Caso Social:">{event.id}</LabeledRow>
                        <LabeledRow label="Tipo de solicitud:">
                          {event.requestType}
                        </LabeledRow>
                      </>
                    )}
                  </>
                )}
                <LabeledRow label="Fecha:">
                  {formatDate(formik.values.date || new Date())}
                </LabeledRow>
                <LabeledRow label="Hora:">
                  {formatHours(formik.values.date || new Date())}
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
                {company.business_name && (
                  <LabeledRow label="Empresa:">
                    {company.business_name}
                  </LabeledRow>
                )}
                {construction.name && (
                  <LabeledRow label="Obra:">{construction.name}</LabeledRow>
                )}
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
              <Box mb={1}>
                <Typography>
                  <strong>Trabajador </strong>
                </Typography>
              </Box>
              <Box>
                <EmployeeRow
                  selectable={false}
                  option={{ ...employee, avatarBg: COLORS[1] }}
                />
                <Box my={2}>
                  <InputLabel>??Atender a familiar?</InputLabel>
                  <FormControlLabel
                    control={
                      <Switch
                        color="primary"
                        checked={formik.values.is_attended_relative}
                        onChange={(e) => {
                          formik.setFieldValue(
                            'is_attended_relative',
                            e.target.checked
                          )
                          if (e.target.checked) {
                            setSelectedBeneficiary(null)
                            formik.setFieldValue('attended_id', '')
                            formik.setFieldValue('attended_name', '')
                          } else {
                            setSelectedBeneficiary(employee)
                          }
                        }}
                      />
                    }
                  />
                </Box>
                {!formik.values.is_attended_relative && selectedBeneficiary && (
                  <Box>
                    <Box mt={1}>
                      <InputLabel>Persona atendida</InputLabel>
                    </Box>
                    <EmployeeRow
                      option={{ ...selectedBeneficiary, avatarBg: COLORS[1] }}
                    />
                  </Box>
                )}
                {formik.values.is_attended_relative && (
                  <Grid item xs={12} md={12}>
                    {selectedBeneficiary ? (
                      <Box>
                        <Box mt={1}>
                          <InputLabel>Persona atendida</InputLabel>
                        </Box>
                        <EmployeeRow
                          option={selectedBeneficiary}
                          onDelete={() => setSelectedBeneficiary(null)}
                        />
                      </Box>
                    ) : (
                      <Box>
                        <Autocomplete
                          options={beneficiaryList}
                          value={formik.values.beneficiary_selected}
                          getOptionLabel={(option) => option.names || ''}
                          onChange={(__, option) => {
                            setSelectedBeneficiary(option)
                            formik.setFieldValue('attended_id', option.id)
                            formik.setFieldValue(
                              'attended_name',
                              `${option.names} ${option.paternal_surname}`.toUpperCase()
                            )
                          }}
                          required
                          renderOption={(option) => (
                            <RowAutocomplete option={option} />
                          )}
                          noOptionsText="Este trabajador no tiene familiares"
                          renderInput={(params) => (
                            <TextField
                              label={'Seleccione familiar'}
                              {...params}
                            />
                          )}
                        />
                      </Box>
                    )}
                  </Grid>
                )}
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Typography>
                <strong>Complete los siguientes campos</strong>
              </Typography>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Select
                label="Lugar de atenci??n"
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
                <option value="">SELECCIONE LUGAR</option>
                {attentionPlaces.map((item, i) => (
                  <option key={`plce-${i}-${item}`} value={item}>
                    {item}
                  </option>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Select
                label="M??todo de contacto"
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
                <option value="">SELECCIONE OPCI??N</option>
                {[
                  'PRESENCIAL',
                  'TELEF??NICO',
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
                <option value={`INVALID`}>SELECCIONE ??REA </option>
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
                name="topic_id"
                required
                value={formik.values.topic_id}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.topic_id && Boolean(formik.errors.topic_id)
                }
                helperText={formik.touched.topic_id && formik.errors.topic_id}
              >
                <option value={''}>SELECCIONE TEMA</option>
                {topics.map((item, index) => (
                  <option key={`area--${index}`} value={`${item.id}`}>
                    {item.name}
                  </option>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Select
                label="Gesti??n"
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
                <option value="">SELECCIONE GESTI??N </option>
                {managementList.map((item, i) =>
                  item.name !== 'AUTODERIVACI??N' &&
                  item.name !== 'INTERVENCI??N CONJUNTA' ? (
                    <option key={`management-${i}-${item.id}`} value={item.id}>
                      {item.name}
                    </option>
                  ) : null
                )}
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
                <option value="">SELECCIONE ESTADO</option>
                {AttentionStatus.map((item, i) => (
                  <option key={`status-${i}-${item}`} value={`${item.name}`}>
                    {`${item.short ? `${item.short}:` : ''} ${item.name}`}
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
                      {/* <ActivityCard activity={activityDetails.activity} />  */}
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
                {formik.errors.company_report && (
                  <FormHelperText error>
                    {formik.errors.company_report}{' '}
                  </FormHelperText>
                )}
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
                  maxLength={400}
                />
              </Grid>
            )}
            <Grid item xs={12} md={12} lg={12}>
              <Box>
                <Box mb={2}>
                  <Typography>
                    <strong>Datos de Caso Social</strong>
                  </Typography>
                </Box>{' '}
                <Grid container spacing={2}>
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
                              formik.setFieldValue('case_id', '')
                              formik.setFieldValue('task_id', '')
                            }}
                          />
                        }
                        label="NO"
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} lg={5}>
                    <Select
                      label="Caso"
                      name="case_id"
                      disabled={
                        formik.values.case_id === 'NEW' ||
                        formik.values.is_social_case === 'NO' ||
                        formik.values.is_social_case === ''
                      }
                      required={formik.values.is_social_case === 'SI'}
                      value={formik.values.case_id}
                      onChange={(e) => {
                        formik.setFieldValue(e.target.name, e.target.value)
                        formik.setFieldTouched(e.target.value)
                        formik.setFieldValue('task_id', '')
                        if (e.target.value === 'NEW') {
                          formik.setFieldValue('task_id', '')
                        }
                      }}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.case_id && Boolean(formik.errors.case_id)
                      }
                      helperText={
                        formik.touched.case_id && formik.errors.case_id
                      }
                    >
                      <option value="">SELECCIONE OPCI??N</option>
                      {[{ id: 'NEW', name: 'NUEVO' }]
                        .concat(casesForSelect)
                        .map((item, i) => (
                          <option key={`case_id-${i}-${item}`} value={item.id}>
                            {item.id === 'NEW'
                              ? item.name
                              : `CASO N?? ${item.id}`}
                          </option>
                        ))}
                    </Select>
                  </Grid>
                  <Grid item xs={12} lg={5}>
                    {formik.values.case_id && updateTaskId !== 'UPDATE' && (
                      <Select
                        label="Plan de Intervenci??n"
                        name="task_id"
                        required={formik.values.is_social_case === 'SI'}
                        value={formik.values.task_id}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.task_id &&
                          Boolean(formik.errors.task_id)
                        }
                        helperText={
                          formik.touched.task_id && formik.errors.task_id
                        }
                        disabled={formik.values.is_social_case === 'NO'}
                      >
                        <option value="">
                          SELECCIONE PLAN DE INTERVENCI??N
                        </option>
                        {managementList.map((item, i) =>
                          item.name === 'AUTODERIVACI??N' ||
                          item.name === 'INTERVENCI??N CONJUNTA' ? (
                            <option key={i} value={item.id}>
                              {item.name}
                            </option>
                          ) : null
                        )}
                      </Select>
                    )}
                  </Grid>
                </Grid>
                {formik.values.is_social_case === 'SI' &&
                  formik.values.case_id === 'NEW' && (
                    <>
                      <CaseAdditionalForm
                        formik={caseFormik}
                        onReset={() => {
                          formik.setFieldValue('case_id', '')
                          formik.setFieldValue('task_id', '')
                        }}
                      />
                    </>
                  )}
              </Box>
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
              <Box>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography>
                    <strong>Archivo adjuntos</strong>
                  </Typography>
                  {attachments.length > 0 && (
                    <Button size="small" onClick={handleAddPicker}>
                      Agregar nuevo
                    </Button>
                  )}
                </Box>
                <Box>
                  {attachments.length === 0 ? (
                    <EmptyState
                      message="No hay archivos adjuntos"
                      actionMessage="Agregar"
                      event={handleAddPicker}
                    />
                  ) : (
                    <>
                      <Grid container spacing={2}>
                        {attachments.map((item, index) => (
                          <Grid
                            item
                            xs={12}
                            md={6}
                            key={`file-picker-${index}`}
                          >
                            <FilePicker
                              id={item.id}
                              onChange={(e) => {
                                setAttachments(
                                  attachments.map((file) =>
                                    file.id === item.id
                                      ? { ...file, file: e }
                                      : file
                                  )
                                )
                              }}
                              onDelete={() => deleteAttachment(item.id)}
                            />
                          </Grid>
                        ))}
                      </Grid>
                    </>
                  )}
                </Box>
              </Box>
            </Grid>
          </Grid>

          <Box textAlign="center" marginTop="10px">
            <Button onClick={onClose} variant="outlined">
              Cancelar
            </Button>

            <SubmitButton
              onClick={toggleOpenConfirm}
              disabled={getActivityValidation() || formik.isSubmitting}
            >
              {`${type === 'UPDATE' ? 'Actualizar' : 'Crear'} Registro`}
            </SubmitButton>
          </Box>
        </Box>
      </Box>

      {formik.values && openConfirm && (
        <ConfirmAttend
          maxWidth="md"
          fullWidth
          open={openConfirm}
          onClose={toggleOpenConfirm}
          message={
            <>
              <Box textAlign="left">
                <Typography
                  style={{
                    fontSize: '18px',
                    textAlign: 'center',
                    marginBottom: 25,
                    fontWeight: 'bold'
                  }}
                >
                  ??Est??s seguro de guardar esta atenci??n?
                </Typography>
                <LabeledRow label="Lugar de atenci??n:">
                  {formik.values.attention_place}
                </LabeledRow>
                <LabeledRow label="Metodo de contacto:">
                  {formik.values.contact_method}
                </LabeledRow>
                <LabeledRow label="Area:">{formik.values.area_name}</LabeledRow>
                <LabeledRow label="Tema:">
                  {selectedTopic?.name || ''}
                </LabeledRow>
                <LabeledRow label="Estado:">{formik.values.status}</LabeledRow>
                <LabeledRow label="Informe empresa:">
                  {formik.values.company_report}
                </LabeledRow>
                <LabeledRow label="Caso social:">
                  {formik.values.is_social_case}
                </LabeledRow>
                <LabeledRow label="Atenci??n para:">
                  {selectedBeneficiary?.names}{' '}
                  {selectedBeneficiary?.paternal_surname}{' '}
                  {selectedBeneficiary?.maternal_surname}
                </LabeledRow>
              </Box>
              <Box textAlign="center" marginTop="15px">
                <Button variant="outlined" onClick={onClose}>
                  Cancelar
                </Button>
                <SubmitButton
                  onClick={() => {
                    formik.handleSubmit()
                    logAction(
                      `BOTON GUARDAR AL CREAR ATENCI??N, USUARIO ATENDIDO: ${employee.run}`
                    )
                  }}
                  loading={trying}
                  disabled={false}
                  success={success}
                >
                  Guardar
                </SubmitButton>
              </Box>
            </>
          }
        />
      )}

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
  eventType: 'VISIT',
  type: 'CREATE',
  sourceSystem: 'VISITAS',
  defaultCaseId: null,
  defaultTaskId: null,
  defaultSocialCase: null
}

export default WorkerInterventionRecord
