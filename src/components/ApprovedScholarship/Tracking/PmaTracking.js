import { capitalize } from 'lodash'
import { Grid } from '@material-ui/core'
import { Select } from '../../UI'

const statusList = ['APROBADA', 'RECHAZADA', 'EN PROCESO']

const PmaTracking = ({ form, benefits }) => (
  <Grid container spacing={2}>
    <Grid item xs={12}>
      <Select
        label="Beneficio"
        required
        name="benefitId"
        value={form.values.benefitId}
        onChange={form.handleChange}
        error={form.touched.benefitId && Boolean(form.errors.benefitId)}
        helperText={form.touched.benefitId && form.errors.benefitId}
      >
        <option value="">Seleccione beneficio</option>
        {benefits.map((item) => (
          <option key={`benefit-id-${item.id}`} value={item.id}>
            {item.name}
          </option>
        ))}
      </Select>
    </Grid>
    <Grid item xs={12}>
      <Select
        label="Estado de beca"
        required
        name="scholarshipStatus"
        value={form.values.scholarshipStatus}
        onChange={form.handleChange}
        error={
          form.touched.scholarshipStatus &&
          Boolean(form.errors.scholarshipStatus)
        }
        helperText={
          form.touched.scholarshipStatus && form.errors.scholarshipStatus
        }
      >
        <option value="">Seleccione estado</option>
        {statusList.map((item) => (
          <option value={item}>{capitalize(item)}</option>
        ))}
      </Select>
    </Grid>
  </Grid>
)

export default PmaTracking
