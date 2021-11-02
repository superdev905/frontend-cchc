import * as Yup from 'yup'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import { Box, Grid, Typography } from '@material-ui/core'
import { Dialog } from '../../Shared'
import { SubmitButton, TextArea, Button, Select } from '../../UI'
import { useSuccess } from '../../../hooks'
import constructionsActions from '../../../state/actions/constructions'

const validationSchema = Yup.object().shape({
  observations: Yup.string().required('Ingrese observacion'),
  relevant: Yup.string().required('Ingrese observacion')
})

const ReportModal = ({ open, onClose, submitFunction, successFunction }) => {
  const dispatch = useDispatch()
  const { visit } = useSelector((state) => state.assistance)
  const { contacts } = useSelector((state) => state.constructions)
  const { success, changeSuccess } = useSuccess()

  const formik = useFormik({
    validateOnMount: true,
    validationSchema,
    initialValues: {
      observations: '',
      relevant: ''
    },
    onSubmit: (values) => {
      submitFunction(values).then(() => {
        formik.setSubmitting(false)
        changeSuccess(true, () => {
          onClose()
          if (successFunction) {
            successFunction()
          }
        })
      })
    }
  })

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
          <Select
            label="Destinatarios"
            required
            name="recipient"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.recipient}
            helperText={formik.touched.recipient && formik.errors.recipient}
            error={formik.touched.recipient && Boolean(formik.errors.recipient)}
          >
            <option value="">Seleccione destinario</option>
            {contacts.map((item) => (
              <option value={item}>{item.full_name}</option>
            ))}
          </Select>
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
          onClick={formik.handleSubmit}
          loading={formik.isSubmitting}
          disabled={!formik.isValid || formik.isSubmitting}
          success={success}
        >
          Crear reporte
        </SubmitButton>
      </Box>
    </Dialog>
  )
}
export default ReportModal
