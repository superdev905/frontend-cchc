import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useDispatch } from 'react-redux'
import { Box, Grid, Typography } from '@material-ui/core'
import { DatePicker, Dialog } from '../Shared'
import { Button, SubmitButton, TextField } from '../UI'
import migrantsActions from '../../state/actions/migrants'

const validationSchema = Yup.object().shape({
  date: Yup.date().required('Seleccione fecha').nullable()
})

const BenefitDIalog = ({ open, onClose, benefit, migrantId }) => {
  const dispatch = useDispatch()
  const formik = useFormik({
    validationSchema,
    validateOnMount: true,
    initialValues: {
      date: benefit?.date || null
    },
    onSubmit: (values) => {
      dispatch(
        migrantsActions.updateDeliveredBenefit(benefit.id, {
          ...values,
          isCompleted: Boolean(values.date)
        })
      )
        .then(() => {
          formik.setSubmitting(false)
          onClose()
          dispatch(migrantsActions.getMigrantDetails(migrantId))
        })
        .catch(() => {
          formik.setSubmitting(false)
        })
    }
  })
  return (
    <Dialog open={open} onClose={onClose}>
      <Box mt={2}>
        <Typography
          align="center"
          style={{ fontSize: '18', fontWeight: 'bold' }}
        >
          Actualiza beneficio
        </Typography>
        <Box mt={2}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField label="Nombre" value={benefit.benefit.name} />
            </Grid>
            <Grid item xs={12}>
              <DatePicker
                disabledFuture={false}
                value={formik.values.date}
                error={Boolean(formik.errors.date)}
                helperText={formik.errors.date}
                onChange={(e) => {
                  formik.setFieldValue('date', e)
                }}
              />
            </Grid>
          </Grid>
          <Box mt={2} textAlign={'center'}>
            <Button variant={'outlined'}>Cancelar</Button>
            <SubmitButton
              onClick={formik.handleSubmit}
              disabled={!formik.isValid}
              loading={formik.isSubmitting}
            >
              Actualizar
            </SubmitButton>
          </Box>
        </Box>
      </Box>
    </Dialog>
  )
}

export default BenefitDIalog
