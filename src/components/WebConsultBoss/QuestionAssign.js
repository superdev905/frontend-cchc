import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useSnackbar } from 'notistack'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { Box, Grid, Typography } from '@material-ui/core'
import { formatDate, formatHours } from '../../formatters'
import { Dialog, DataTable } from '../Shared'
import { useSuccess } from '../../hooks'
import { Select, SubmitButton, Button } from '../UI'
import commonActions from '../../state/actions/common'
import usersActions from '../../state/actions/users'
import questionActions from '../../state/actions/questions'

const validationSchema = Yup.object().shape({
  date: Yup.date().required(),
  department: Yup.string().required('Selecciona Departamento'),
  assignedUserId: Yup.number().required(),
  assignedUserNames: Yup.string().required('Seleccione Profesional'),
  bossId: Yup.number(),
  bossNames: Yup.string(),
  questions: Yup.number()
})

const QuestionAssign = ({
  open,
  onClose,
  type,
  data,
  submitFunction,
  successMessage,
  successFunction
}) => {
  const { enqueueSnackbar } = useSnackbar()
  const dispatch = useDispatch()
  const [userList, setUserList] = useState([])
  const [loading, setLoading] = useState(false)
  const [query, setQuery] = useState({ page: 1, size: 30 })
  const { regions } = useSelector((state) => state.common)
  const { success, changeSuccess } = useSuccess()
  const { isMobile } = useSelector((state) => state.ui)

  const { questions, totalQuestions: totalDocs } = useSelector(
    (state) => state.questions
  )

  const getQuestions = () => {
    setLoading(true)
    dispatch(questionActions.getQuestions(query)).then(() => {
      setLoading(false)
    })
  }

  const formik = useFormik({
    validateOnMount: true,
    validationSchema,
    initialValues: {
      date: '',
      department: type === 'UPDATE' ? data.department : '',
      assignedUserId: '',
      assignedUserNames: type === 'UPDATE' ? data.assignedUserNames : '',
      bossId: '',
      bossNames: '',
      questions: ''
    },
    onSubmit: (values, { resetForm }) => {
      submitFunction({
        ...values,
        is_mandatory: values.is_mandatory === 'NO'
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
      dispatch(usersActions.getFoundationUsers()).then((response) => {
        setUserList(response)
      })
    }
  }, [open])
  useEffect(() => {
    getQuestions()
  }, [query])

  return (
    <Dialog open={open} onClose={onClose} maxWidth={'md'} fullScreen={isMobile}>
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
                name="assignedUserNames"
                required
                onChange={formik.handleChange}
                value={formik.values.assignedUserNames}
                error={
                  formik.touched.assignedUserNames &&
                  Boolean(formik.errors.assignedUserNames)
                }
                helperText={
                  formik.touched.assignedUserNames &&
                  formik.errors.assignedUserNames
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
              data={questions}
              selectableRows
              emptyMessage={'No existen Preguntas'}
              columns={[
                {
                  name: 'N°',
                  selector: (row) => <strong>{row.number}</strong>,
                  width: '80px',
                  sortable: true,
                  compact: true
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
                  name: 'Area',
                  selector: (row) => row.areaName,
                  compact: true,
                  hide: 'md',
                  maxWidth: '100px'
                },
                {
                  name: 'Beneficiario',
                  selector: (row) => row.employeeNames,
                  sortable: true,
                  compact: true,
                  hide: 'md'
                }
              ]}
              progressPending={loading}
              pagination
              paginationRowsPerPageOptions={[30, 40]}
              paginationRowsPerPage={query.size}
              paginationServer={true}
              onChangeRowsPerPage={(limit) => {
                setQuery({ ...query, size: limit })
              }}
              onChangePAge={(page) => {
                setQuery({ ...query, page })
              }}
              paginationTotalRows={totalDocs}
              expandableRows
              expandOnRowClicked
              expandableRowsHideExpander
              selectableRowsHighlight
            />
          </Grid>
          <Box textAlign="center" marginTop="10px">
            <Button onClick={onClose} variant="outlined">
              Cancelar
            </Button>
            <SubmitButton
              onClick={formik.handleSubmit}
              loading={formik.isSubmitting}
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
