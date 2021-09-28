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
    <Grid item xs={6}>
      <TextField
        label="Año en curso"
        placeholder={`Ejemplo: ${new Date().getFullYear()}`}
        required
        name="yearInProgress"
        value={form.values.yearInProgress}
        onChange={form.handleChange}
        error={
          form.touched.yearInProgress && Boolean(form.errors.yearInProgress)
        }
        helperText={form.touched.yearInProgress && form.errors.yearInProgress}
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
        error={
          form.touched.levelInProgress && Boolean(form.errors.levelInProgress)
        }
        helperText={form.touched.levelInProgress && form.errors.levelInProgress}
      />
    </Grid>
    <Grid item xs={6}>
      <TextField
        label="Ramos totales"
        required
        name="totalCourses"
        value={form.values.totalCourses}
        onChange={form.handleChange}
        error={form.touched.totalCourses && Boolean(form.errors.totalCourses)}
        helperText={form.touched.totalCourses && form.errors.totalCourses}
      />
    </Grid>
    <Grid item xs={6}>
      <TextField
        label="Ramos desprobados"
        required
        name="failedCourses"
        value={form.values.failedCourses}
        onChange={form.handleChange}
        error={form.touched.failedCourses && Boolean(form.errors.failedCourses)}
        helperText={form.touched.failedCourses && form.errors.failedCourses}
      />
    </Grid>
    <Grid item xs={12} md={6}>
      <TextField
        label="Nombre de empresa"
        required
        name="businessName"
        value={form.values.businessName}
        onChange={form.handleChange}
        error={form.touched.businessName && Boolean(form.errors.businessName)}
        helperText={form.touched.businessName && form.errors.businessName}
      />
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
