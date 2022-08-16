import { useEffect, useState } from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useSnackbar } from 'notistack'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Grid, Typography } from '@material-ui/core'
import { useParams } from 'react-router-dom'
import moment from 'moment'
import commonActions from '../../../state/actions/common'
import userActions from '../../../state/actions/users'
import socialCaseActions from '../../../state/actions/socialCase'
import { DatePicker, Dialog } from '../../Shared'
import { Button, Select, SubmitButton } from '../../UI'
import { useSuccess } from '../../../hooks'

const validationSchema = Yup.object().shape({
  managementId: Yup.number().required('Seleccione gestión'),
  professionalId: Yup.number().required('Seleccione gestión'),
  frequency: Yup.string().required('Seleccione frecuencia'),
  nextDate: Yup.date().required('Seleccione fecha').nullable()
})

const PlanDialog = ({
  open,
  onClose,
  type,
  data,
  submitFunction,
  successMessage
}) => {
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()
  const { socialCaseId } = useParams()
  const [users, setUsers] = useState([])
  const { user } = useSelector((state) => state.auth)
  const { isMobile } = useSelector((state) => state.ui)
  const { managementList: list } = useSelector((state) => state.common)
  const { caseDetails } = useSelector((state) => state.socialCase)
  const { success, changeSuccess } = useSuccess()
  const formik = useFormik({
    validateOnMount: true,
    validateOnChange: true,
    validateOnBlur: true,
    validationSchema,
    initialValues: {
      managementId: type === 'UPDATE' ? data.managementId : '',
      professionalId: type === 'UPDATE' ? data.professionalId : '',
      frequency: type === 'UPDATE' ? data.frequency : '',
      nextDate: type === 'UPDATE' ? new Date(data.nextDate) : null
    },
    onSubmit: (values) => {
      const foundUser = users.find(
        (item) => item.id === parseInt(values.professionalId, 10)
      )
      submitFunction({
        ...values,
        managementName: list.find(
          (item) => item.id === parseInt(values.managementId, 10)
        ).name,
        professionalNames:
          `${foundUser.names} ${foundUser.paternal_surname} ${foundUser.maternal_surname}`.trim()
      })
        .then(() => {
          formik.setSubmitting(false)
          enqueueSnackbar(successMessage, { variant: 'success' })
          const actualDate = moment().format('DD/MM/YYYY')
          const interventionDate = moment(values.nextDate).format('DD/MM/YYYY')
          const selectedUser = users.find(
            (item) => item.id === parseInt(formik.values.professionalId, 10)
          )
          dispatch(
            socialCaseActions.SocialCaseMail(
              { type: 'EDIT' },
              {
                socialCaseNumber: socialCaseId,
                date: actualDate.toString(),
                attendedRut: caseDetails.employeeRut,
                attended: caseDetails.employeeNames,
                interventionType: list.find(
                  (item) => item.id === parseInt(formik.values.managementId, 10)
                )?.name,
                interventionProfesionalName: `${selectedUser?.names} ${selectedUser?.paternal_surname} ${selectedUser?.maternal_surname}`,
                interventionDate: interventionDate.toString(),
                areaName: caseDetails.area?.name,
                topicName: caseDetails.tema?.name,
                derivatedBy: `${user?.names} ${user?.paternal_surname} ${user?.maternal_surname}`,
                socialCaseStartDate: moment(caseDetails.date)
                  .format('DD/MM/YYYY')
                  .toString(),
                profesionalDerivatedList: [],
                to: [
                  'sistrac.derivacion@fundacioncchc.cl',
                  selectedUser?.email
                ],
                officeDelegatedBy: user?.oficina
              }
            )
          )
          changeSuccess(true, () => {
            onClose()
          })
        })
        .catch((err) => {
          formik.setSubmitting(false)
          enqueueSnackbar(err, { variant: 'error' })
        })
    }
  })

  useEffect(() => {
    if (open) {
      dispatch(commonActions.getManagement())
      dispatch(userActions.getSocialAssistanceList()).then((res) => {
        setUsers(res)
      })
    }
  }, [open])

  return (
    <Dialog fullScreen={isMobile} fullWidth open={open} onClose={onClose}>
      <Box>
        <Box mb={1}>
          <Typography
            align="center"
            variant="h6"
            style={{ fontWeight: 'bold' }}
          >{`${type === 'UPDATE' ? 'Actualizar' : 'Nueva'} Tarea`}</Typography>
        </Box>
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Select
                label="Frecuencia"
                required
                name="frequency"
                value={formik.values.frequency}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.frequency && Boolean(formik.errors.frequency)
                }
                helperText={formik.touched.frequency && formik.errors.frequency}
              >
                <option value="">-SELECCIONE OPCIÓN-</option>
                {['FECHA FIJA'].map((item) => (
                  <option value={item} key={`frequency-${item}`}>
                    {item}
                  </option>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} md={6}>
              <DatePicker
                label="Fecha"
                disabledFuture={false}
                required
                value={formik.values.nextDate}
                onChange={(newDate) => {
                  formik.setFieldValue('nextDate', newDate)
                  formik.setFieldTouched('nextDate')
                }}
                onBlur={() => {
                  formik.setFieldTouched('nextDate')
                }}
                error={
                  formik.touched.nextDate && Boolean(formik.errors.nextDate)
                }
                helperText={formik.touched.nextDate && formik.errors.nextDate}
              />
            </Grid>
            <Grid item xs={12}>
              <Select
                label="Gestión"
                required
                name="managementId"
                value={formik.values.managementId}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.managementId &&
                  Boolean(formik.errors.managementId)
                }
                helperText={
                  formik.touched.managementId && formik.errors.managementId
                }
              >
                <option value="">-SELECCIONE GESTIÓN-</option>
                {list.map((item) => (
                  <option key={`option-management-${item.id}`} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12}>
              <Select
                label="Responsable"
                required
                name="professionalId"
                value={formik.values.professionalId}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.professionalId &&
                  Boolean(formik.errors.professionalId)
                }
                helperText={
                  formik.touched.professionalId && formik.errors.professionalId
                }
              >
                <option value="">-SELECCIONE RESPONSABLE-</option>
                {users.map((item) => (
                  <option key={`option-management-${item.id}`} value={item.id}>
                    {`${item.names} ${item.paternal_surname} ${item.maternal_surname}`}
                  </option>
                ))}
              </Select>
            </Grid>
          </Grid>
          <Box textAlign="center" mt={2}>
            <Button variant="outlined" onClick={onClose}>
              Cancelar
            </Button>
            <SubmitButton
              disabled={!formik.isValid || formik.isSubmitting}
              loading={formik.isSubmitting}
              onClick={formik.handleSubmit}
              success={success}
            >{`${type === 'UPDATE' ? 'Actualizar' : 'Crear'}`}</SubmitButton>
          </Box>
        </Box>
      </Box>
    </Dialog>
  )
}

PlanDialog.defaultProps = {
  type: 'CREATE'
}

export default PlanDialog
