import { FiTrash2 as DeleteIcon } from 'react-icons/fi'
import { Box, Grid, IconButton } from '@material-ui/core'
import { TextArea } from '../../UI'
import useStyles from './styles'

const CaseAdditionalForm = ({ formik, onReset }) => {
  const classes = useStyles()

  return (
    <Box my={2} p={2} className={classes.newCase}>
      <Box mb={2}>Se creará nuevo caso social</Box>
      <IconButton className={classes.deleteIcon} onClick={onReset}>
        <DeleteIcon />
      </IconButton>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextArea
            rowsMin={2}
            label="Tipo de Solicitud"
            name="requestType"
            value={formik.values.requestType}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.requestType && Boolean(formik.errors.requestType)
            }
            helperText={formik.touched.requestType && formik.errors.requestType}
          />
        </Grid>
      </Grid>
    </Box>
  )
}

export default CaseAdditionalForm
