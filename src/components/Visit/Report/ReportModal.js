import * as Yup from 'yup'
import { useEffect, useState } from 'react'
import { useSnackbar } from 'notistack'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import { Box, Chip, Grid, makeStyles, Typography } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import { Dialog } from '../../Shared'
import { SubmitButton, TextArea, Button, TextField, InputLabel } from '../../UI'
import { useSuccess } from '../../../hooks'
import constructionsActions from '../../../state/actions/constructions'
import assistanceActions from '../../../state/actions/assistance'
import { isValidNumber } from '../../../validations'

const useStyles = makeStyles((theme) => ({
  itemWrapper: {
    border: `1px solid ${theme.palette.gray.gray500}`,
    borderRadius: 5,
    marginBottom: 8,
    padding: '5px 8px'
  }
}))

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
  const classes = useStyles()
  const { idVisit } = useParams()
  const { enqueueSnackbar } = useSnackbar()
  const [reportItems, setReportItems] = useState([])
  const { isMobile } = useSelector((state) => state.ui)
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
      formik.isSubmitting(true)
      const formData = { ...values }
      formData.contacts = formData.contacts.map((item) => ({
        contact_id: item.id,
        contact_names: item.full_name,
        contact_email: item.email
      }))
      formData.items = reportItems.map((item) => ({
        item_id: item.itemId,
        item_name: item.itemName,
        value: item.value
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

  const handleChangeItem = (e, id) => {
    setReportItems(
      reportItems.map((item) =>
        item.itemId === id
          ? {
              ...item,
              value: isValidNumber(e.target.value)
            }
          : item
      )
    )
  }

  const getItemsValidation = () =>
    reportItems.filter((item) => item.value === '').length > 0

  useEffect(() => {
    if (open) {
      fetchContacts()
      dispatch(assistanceActions.getVisitReportItems(idVisit))
        .then((items) => {
          if (type === 'UPDATE') {
            const list = []
            data.items.forEach((reportItem) => {
              const currentItem = items.find(
                (value) => value.id === reportItem.item_id
              )
              list.push({
                itemId: currentItem.id,
                itemName: currentItem.name,
                isComplete: false,
                value: reportItem.value
              })
            })
            setReportItems(list)
          } else {
            setReportItems(
              items.map((item) => ({
                itemId: item.id,
                itemName: item.name,
                isComplete: false,
                value: item.value
              }))
            )
          }
        })
        .catch(() => {
          setReportItems([])
        })
      dispatch(assistanceActions.getReportItems())
    }
  }, [open])

  return (
    <Dialog open={open} onClose={onClose} fullScreen={isMobile}>
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
        <Grid item xs={12}>
          <Box>
            <InputLabel required>Items</InputLabel>
          </Box>
          <Box>
            <Grid container>
              {reportItems.map((item, index) => (
                <Grid key={`report-item-${index}`} item xs={12}>
                  <Box className={classes.itemWrapper}>
                    <Grid container alignItems="center">
                      <Grid item xs={10}>
                        <Typography>{item.itemName}</Typography>
                      </Grid>
                      <Grid item xs={2}>
                        <TextField
                          type="number"
                          value={item.value}
                          onChange={(e) => handleChangeItem(e, item.itemId)}
                          error={item.value === ''}
                          inputProps={{ readOnly: true }}
                        />
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Grid>
      </Grid>
      <Box textAlign="center" marginTop="15px">
        <Button onClick={onClose} variant="outlined">
          Cancelar
        </Button>
        <SubmitButton
          loading={formik.isSubmitting}
          onClick={formik.handleSubmit}
          disabled={
            !formik.isValid || getItemsValidation() || formik.isSubmitting
          }
          success={success}
        >{`${
          type === 'UPDATE' ? 'Actualizar' : 'Agregar'
        } Reporte`}</SubmitButton>
      </Box>
    </Dialog>
  )
}
export default ReportModal
