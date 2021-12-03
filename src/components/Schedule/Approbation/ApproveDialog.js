import * as Yup from 'yup'
import { useFormik } from 'formik'
import { Box, Grid, Typography } from '@material-ui/core'
import { DatePicker, Dialog } from '../../Shared'
import { Select } from '../../UI'

const validationSchema = Yup.object().shape({
  date: Yup.date().nullable().required('Seleccione fecha'),
  status: Yup.string().required('Seleccione estado'),
  modality: Yup.string().required('Seleccione estado'),
  comments: Yup.string().required('Ingrese comentarios')
})

const ApproveDialog = ({ open, onClose }) => {
  const { isMobile } = useSelector((state) => state.ui)
  const formik = useFormik({
    validateOnMount: true,
    validateOnChange: true,
    validationSchema,
    initialValues: {
      date: null,
      modality: ''
    }
  })
  return (
    <Dialog open={open} onClose={onClose} fullScreen={isMobile} fullWidth>
      <Box>
        <Typography>Aprobación</Typography>
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <DatePicker
                required
                label="Fecha"
                value={formik.values.date}
                onChange={(targetDate) => {
                  formik.setFieldValue('date', targetDate)
                }}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <Select
                required
                name="modality"
                label="Modalidad"
                value={formik.values.modality}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.modality && Boolean(formik.errors.modality)
                }
                helperText={formik.touched.modality && formik.errors.modality}
              >
                <option value="">Seleccione estado</option>
                {['ONLINE', 'PRESENCIAL'].map((item) => (
                  <option key={`option-modality-${item}`} value={item}>
                    {item}
                  </option>
                ))}
              </Select>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Dialog>
  )
}
ApproveDialog.propTypes = {}

export default ApproveDialog
