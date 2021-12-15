import * as Yup from 'yup'
import { useFormik } from 'formik'
import { Grid, Typography } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { Dialog } from '../../Shared'
import { Select } from '../../UI'

const validationSchema = Yup.object().shape({
  areaId: Yup.number().required('Seleccione area')
})

const QuestionModal = ({ open, onCLose }) => {
  const { isMobile } = useSelector((state) => state.ui)
  const formik = useFormik({
    validateOnMount: true,
    validationSchema,
    initialValues: {
      areaId: ''
    }
  })
  return (
    <Dialog open={open} onClose={onCLose} fullWidth fullScreen={isMobile}>
      <Box>
        <Typography>Nueva pregunta</Typography>
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Select name="areaId" value={formik.values.areaId}>
                <option value="">Seleccione area</option>
              </Select>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Dialog>
  )
}

export default QuestionModal
