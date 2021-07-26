import * as Yup from 'yup'
import { useFormik } from 'formik'
import { Box, Grid } from '@material-ui/core'
import { DatePicker } from '../Shared'
import {
  Button,
  PageHeading,
  Select,
  SubmitButton,
  TextField,
  Wrapper
} from '../UI'
import { rutValidation } from '../../validations'

const validationSchema = Yup.object().shape({
  run: Yup.string()
    .required('Ingrese run')
    .test('validRUN', 'Ingrese run válido', (v) => rutValidation(v)),
  names: Yup.string().required('Ingrese nombres'),
  paternal_surname: Yup.string().required('Ingrese nombres'),
  maternal_surname: Yup.string().required('Ingrese nombres'),
  gender: Yup.string().required('Seleccione sexo'),
  born_date: Yup.date().required('Seleccione fecha de nacimiento'),
  scholarship: Yup.string().required('Seleccione escolaridad')
})

const EmployeeModal = ({ type, data }) => {
  const formik = useFormik({
    validateOnMount: true,
    validationSchema,
    initialValues: {
      run: type === 'UPDATE' ? data.run : '',
      names: type === 'UPDATE' ? data.names : '',
      paternal_surname: type === 'UPDATE' ? data.paternal_surname : '',
      maternal_surname: type === 'UPDATE' ? data.maternal_surname : '',
      born_date: type === 'UPDATE' ? data.born_date : '',
      gender: type === 'UPDATE' ? data.gender : ''
    }
  })
  return (
    <Wrapper>
      <Box>
        <PageHeading>Nuevo trabajador</PageHeading>
        <Box p={2}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6} lg={4}>
              <TextField
                label="Run"
                name="run"
                required
                value={formik.values.run}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <TextField
                label="Nombres"
                name="names"
                required
                value={formik.values.names}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <TextField
                label="Apellido paterno"
                name="paternal_surname"
                required
                value={formik.values.paternal_surname}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <TextField
                label="Apellido materno"
                name="maternal_surname"
                required
                value={formik.values.maternal_surname}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <DatePicker
                label="Fecha de nacimiento"
                required
                onChange={(date) => {
                  formik.setFieldValue('born_date', date)
                }}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Select
                label="Sexo"
                name="gender_id"
                required
                value={formik.values.gender_id}
                onChange={formik.handleChange}
              >
                <option value="">Seleccione sexo</option>
                {['MASCULINO', 'FEMENINO', 'INDETERMINADO'].map((item, i) => (
                  <option key={`gender-${i}-${item}`} value={item}>
                    {item}
                  </option>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Select
                label="Escolaridad"
                name="scholarship"
                required
                value={formik.values.scholarship}
                onChange={formik.handleChange}
              >
                <option value="">Seleccione escolaridad</option>
                {['MASCULINO', 'FEMENINO', 'INDETERMINADO'].map((item, i) => (
                  <option key={`gender-${i}-${item}`} value={item}>
                    {item}
                  </option>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Select
                label="Estado civil"
                name="marital_status_id"
                required
                value={formik.values.marital_status_id}
                onChange={formik.handleChange}
              >
                <option value="">Seleccione escolaridad</option>
                {['MASCULINO', 'FEMENINO', 'INDETERMINADO'].map((item, i) => (
                  <option key={`gender-${i}-${item}`} value={item}>
                    {item}
                  </option>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Select
                label="Discapacidad"
                name="marital_status_id"
                required
                value={formik.values.marital_status_id}
                onChange={formik.handleChange}
              >
                <option value="">Seleccione escolaridad</option>
                {['MASCULINO', 'FEMENINO', 'INDETERMINADO'].map((item, i) => (
                  <option key={`gender-${i}-${item}`} value={item}>
                    {item}
                  </option>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Select
                label="Crendencial de discapacidad"
                name="marital_status_id"
                required
                value={formik.values.marital_status_id}
                onChange={formik.handleChange}
              >
                <option value="">Seleccione escolaridad</option>
                {['MASCULINO', 'FEMENINO', 'INDETERMINADO'].map((item, i) => (
                  <option key={`gender-${i}-${item}`} value={item}>
                    {item}
                  </option>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Select
                label="Reconocer"
                name="marital_status_id"
                required
                value={formik.values.marital_status_id}
                onChange={formik.handleChange}
              >
                <option value="">Seleccione escolaridad</option>
                {['MASCULINO', 'FEMENINO', 'INDETERMINADO'].map((item, i) => (
                  <option key={`gender-${i}-${item}`} value={item}>
                    {item}
                  </option>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Select
                label="Nacionalidad"
                name="marital_status_id"
                required
                value={formik.values.marital_status_id}
                onChange={formik.handleChange}
              >
                <option value="">Seleccione escolaridad</option>
                {['MASCULINO', 'FEMENINO', 'INDETERMINADO'].map((item, i) => (
                  <option key={`gender-${i}-${item}`} value={item}>
                    {item}
                  </option>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Select
                label="Vivo"
                name="marital_status_id"
                required
                value={formik.values.marital_status_id}
                onChange={formik.handleChange}
              >
                <option value="">Seleccione escolaridad</option>
                {['MASCULINO', 'FEMENINO', 'INDETERMINADO'].map((item, i) => (
                  <option key={`gender-${i}-${item}`} value={item}>
                    {item}
                  </option>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Select
                label="Banco"
                name="bank"
                value={formik.values.marital_status_id}
                onChange={formik.handleChange}
              >
                <option value="">Seleccione escolaridad</option>
                {['MASCULINO', 'FEMENINO', 'INDETERMINADO'].map((item, i) => (
                  <option key={`gender-${i}-${item}`} value={item}>
                    {item}
                  </option>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Select
                label="Tipo de cuenta"
                name="bank"
                value={formik.values.marital_status_id}
                onChange={formik.handleChange}
              >
                <option value="">Seleccione escolaridad</option>
                {['MASCULINO', 'FEMENINO', 'INDETERMINADO'].map((item, i) => (
                  <option key={`gender-${i}-${item}`} value={item}>
                    {item}
                  </option>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <TextField
                label="Número de cuenta"
                name="account_number"
                value={formik.values.account_number}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Select
                label="RSH"
                name="rsh"
                value={formik.values.marital_status_id}
                onChange={formik.handleChange}
              >
                <option value="">Seleccione escolaridad</option>
                {['MASCULINO', 'FEMENINO', 'INDETERMINADO'].map((item, i) => (
                  <option key={`gender-${i}-${item}`} value={item}>
                    {item}
                  </option>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <TextField
                label="RSH %"
                name="rsh_percentage"
                value={formik.values.account_number}
                onChange={formik.handleChange}
              />
            </Grid>
          </Grid>
          <Box textAlign="center" display="flex" justifyContent="flex-end">
            <Button variant="outlined">Cancelar </Button>
            <SubmitButton>Crear datos de trabajador</SubmitButton>
          </Box>
        </Box>
      </Box>
    </Wrapper>
  )
}

EmployeeModal.defaultProps = {
  type: 'CREATE'
}

export default EmployeeModal
