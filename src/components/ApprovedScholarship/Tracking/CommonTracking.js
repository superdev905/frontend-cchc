import { capitalize } from 'lodash'
import { Grid } from '@material-ui/core'
import { Select, TextField } from '../../UI'

const statusList = ['APROBADA', 'RECHAZADA', 'CONDICIONAL']

const PmaTracking = ({ form, benefits }) => (
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
        {benefits.map((item) => (
          <option key={`benefit-id-${item.id}`} value={item.id}>
            {item.name}
          </option>
        ))}
      </Select>
    </Grid>
    <Grid item xs={6}>
      <TextField
        label="Año en curso"
        placeholder={`Ejemplo: ${new Date().getFullYear()}`}
        required
        name="yearInProgress"
        value={form.values.yearInProgress}
        onChange={form.handleChange}
      />
    </Grid>
    <Grid item xs={6}>
      <TextField
        label="Nivel en curso"
        placeholder={`Ejemplo: I SEMETRE`}
        required
        name="levelInProgress"
        value={form.values.levelInProgress}
        onChange={form.handleChange}
      />
    </Grid>
    <Grid item xs={6}>
      <TextField
        label="Ramos totales"
        required
        name="totalCourses"
        value={form.values.totalCourses}
        onChange={form.handleChange}
      />
    </Grid>
    <Grid item xs={6}>
      <TextField
        label="Ramos desprobados"
        required
        name="failedCourses"
        value={form.values.failedCourses}
        onChange={form.handleChange}
      />
    </Grid>
    <Grid item xs={12} md={6}>
      <TextField
        label="Nombre de empresa"
        required
        name="businessName"
        value={form.values.businessName}
        onChange={form.handleChange}
      />
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
