import { capitalize } from 'lodash'
import { Grid } from '@material-ui/core'
import { Select } from '../../UI'

const statusList = ['APROBADA', 'RECHAZADA', 'CONDICIONAL']

const PmaTracking = ({ form }) => (
  <Grid container spacing={2}>
    <Grid item xs={12}>
      <Select
        label="Beneficio"
        required
        name="benefitId"
        value={form.values.benefitId}
        onChange={form.handleChange}
      >
        <option value="">Seleccione beneficio</option>
      </Select>
    </Grid>
    <Grid item xs={12}>
      <Select
        label="Estado de beca"
        required
        name="scholarshipStatus"
        value={form.values.scholarshipStatus}
        onChange={form.handleChange}
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
