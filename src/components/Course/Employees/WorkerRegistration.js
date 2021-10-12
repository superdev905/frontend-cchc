import * as Yup from 'yup'
import { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useSnackbar } from 'notistack'
import { Skeleton } from '@material-ui/lab'
import { addMonths } from 'date-fns'
import { Box, Grid, Typography } from '@material-ui/core'
import { Dialog } from '../../Shared'
import { formatSearchWithRut } from '../../../formatters'
import { Button, EmptyState, SubmitButton, TextField } from '../../UI'
import { useSuccess } from '../../../hooks'
import EmployeeRow from '../../Scholarships/Create/EmployeeRow'
import employeesActions from '../../../state/actions/employees'
import generateColor from '../../../utils/generateColor'

const validationSchema = Yup.object().shape({
  employeeId: Yup.string().required('Ingrese trabajador')
})

const WorkerRegistration = ({
  open,
  onClose,
  type,
  data,
  loader,
  submitFunction,
  successMessage,
  successFunction
}) => {
  const dispatch = useDispatch()
  const { idCourse } = useParams()
  const { enqueueSnackbar } = useSnackbar()
  const { success, changeSuccess } = useSuccess()
  const { isMobile } = useSelector((state) => state.ui)
  const [currentDate] = useState(new Date())
  const [searchRut, setSearchRut] = useState('')
  const [searchList, setSearchList] = useState([])
  const [selectedEmployee, setSelectedEmployee] = useState(null)

  const formik = useFormik({
    validateOnMount: true,
    validationSchema,
    initialValues: {
      courseId: idCourse,
      enrollDate: currentDate,
      employeeId: type === 'UPDATE' ? data.employeeId : '',
      employeeNames: type === 'UPDATE' ? data.employeeNames : ''
    },
    onSubmit: (values) => {
      submitFunction({
        ...values,
        createDate: new Date(addMonths(new Date(), 1))
      })
        .then(() => {
          formik.setSubmitting(false)
          enqueueSnackbar(successMessage, {
            variant: 'success'
          })

          changeSuccess(true, () => {
            onClose()
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

  useEffect(() => {
    if (selectedEmployee) {
      formik.setFieldValue(
        'employeeNames',
        `${selectedEmployee.names} ${selectedEmployee.paternal_surname} ${selectedEmployee.maternal_surname}`
      )
      formik.setFieldValue('employeeRut', selectedEmployee.run)
      formik.setFieldValue('employeeId', selectedEmployee.id)
    }
  }, [selectedEmployee])

  useEffect(() => {
    if (searchRut) {
      dispatch(
        employeesActions.getEmployees(
          { state: 'CREATED', search: searchRut },
          false
        )
      ).then((list) => {
        setSearchList(
          list.map((item) => ({ ...item, avatarBg: generateColor() }))
        )
      })
    } else {
      setSearchList([])
    }
  }, [searchRut])

  useEffect(() => {
    if (open) {
      formik.resetForm()
      setSelectedEmployee(null)
    }
  }, [open])

  return (
    <Dialog open={open} onClose={onClose} maxWidth={'lg'} fullScreen={isMobile}>
      <Box>
        <Typography variant="h6" align="center" style={{ fontWeight: 'bold' }}>
          {`${type === 'Registrar' ? 'Actualizar' : 'Nuevo'} Trabajador`}
        </Typography>
        <Box>
          {loader ? (
            <>
              <Box p={2}>
                <Box display="flex" marginBottom="10px">
                  <Skeleton width="30px"></Skeleton>
                  <Skeleton
                    width="40%"
                    style={{ marginLeft: '10px' }}
                  ></Skeleton>
                </Box>
              </Box>
            </>
          ) : (
            <Box>
              {selectedEmployee ? (
                <Box>
                  <Typography>Trabajador</Typography>
                  <EmployeeRow
                    option={selectedEmployee}
                    onDelete={() => {
                      setSelectedEmployee(null)
                    }}
                  />
                </Box>
              ) : (
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <TextField
                      label="Rut de trabajador"
                      value={searchRut}
                      onChange={(e) => {
                        setSearchRut(formatSearchWithRut(e.target.value))
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    {searchList.length === 0 ? (
                      <>
                        <EmptyState
                          message={`${
                            searchRut
                              ? `No se encontraron resultados para: ${searchRut}`
                              : 'Ingrese el rut del trabajador'
                          }`}
                        />
                      </>
                    ) : (
                      <>
                        {searchList.map((item) => (
                          <EmployeeRow
                            selectable
                            option={item}
                            onClick={() => {
                              setSelectedEmployee(item)
                            }}
                          />
                        ))}
                      </>
                    )}
                  </Grid>
                </Grid>
              )}
            </Box>
          )}
        </Box>

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
            {`${type === 'UPDATE' ? 'Actualizar' : 'Registrar'} Trabajador`}
          </SubmitButton>
        </Box>
      </Box>
    </Dialog>
  )
}

WorkerRegistration.defaultProps = {
  type: 'CREATE'
}

export default WorkerRegistration