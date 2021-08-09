import { memo, useEffect, useState } from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { differenceInHours } from 'date-fns'
import { useSelector, useDispatch } from 'react-redux'
import { Avatar, Box, Grid, Typography } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import companiesActions from '../../state/actions/companies'
import commonActions from '../../state/actions/common'
import { DatePicker, Dialog } from '../Shared'
import { Button, Select, SubmitButton, TextArea, TextField } from '../UI'

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
  business_id: Yup.number().required('Seleccione empresa'),
  construction_id: Yup.number().required('Seleccione obra'),
  business_name: Yup.string().required('Seleccione nombre de empresa'),
  construction_name: Yup.string().required('Seleccione nombre de obra'),
  observation: Yup.string().required('Ingres observación de evento')
})

const EventForm = ({
  open,
  onClose,
  data,
  type,
  event,
  submitFunction,
  successFunction
}) => {
  const dispatch = useDispatch()
  const [selectedCompany, setSelectedCompany] = useState(null)
  const [selectedCons, setSelectedCons] = useState(null)
  const { user } = useSelector((state) => state.auth)
  const { eventTypes, shiftList } = useSelector((state) => state.common)
  const [companies, setCompanies] = useState([])

  const formik = useFormik({
    validateOnMount: true,
    validationSchema,
    initialValues: {
      type_id: type === 'CREATE' ? '' : event.type_id,
      status: type === 'CREATE' ? 'PROGRAMADA' : event.status,
      date: type === 'CREATE' ? data.start : event.date,
      start_date: type === 'CREATE' ? data.start : event.start_date,
      end_date: type === 'CREATE' ? data.end : event.end_date,
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
      submitFunction(values).then(() => {
        formik.setSubmitting(false)
        resetForm()
        onClose()
        if (successFunction) {
          successFunction()
        }
      })
    }
  })

  const getHours = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString()
  }
  const onCompanySelect = (__, values) => {
    setSelectedCompany(values)
    if (values) {
      formik.setFieldValue('business_id', values.id)
      formik.setFieldValue('business_name', values.business_name)
      setSelectedCons(null)
    }
  }

  const onConstructionChange = (__, values) => {
    setSelectedCons(values)
    if (values) {
      formik.setFieldValue('construction_id', values.id)
      formik.setFieldValue('construction_name', values.name)
    }
  }

  useEffect(() => {
    dispatch(companiesActions.getCompanies({}, false)).then((list) => {
      setCompanies(list)
    })
    dispatch(commonActions.getEventTypes())
    dispatch(commonActions.getShiftList())

    if (type === 'CREATE' && user) {
      formik.setFieldValue('assigned_id', user.id)
      formik.setFieldValue('created_by', user.id)
    }
  }, [open, type, user])

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <Typography>Nuevo evento</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField placeholder="Título del evento" />
        </Grid>
        <Grid item xs={12}>
          <Box display="flex" alignItems="center">
            <Typography style={{ marginRight: '10px' }}>Asignado a:</Typography>
            <Avatar>A</Avatar>
            <Typography
              style={{ marginLeft: '10px' }}
            >{`${user?.names} ${user?.paternal_surname}`}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <DatePicker
            label="Fecha"
            required
            value={formik.values.date}
            onChange={(dateSelected) => {
              formik.setFieldValue('date', dateSelected)
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Hora de inicio"
            inputProps={{ readOnly: true }}
            value={getHours(formik.values.start_date)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Hora de fin"
            inputProps={{ readOnly: true }}
            value={getHours(formik.values.end_date)}
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
            label="Tipo"
            name="type_id"
            required
            value={formik.values.type_id}
            onChange={formik.handleChange}
            error={formik.touched.type_id && Boolean(formik.errors.type_id)}
            helperText={formik.touched.type_id && formik.errors.type_id}
          >
            <option value="">Seleccione tipo </option>
            {eventTypes.map((item) => (
              <option value={item.id} key={`event-type-${item.id}`}>
                {item.description}
              </option>
            ))}
          </Select>
        </Grid>
        <Grid item xs={12}>
          <Select
            label="Jornada"
            name="shift_id"
            required
            value={formik.values.shift_id}
            onChange={formik.handleChange}
            error={formik.touched.shift_id && Boolean(formik.errors.shift_id)}
            helperText={formik.touched.shift_id && formik.errors.shift_id}
          >
            <option value="">Seleccione jornada </option>
            {shiftList.map((item) => (
              <option key={`shift-type-${item.id}`} value={item.id}>
                {item.name}
              </option>
            ))}
          </Select>
        </Grid>
        <Grid item xs={12} md={6}>
          <Autocomplete
            options={companies}
            value={selectedCompany || ''}
            getOptionLabel={(option) => option.business_name}
            onChange={onCompanySelect}
            renderOption={(option) => (
              <Box>
                <Typography>
                  <strong>{option.business_name}</strong>
                </Typography>
                <Typography>{`Rut: ${option.rut}`}</Typography>
              </Box>
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
        <Grid item xs={12} md={6}>
          <Autocomplete
            options={selectedCompany?.constructions || []}
            value={selectedCons || ''}
            getOptionLabel={(option) => option.name}
            onChange={onConstructionChange}
            renderOption={(option) => (
              <Box>
                <Typography>
                  <strong>{option.name}</strong>
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

        <Grid item xs={12}>
          <TextArea
            name="observation"
            value={formik.values.observation}
            required
            label="Observaciones"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.observation && Boolean(formik.errors.observation)
            }
            helperText={formik.touched.observation && formik.errors.observation}
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
          disabled={!formik.isValid || formik.isSubmitting}
        >
          {`${type === 'CREATE' ? 'Crear' : 'Actualizar'} evento`}
        </SubmitButton>
      </Box>
    </Dialog>
  )
}

EventForm.defaultProps = {
  type: 'CREATE'
}

export default memo(EventForm)
