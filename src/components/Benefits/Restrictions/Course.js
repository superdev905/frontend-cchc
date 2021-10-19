import { capitalize } from 'lodash'
import * as Yup from 'yup'

import { useFormik } from 'formik'
import { useSnackbar } from 'notistack'
import { useSelector } from 'react-redux'
import { Box, Grid, Typography } from '@material-ui/core'
import { Dialog } from '../../Shared'
import { Button, Select, SubmitButton, TextField } from '../../UI'
import { useSuccess } from '../../../hooks'

const statusList = ['OPCION 1', 'OPCION 2', 'OPCION 3']

const validationSchema = Yup.object().shape({
  empresaQueCapacita: Yup.string().required(
    'Seleccione empresa que realiza la capacitación'
  ),
  relator: Yup.string().required('Ingrese relator'),
  lugar: Yup.string().required('Ingrese lugar'),
  modalidad: Yup.string().required('Seleccione modalidad'),
  participantes: Yup.string().required('Ingrese participantes'),
  horasDelCurso: Yup.string().required('Ingrese horas del curso'),
  nombreDelOficio: Yup.string().required('Seleccione nombre oficio'),
  responsableFundacion: Yup.string().required(
    'Seleccione responsable de fundación'
  ),
  costoMatricula: Yup.string().required('Ingrese costo de matrícula')
})

const Course = ({
  open,
  onClose,
  type,
  data,
  submitFunction,
  successMessage,
  successFunction
}) => {
  const { enqueueSnackbar } = useSnackbar()
  const { success, changeSuccess } = useSuccess()
  const { isMobile } = useSelector((state) => state.ui)

  const formik = useFormik({
    validateOnMount: true,
    validationSchema,
    initialValues: {
      empresaQueCapacita: type === 'UPDATE' ? data.empresaQueCapacita : '',
      relator: type === 'UPDATE' ? data.relator : '',
      lugar: type === 'UPDATE' ? data.lugar : '',
      modalidad: type === 'UPDATE' ? data.modalidad : '',
      participantes: type === 'UPDATE' ? data.participantes : '',
      horasDelCurso: type === 'UPDATE' ? data.horasDelCurso : '',
      nombreDelOficio: type === 'UPDATE' ? data.nombreDelOficio : '',
      responsableFundacion: type === 'UPDATE' ? data.responsableFundacion : '',
      costoMatricula: type === 'UPDATE' ? data.costoMatricula : ''
    },
    onSubmit: (values, { resetForm }) => {
      submitFunction({
        ...values,
        createDate: new Date().toISOString()
      })
        .then(() => {
          formik.setSubmitting(false)
          changeSuccess(true, () => {
            onClose()
            enqueueSnackbar(successMessage, {
              variant: 'success'
            })
            resetForm()
            if (successFunction) {
              successFunction()
            }
          })
        })
        .catch((err) => {
          formik.setSubmitting(false)
          enqueueSnackbar(err, {
            variant: 'error'
          })
        })
    }
  })

  return (
    <Dialog open={open} onClose={onClose} maxWidth={'md'} fullScreen={isMobile}>
      <Box>
        <Typography variant="h6" align="center" style={{ fontWeight: 'bold' }}>
          {`${
            type === 'UPDATE' ? 'Actualizar' : 'Nueva'
          } restricción por curso`}
        </Typography>
        <Box p={2}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Select
                label="Empresa que capacita"
                required
                name="empresaQueCapacita"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.empresaQueCapacita}
                helperText={
                  formik.touched.empresaQueCapacita &&
                  formik.errors.empresaQueCapacita
                }
                error={
                  formik.touched.empresaQueCapacita &&
                  Boolean(formik.errors.empresaQueCapacita)
                }
              >
                <option value="">Seleccione empresa</option>
                {statusList.map((item) => (
                  <option value={item}>{capitalize(item)}</option>
                ))}
              </Select>
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                label="Relator"
                name="relator"
                required
                value={formik.values.relator}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.relator && Boolean(formik.errors.relator)}
                helperText={formik.touched.relator && formik.errors.relator}
                inputProps={{ maxLength: 3 }}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                label="Lugar"
                required
                name="lugar"
                value={formik.values.lugar}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.lugar && Boolean(formik.errors.lugar)}
                helperText={formik.touched.lugar && formik.errors.lugar}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <Select
                label="Modalidad"
                required
                name="modalidad"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.modalidad}
                helperText={formik.touched.modalidad && formik.errors.modalidad}
                error={
                  formik.touched.modalidad && Boolean(formik.errors.modalidad)
                }
              >
                <option value="">Seleccione modalidad</option>
                {statusList.map((item) => (
                  <option value={item}>{capitalize(item)}</option>
                ))}
              </Select>
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                label="Participantes"
                required
                name="participantes"
                value={formik.values.participantes}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.participantes &&
                  Boolean(formik.errors.participantes)
                }
                helperText={
                  formik.touched.participantes && formik.errors.participantes
                }
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                label="Horas del curso"
                required
                name="horasDelCurso"
                value={formik.values.horasDelCurso}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.horasDelCurso &&
                  Boolean(formik.errors.horasDelCurso)
                }
                helperText={
                  formik.touched.horasDelCurso && formik.errors.horasDelCurso
                }
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Select
                label="Nombre del oficio"
                required
                name="nombreDelOficio"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.nombreDelOficio}
                helperText={
                  formik.touched.nombreDelOficio &&
                  formik.errors.nombreDelOficio
                }
                error={
                  formik.touched.nombreDelOficio &&
                  Boolean(formik.errors.nombreDelOficio)
                }
              >
                <option value="">Seleccione oficio</option>
                {statusList.map((item) => (
                  <option value={item}>{capitalize(item)}</option>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} md={4}>
              <Select
                label="Responsable fundación"
                required
                name="responsableFundacion"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.responsableFundacion}
                helperText={
                  formik.touched.responsableFundacion &&
                  formik.errors.responsableFundacion
                }
                error={
                  formik.touched.responsableFundacion &&
                  Boolean(formik.errors.responsableFundacion)
                }
              >
                <option value="">Seleccione responsable</option>
                {statusList.map((item) => (
                  <option value={item}>{capitalize(item)}</option>
                ))}
              </Select>
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                label="Costo de matricula"
                required
                name="costoMatricula"
                value={formik.values.costoMatricula}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.costoMatricula &&
                  Boolean(formik.errors.costoMatricula)
                }
                helperText={
                  formik.touched.costoMatricula && formik.errors.costoMatricula
                }
              />
            </Grid>
          </Grid>

          <Box textAlign="center" marginTop="10px">
            <Button onClick={onClose} variant="outlined">
              Cancelar
            </Button>
            <SubmitButton
              onClick={formik.handleSubmit}
              disabled={!formik.isValid || formik.isSubmitting}
              loading={formik.isSubmitting}
              success={success}
            >
              {`${type === 'UPDATE' ? 'Actualizar' : 'Crear'} restricción`}
            </SubmitButton>
          </Box>
        </Box>
      </Box>
    </Dialog>
  )
}

Course.defaultProps = {
  type: 'CREATE'
}

export default Course
