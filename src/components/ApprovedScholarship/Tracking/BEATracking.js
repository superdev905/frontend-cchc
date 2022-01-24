import { capitalize } from 'lodash'
import { Grid } from '@material-ui/core'
import { Select, TextField, TextArea } from '../../UI'
import { decisionList } from '../../../config'

const statusList = ['APROBADA', 'RECHAZADA', 'CONDICIONAL']

const PmaTracking = ({ form /* , benefits  */ }) => (
  <Grid container spacing={2}>
    <Grid item xs={12}>
      {/* <Select
        label="Beneficio"
        required
        name="benefitId"
        value={form.values.benefitId}
        onChange={form.handleChange}
        error={form.touched.benefitId && Boolean(form.errors.benefitId)}
        helperText={form.touched.benefitId && form.errors.benefitId}
      >
        <option value="">SELECCIONE BENEFICIO</option>
        {benefits.map((item) => (
          <option key={`benefit-id-${item.id}`} value={item.id}>
            {item.name}
          </option>
        ))}
      </Select> */}
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
        label="Promedio Primer Semestre"
        required
        name="avgScoreFirstSemester"
        value={form.values.avgScoreFirstSemester}
        onChange={form.handleChange}
        error={
          form.touched.avgScoreFirstSemester &&
          Boolean(form.errors.avgScoreFirstSemester)
        }
        helperText={
          form.touched.avgScoreFirstSemester &&
          form.errors.avgScoreFirstSemester
        }
      />
    </Grid>
    <Grid item xs={6}>
      <TextField
        label="Promedio Segundo Semestre"
        required
        name="avgScoreSecondSemester"
        value={form.values.avgScoreSecondSemester}
        onChange={form.handleChange}
        error={
          form.touched.avgScoreSecondSemester &&
          Boolean(form.errors.avgScoreSecondSemester)
        }
        helperText={
          form.touched.avgScoreFirstSemester &&
          form.errors.avgScoreSecondSemester
        }
      />
    </Grid>
    <Grid item xs={6}>
      <Select
        label="Asiste a una activadad obligatoria"
        required
        name="mandatoryActivity"
        value={form.values.mandatoryActivity}
        onChange={form.handleChange}
        error={
          form.touched.mandatoryActivity &&
          Boolean(form.errors.mandatoryActivity)
        }
        helperText={
          form.touched.mandatoryActivity && form.errors.mandatoryActivity
        }
      >
        <option value="">SELECCIONE OPCIÓN</option>
        {decisionList.map((item) => (
          <option value={item}>{capitalize(item)}</option>
        ))}
      </Select>
    </Grid>
    <Grid item xs={6}>
      <Select
        label="Entrevista psicólogo"
        required
        name="psychologicalInterview"
        value={form.values.psychologicalInterview}
        onChange={form.handleChange}
        error={
          form.touched.psychologicalInterview &&
          Boolean(form.errors.psychologicalInterview)
        }
        helperText={
          form.touched.psychologicalInterview &&
          form.errors.psychologicalInterview
        }
      >
        <option value="">SELECCIONE OPCIÓN</option>
        {decisionList.map((item) => (
          <option value={item}>{capitalize(item)}</option>
        ))}
      </Select>
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
        <option value="">SELECCIONE OPCIÓN</option>
        {statusList.map((item) => (
          <option value={item}>{capitalize(item)}</option>
        ))}
      </Select>
    </Grid>
    <Grid item xs={12}>
      <TextArea
        label="Observación"
        required
        name="observations"
        value={form.values.observations}
        onChange={form.handleChange}
        error={form.touched.observations && Boolean(form.errors.observations)}
        helperText={form.touched.observations && form.errors.observations}
      />
    </Grid>
  </Grid>
)

export default PmaTracking
