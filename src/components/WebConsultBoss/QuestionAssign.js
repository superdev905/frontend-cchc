import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useSnackbar } from 'notistack'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { Box, Grid, Typography } from '@material-ui/core'
import { formatDate, formatHours } from '../../formatters'
import { Dialog, DataTable } from '../Shared'
import { useSuccess } from '../../hooks'
import { Select, SubmitButton, Button, ActionsTable } from '../UI'
import commonActions from '../../state/actions/common'
import usersActions from '../../state/actions/users'
import questionActions from '../../state/actions/questions'

const validationSchema = Yup.object().shape({
  department: Yup.string().required('Selecciona Departamento'),
  assignedUserId: Yup.number().required(),
  bossId: Yup.number()
})

const QuestionAssign = ({
  open,
  onClose,
  submitFunction,
  successMessage,
  successFunction
}) => {
  const { enqueueSnackbar } = useSnackbar()
  const dispatch = useDispatch()
  const [userList, setUserList] = useState([])
  const { regions } = useSelector((state) => state.common)
  const { success, changeSuccess } = useSuccess()
  const { isMobile } = useSelector((state) => state.ui)
  const { selectedList } = useSelector((state) => state.questions)

  const formik = useFormik({
    validateOnMount: true,
    validationSchema,
    initialValues: {
      department: '',
      assignedUserId: '',
      bossId: ''
    },
    onSubmit: (values, { resetForm }) => {
      submitFunction({
        ...values,
        date: new Date().toISOString(),
        questions: selectedList.map((item) => ({ number: item.number }))
      })
        .then((result) => {
          formik.setSubmitting(false)
          enqueueSnackbar(successMessage, {
            variant: 'success'
          })
          changeSuccess(true, () => {
            onClose()
            resetForm()
            if (successFunction) {
              successFunction(result.id)
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
  useEffect(() => {
    if (open) {
      formik.resetForm()
      dispatch(commonActions.getRegions())
      dispatch(usersActions.getSocialAssistanceList()).then((response) => {
        setUserList(response)
      })
    }
  }, [open])

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth={'lg'}
      fullScreen={isMobile}
    >
      <Box>
        <Typography
          variant="h6"
          align="center"
          style={{ fontWeight: 'bold', marginBottom: 10 }}
        >
          Asignar Preguntas
        </Typography>
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Select
                label="Departamento"
                name="department"
                required
                onChange={formik.handleChange}
                value={formik.values.department}
                error={
                  formik.touched.department && Boolean(formik.errors.department)
                }
                helperText={
                  formik.touched.department && formik.errors.department
                }
              >
                <option value="">Seleccione Departamento</option>
                {regions.map((item) => (
                  <option value={item.id}>{item.name}</option>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} md={6}>
              <Select
                label="Profesional"
                name="assignedUserId"
                required
                onChange={formik.handleChange}
                value={formik.values.assignedUserId}
                error={
                  formik.touched.assignedUserId &&
                  Boolean(formik.errors.assignedUserId)
                }
                helperText={
                  formik.touched.assignedUserId && formik.errors.assignedUserId
                }
              >
                <option value="">Seleccione Profesional</option>
                {userList.map((item) => (
                  <option value={item.id}>
                    {`${item.names} ${item.paternal_surname}`.toUpperCase()}
                  </option>
                ))}
              </Select>
            </Grid>
            <DataTable
              data={selectedList}
              emptyMessage={'No existen Preguntas'}
              columns={[
                {
                  name: 'N°',
                  selector: (row) => row.number,
                  width: '80px',
                  sortable: true,
                  compact: true,
                  center: true
                },
                {
                  name: 'Fecha',
                  selector: (row) =>
                    `${formatDate(row.createdDate, {})} - ${formatHours(
                      row.createdDate
                    )}`,
                  compact: true
                },
                {
                  name: 'Rut Beneficiario',
                  selector: (row) => row.employeeRut,
                  sortable: true,
                  compact: true
                },
                {
                  name: 'Beneficiario',
                  selector: (row) => row.employeeNames,
                  sortable: true,
                  compact: true
                },
                {
                  name: 'Area',
                  selector: (row) => row.areaName,
                  compact: true,
                  maxWidth: '100px'
                },
                {
                  name: '',
                  right: true,
                  selector: (row) => (
                    <ActionsTable
                      onDelete={() => {
                        const updatedList = selectedList.filter(
                          (item) => item.number !== row.number
                        )
                        dispatch(
                          questionActions.updateSelectedList(updatedList)
                        )
                      }}
                    />
                  )
                }
              ]}
            />
          </Grid>
          <Box textAlign="center" marginTop="10px">
            <Button onClick={onClose} variant="outlined">
              Cancelar
            </Button>
            <SubmitButton
              onClick={formik.handleSubmit}
              loading={formik.isSubmitting}
              disabled={!formik.isValid || selectedList.length === 0}
              success={success}
            >
              Asignar
            </SubmitButton>
          </Box>
        </Box>
      </Box>
    </Dialog>
  )
}

QuestionAssign.defaultProps = {
  type: 'Create'
}

export default QuestionAssign
