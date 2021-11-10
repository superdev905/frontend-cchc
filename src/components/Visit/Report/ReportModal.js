import * as Yup from 'yup'
import { useEffect } from 'react'
import { useSnackbar } from 'notistack'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import { Box, Chip, Grid, Typography } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import { Dialog } from '../../Shared'
import { SubmitButton, TextArea, Button, TextField } from '../../UI'
import { useSuccess } from '../../../hooks'
import constructionsActions from '../../../state/actions/constructions'

const validationSchema = Yup.object().shape({
  observations: Yup.string().required('Ingrese observacion'),
  relevant: Yup.string().required('Ingrese observacion')
})

const ReportModal = ({
  open,
  onClose,
  type,
  data,
  submitFunction,
  successFunction
}) => {
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()

  const { visit } = useSelector((state) => state.assistance)
  const { contacts } = useSelector((state) => state.constructions)
  const { success, changeSuccess } = useSuccess()

  const formik = useFormik({
    validateOnMount: true,
    validationSchema,
    initialValues: {
      observations: type === 'UPDATE' ? data.observations : '',
      relevant: type === 'UPDATE' ? data.relevant : '',
      contacts: type === 'UPDATE' ? [] : []
    },
    onSubmit: (values) => {
      const formData = { ...values }
      formData.contacts = formData.contacts.map((item) => ({
        contact_id: item.id,
        contact_names: item.full_name,
        contact_email: item.email
      }))
      submitFunction(formData)
        .then(() => {
          formik.setSubmitting(false)
          changeSuccess(true, () => {
            onClose()
            if (successFunction) {
              successFunction()
            }
          })
        })
        .catch((err) => {
          enqueueSnackbar(err, { variant: 'error' })
        })
    }
  })

  useEffect(() => {
    if (type === 'UPDATE' && contacts.length > 0) {
      const newContact = []
      data.contacts.forEach((item) => {
        const currentContact = contacts.find(
          (contact) => contact.id === item.contact_id
        )
        newContact.push(currentContact)
      })
      formik.setFieldValue('contacts', newContact)
    }
  }, [type, contacts])

  const onContactSelect = (__, values) => {
    formik.setFieldValue('contacts', values)
  }

  const fetchContacts = () => {
    dispatch(constructionsActions.getContacts(visit.construction_id))
  }

  useEffect(() => {
    if (open) {
      fetchContacts()
    }
  }, [open])

  return (
    <Dialog open={open} onClose={onClose}>
      <Typography align="center" style={{ marginBottom: '15px' }} variant="h6">
        Generar reporte
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextArea
            label="Casos relevantes"
            required
            name="relevant"
            value={formik.values.relevant}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.relevant && Boolean(formik.errors.relevant)}
            helperText={formik.touched.relevant && formik.errors.relevant}
          />
        </Grid>

        <Grid item xs={12}>
          <Autocomplete
            multiple
            filterSelectedOptions
            id="contacts"
            options={contacts}
            value={formik.values.contacts}
            onChange={onContactSelect}
            getOptionLabel={(option) => option.full_name || ''}
            renderOption={(values) => (
              <Box>
                <Typography style={{ fontSize: 18, fontWeight: 'bold' }}>
                  {' '}
                  {`Nombre:  ${values.full_name}`}
                </Typography>
                <Typography
                  style={{ fontSize: 15, textTransform: 'capitalize' }}
                >
                  Cargo: {values.charge_name}{' '}
                </Typography>
              </Box>
            )}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip
                  variant="outlined"
                  label={`${option.full_name}-${option.charge_name}`}
                  {...getTagProps({ index })}
                />
              ))
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label="Destinatarios"
                required
                placeholder="Seleccione contactos"
                error={
                  formik.touched.contacts && Boolean(formik.errors.contacts)
                }
                helperText={formik.touched.contacts && formik.errors.contacts}
              />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <TextArea
            label="Observaciones"
            required
            name="observations"
            value={formik.values.observations}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.observations && Boolean(formik.errors.observations)
            }
            helperText={
              formik.touched.observations && formik.errors.observations
            }
          />
        </Grid>
      </Grid>
      <Box textAlign="center" marginTop="15px">
        <Button onClick={onClose} variant="outlined">
          Cancelar
        </Button>
        <SubmitButton
          loading={formik.isSubmitting}
          onClick={formik.handleSubmit}
          disabled={!formik.isValid}
          success={success}
        >{`${
          type === 'UPDATE' ? 'Actualizar' : 'Agregar'
        } Reporte`}</SubmitButton>
      </Box>
    </Dialog>
  )
}
export default ReportModal
