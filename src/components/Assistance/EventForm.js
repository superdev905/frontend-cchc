import { memo, useEffect, useState } from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { differenceInHours } from 'date-fns'
import { useSelector, useDispatch } from 'react-redux'
import { useSnackbar } from 'notistack'
import { Avatar, Box, Grid, Typography } from '@material-ui/core'
import { Alert, Autocomplete } from '@material-ui/lab'
import companiesActions from '../../state/actions/companies'
import commonActions from '../../state/actions/common'
import { CompanyRow, DatePicker, Dialog, TimePicker } from '../Shared'
import { useSuccess } from '../../hooks'
import {
  Button,
  Select,
  SubmitButton,
  TextArea,
  TextField,
  InputLabel
} from '../UI'

const visitSchema = Yup.object().shape({
  business_id: Yup.number().required('Seleccione empresa'),
  construction_id: Yup.number().required('Seleccione obra'),
  business_name: Yup.string().required('Seleccione nombre de empresa'),
  construction_name: Yup.string().required('Seleccione nombre de obra')
})

const validationSchema = Yup.object().shape({
  type_id: Yup.number().required('Seleccione tipo de evento'),
  title: Yup.string(),
  date: Yup.date().nullable().required('Seleccione fecha de evento'),
  start_date: Yup.date().nullable().required('Slecciona fecha de inicio'),
  end_date: Yup.date().nullable().required('Slecciona fecha de fin'),
  shift_id: Yup.number().required('Seleccione tipo de jornada'),
  shift_name: Yup.string(),
  status: Yup.string().required('Estado de evento'),
  assigned_id: Yup.number().required('Seleccione profesional'),
  observation: Yup.string().required('Ingrese observación de evento')
})

