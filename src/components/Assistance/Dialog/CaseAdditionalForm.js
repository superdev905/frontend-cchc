import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Grid } from '@material-ui/core'
import commonActions from '../../../state/actions/common'
import { Select } from '../../UI'
import useStyles from './styles'

const CaseAdditionalForm = ({ formik }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { regions } = useSelector((state) => state.common)

  useEffect(() => {
    dispatch(commonActions.getRegions())
  }, [])
  return (
    <Box my={2} p={2} className={classes.newCase}>
      <Box mb={2}>Se creará nuevo caso social</Box>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6} lg={4}>
          <Select
            label="Oficina"
            name="office"
            required
            value={formik.values.office}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.office && Boolean(formik.errors.office)}
            helperText={formik.touched.office && formik.errors.office}
          >
            <option value="">-SELECCIONE OFICINA-</option>
            {regions.map((item, i) => (
              <option key={`case_id-${i}-${item}`} value={item.name}>
                {item.name}
              </option>
            ))}
          </Select>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Select
            label="Zona"
            name="zone"
            required
            value={formik.values.zone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.zone && Boolean(formik.errors.zone)}
            helperText={formik.touched.zone && formik.errors.zone}
          >
            <option value="">-SELECCIONE ZONA-</option>
            {regions.map((item, i) => (
              <option key={`case_id-${i}-${item}`} value={item.name}>
                {item.name}
              </option>
            ))}
          </Select>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Select
            label="Delegación"
            name="delegation"
            required
            value={formik.values.delegation}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.delegation && Boolean(formik.errors.delegation)
            }
            helperText={formik.touched.delegation && formik.errors.delegation}
          >
            <option value="">-SELECCIONE DELEGACIÓN-</option>
            {regions.map((item, i) => (
              <option key={`case_id-${i}-${item}`} value={item.name}>
                {item.name}
              </option>
            ))}
          </Select>
        </Grid>
      </Grid>
    </Box>
  )
}

export default CaseAdditionalForm