const EventForm = ({
  open,
  onClose,
  data,
  type,
  event,
  submitFunction,
  successFunction,
  changeDateTrigger,
  reschedule
}) => {
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()
  const [selectedCompany, setSelectedCompany] = useState(null)
  const [selectedCons, setSelectedCons] = useState(null)
  const { user } = useSelector((state) => state.auth)
  const { eventTypes, shiftList } = useSelector((state) => state.common)
  const [companies, setCompanies] = useState([])
  const [isVisit, setIsVisit] = useState(
    type === 'CREATE' ? event?.type_id === '1' : false
  )
  const { success, changeSuccess } = useSuccess()

  const formik = useFormik({
    validateOnMount: true,
    validateOnChange: true,
    validateOnBlur: true,
    validationSchema: isVisit
      ? validationSchema.concat(visitSchema)
      : validationSchema,
    initialValues: {
      title: type === 'CREATE' ? '' : event.title,
      type_id: type === 'CREATE' ? '' : event.type_id,
      type_description: type === 'CREATE' ? '' : event.type_id,
      status: type === 'CREATE' ? 'PROGRAMADA' : event.status,
      date: type === 'CREATE' ? new Date(data.start) : event.date,
      start_date: type === 'CREATE' ? new Date(data.start) : event.start_date,
      end_date: type === 'CREATE' ? new Date(data.end) : event.end_date,
      shift_id: type === 'CREATE' ? '' : event.shift_id,
      shift_name: type === 'CREATE' ? '' : event.shift_name,
      assigned_id: type === 'CREATE' ? '' : event.assigned_id,
      business_id: type === 'CREATE' ? '' : event.business_id,
      business_name: type === 'CREATE' ? '' : event.business_name,
      construction_id: type === 'CREATE' ? '' : event.construction_id,
      construction_name: type === 'CREATE' ? '' : event.construction_name,
      observation: type === 'CREATE' ? '' : event.observation
    },
    onSubmit: (values, { resetForm }) => {
      submitFunction({
        ...values,
        title:
          values.type_description === 'VISITA'
            ? `${values.type_description} - ${values.business_name} - ${values.construction_name}`
            : values.type_description,
        status: reschedule ? 'REPROGRAMADA' : values.status,
        start_date: new Date(values.start_date).toISOString(),
        end_date: new Date(values.end_date).toISOString()
      }).then(() => {
        formik.setSubmitting(false)
        changeSuccess(false)

        if (successFunction) {
          successFunction()
        }
        onClose()
        resetForm()
      })
    }
  })

  const onCompanySelect = (__, values) => {
    setSelectedCompany(values)
    const idCompany = values ? values.id : ''
    const nameCompany = values ? values.business_name : ''
    formik.setFieldValue('business_id', idCompany)
    formik.setFieldValue('business_name', nameCompany)
    setSelectedCons(null)
  }

  const onConstructionChange = (__, values) => {
    setSelectedCons(values)
    formik.setFieldValue('construction_id', values?.id || '')
    formik.setFieldValue('construction_name', values?.name || '')
  }

  useEffect(() => {
    if (formik.values.shift_id && type === 'CREATE') {
      const current = shiftList.find(
        (item) => item.id === parseInt(formik.values.shift_id, 10)
      )
      formik.setFieldValue('shift_id', current.id)
      formik.setFieldValue('shift_name', current.name)

      const currentStartTime = current.start_time.split(':')
      const currentEndTime = current.end_time.split(':')
      const startHour = currentStartTime[0]
      const startMinute = currentStartTime[1]
      const tempStartDate = new Date(formik.values.start_date)
      tempStartDate.setHours(startHour)
      tempStartDate.setMinutes(startMinute)
      const tempEndDate = new Date(formik.values.end_date)
      tempEndDate.setHours(currentEndTime[0])
      tempEndDate.setMinutes(currentEndTime[1])

      formik.setFieldValue('start_date', tempStartDate)
      formik.setFieldValue('end_date', tempEndDate)
    }
  }, [formik.values.shift_id])

  useEffect(() => {
    changeDateTrigger(new Date(formik.values.date))
    const targetDate = new Date(formik.values.date)
    const year = targetDate.getFullYear()
    const month = targetDate.getMonth()
    const dayNumber = targetDate.getDate()
    const tempStartDate = new Date(formik.values.start_date)
    const tempEndDate = new Date(formik.values.end_date)

    tempStartDate.setFullYear(year)
    tempStartDate.setMonth(month)
    tempStartDate.setDate(dayNumber)

    tempEndDate.setFullYear(year)
    tempEndDate.setMonth(month)
    tempEndDate.setDate(dayNumber)

    formik.setFieldValue('start_date', tempStartDate)
    formik.setFieldValue('end_date', tempEndDate)
  }, [formik.values.date])

  useEffect(() => {
    if (type === 'CREATE' && user) {
      formik.setFieldValue('assigned_id', user.id)
      formik.setFieldValue('created_by', user.id)
    }
    if (type === 'UPDATE' && companies.length > 0) {
      const targetCompany = companies.find(
        (item) => item.id === formik.values.business_id
      )
      setSelectedCompany(targetCompany)
      const listCons = targetCompany?.constructions
      setSelectedCons(
        listCons?.find((item) => item.id === formik.values.construction_id)
      )
    }
  }, [type, user, companies])

  useEffect(() => {
    if (open) {
      dispatch(companiesActions.getCompanies({ state: 'CREATED' }, false)).then(
        (list) => {
          setCompanies(list)
        }
      )
      dispatch(commonActions.getEventTypes())
      dispatch(commonActions.getShiftList())
    }
  }, [open])

  useEffect(() => {
    const { type_id } = formik.values
    if (type_id && eventTypes.length > 0) {
      const currentType = eventTypes.find(
        (item) => item.id === parseInt(type_id, 10)
      )
      formik.setFieldValue('type_description', currentType.description)
    } else {
      formik.setFieldValue('type_description', '')
      enqueueSnackbar('Selecciona una empresa', {
        autoHideDuration: 1500,
        variant: 'info'
      })
    }
  }, [formik.values.type_id, eventTypes])

  const getIsVisit = (form) => {
    if (form.type_description === 'TAREA') return true

    if (
      form.business_id &&
      form.business_name &&
      form.construction_id &&
      form.construction_name
    ) {
      return true
    }
    return false
  }

  useEffect(() => {
    if (formik.values.type_description === 'TAREA') {
      formik.setFieldValue('business_id', null)
      formik.setFieldValue('business_name', null)
      setSelectedCompany(null)

      formik.setFieldValue('construction_id', null)
      formik.setFieldValue('construction_name', null)
      setSelectedCons(null)

      setIsVisit(false)
    }
  }, [formik.values.type_description, isVisit])

  useEffect(() => {
    if (formik.isSubmitting && !formik.isValid) {
      enqueueSnackbar('Completa los campos requeridos', {
        autoHideDuration: 1500,
        variant: 'info'
      })
    }
  }, [!formik.isValid, formik.isSubmitting])

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <Box>
        {reschedule && (
          <Box paddingBottom="10px">
            <Alert severity="warning">
              <strong>Este evento será reprogramado</strong>
            </Alert>
          </Box>
        )}
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box display="flex" alignItems="center">
              <Typography style={{ marginRight: '10px' }}>
                Asignado a:
              </Typography>
              <Avatar>A</Avatar>
              <Typography
                style={{ marginLeft: '10px' }}
              >{`${user?.names} ${user?.paternal_surname}`}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Select
              label="Jornada"
              name="shift_id"
              required
              value={formik.values.shift_id}
              onChange={formik.handleChange}
              error={Boolean(formik.errors.shift_id)}
              helperText={formik.errors.shift_id}
            >
              <option value="">SELECCIONE JORNADA </option>
              {shiftList.map((item) => (
                <option key={`shift-type-${item.id}`} value={item.id}>
                  {item.name}
                </option>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12}>
            <DatePicker
              disabledFuture={false}
              label="Fecha"
              required
              value={formik.values.date}
              onChange={(selectedDate) => {
                formik.setFieldValue('date', selectedDate)
              }}
              disabledPast={true}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <InputLabel required>Hora de inicio</InputLabel>
            <TimePicker
              value={formik.values.start_date}
              onChange={(date) => {
                if (date < formik.values.end_date) {
                  formik.setFieldValue('start_date', new Date(date))
                }
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <InputLabel required>Hora de fin</InputLabel>
            <TimePicker
              value={formik.values.end_date}
              onChange={(date) => {
                if (date > formik.values.start_date) {
                  formik.setFieldValue('end_date', new Date(date))
                }
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Duración"
              inputProps={{ readOnly: true }}
              value={`${differenceInHours(
                new Date(formik.values.end_date),
                new Date(formik.values.start_date)
              )} hrs`}
            />
          </Grid>
          <Grid item xs={12}>
            <Select
              label="Tipo de evento"
              name="type_id"
              required
              value={formik.values.type_id}
              onChange={formik.handleChange}
              error={Boolean(formik.errors.type_id)}
              helperText={formik.errors.type_id}
            >
              <option value="">SELECCIONE TIPO</option>
              {eventTypes.map((item) => (
                <option value={item.id} key={`event-type-${item}`}>
                  {item.description}
                </option>
              ))}
            </Select>
          </Grid>

          {formik.values.type_description === 'VISITA' && (
            <>
              <Grid item xs={12}>
                <Autocomplete
                  options={companies}
                  value={selectedCompany || ''}
                  getOptionSelected={(option, value) => option.id === value.id}
                  getOptionLabel={(option) => option.business_name || ''}
                  onChange={onCompanySelect}
                  disabled={formik.values.type_description === 'TAREA'}
                  required={isVisit}
                  renderOption={(option) => (
                    <CompanyRow.Autocomplete company={option} />
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Selecciona empresa"
                      placeholder="Nombre de empresa"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Autocomplete
                  options={
                    selectedCompany
                      ? selectedCompany.constructions.filter(
                          (item) =>
                            item.status !== 'NO_VIGENTE' &&
                            item.state !== 'DELETED'
                        )
                      : []
                  }
                  value={selectedCons || ''}
                  getOptionSelected={(option, value) => option.id === value.id}
                  getOptionLabel={(option) => option.name || ''}
                  onChange={onConstructionChange}
                  disabled={formik.values.type_description === 'TAREA'}
                  required={isVisit}
                  renderOption={(option) => (
                    <Box>
                      <Typography>
                        <strong>{option.name || ''}</strong>
                      </Typography>
                    </Box>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Selecciona obra"
                      placeholder="Nombre de obra"
                    />
                  )}
                />
              </Grid>
            </>
          )}
          <Grid item xs={12}>
            <TextArea
              name="observation"
              value={formik.values.observation}
              required
              label="Observaciones"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={Boolean(formik.errors.observation)}
              helperText={formik.errors.observation}
            />
          </Grid>
        </Grid>
        <Box textAlign="center">
          <Button variant="outlined" onClick={onClose}>
            Cancelar
          </Button>
          <SubmitButton
            loading={formik.isSubmitting}
            onClick={formik.handleSubmit}
            disabled={!formik.isValid || !getIsVisit(formik.values)}
            success={success}
          >
            {`${type === 'CREATE' ? 'Crear' : 'Actualizar'} evento`}
          </SubmitButton>
        </Box>
      </Box>
    </Dialog>
  )
}

EventForm.defaultProps = {
  type: 'CREATE',
  reschedule: false
}

export default memo(EventForm)
