import { memo, useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { Box, IconButton, Typography } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { ArrowBack as ArrowBackIcon } from '@material-ui/icons'
import employeesActions from '../../state/actions/employees'
import { EmployeeTabs } from '../../components/Employee'
import { PageHeading, Text, Button } from '../../components/UI'
import { ConfirmDelete } from '../../components/Shared'
import { useSuccess, useToggle } from '../../hooks'

const Employee = ({ children }) => {
  const dispatch = useDispatch()
  const { idEmployee } = useParams()
  const history = useHistory()
  const [loading, setLoading] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const { employee } = useSelector((state) => state.employees)
  const { success, changeSuccess } = useSuccess()
  const { open, toggleOpen } = useToggle()
  const { open: openActive, toggleOpen: toggleOpenActive } = useToggle()

  const goBack = () => {
    history.push('/employees')
  }
  const getEmployee = useCallback(() => {
    setLoading(true)
    dispatch(employeesActions.getEmployeeDetails(idEmployee))
      .then(() => {
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }, [])

  const blockEmployee = () => {
    setDeleting(true)
    dispatch(employeesActions.patchEmployee(employee.id, { state: 'DELETED' }))
      .then(() => {
        setDeleting(false)
        changeSuccess(true, () => {
          toggleOpen()
          history.push('/employees')
        })
      })
      .catch(() => {
        setDeleting(false)
      })
  }
  const activeEmployee = () => {
    setDeleting(true)
    dispatch(employeesActions.patchEmployee(employee.id, { state: 'CREATED' }))
      .then(() => {
        setDeleting(false)
        changeSuccess(true, () => {
          toggleOpenActive()
          getEmployee()
        })
      })
      .catch(() => {
        setDeleting(false)
      })
  }

  useEffect(() => {
    getEmployee()
  }, [idEmployee])

  return (
    <Box>
      <Box marginBottom="10px" display="flex" justifyContent="space-between">
        <Box display="flex" alignItems="center">
          <IconButton onClick={goBack}>
            <ArrowBackIcon />
          </IconButton>
          <Text>
            <PageHeading>
              {employee &&
                `${employee.names} ${employee.paternal_surname} ${employee?.maternal_surname}`}
            </PageHeading>
          </Text>
        </Box>
        <Box>
          {employee && employee.state === 'DELETED' && (
            <Button onClick={toggleOpenActive}>Activar trabajador</Button>
          )}
          <Button
            danger
            disabled={employee?.state === 'DELETED'}
            onClick={toggleOpen}
          >
            Eliminar
          </Button>
        </Box>
      </Box>
      <EmployeeTabs loading={loading}>{children}</EmployeeTabs>
      {employee && open && (
        <ConfirmDelete
          open={open}
          onClose={toggleOpen}
          message={
            <Typography variant="h6">
              ¿Estas seguro de a eliminar:{' '}
              <strong>{`${employee.names} ${employee.paternal_surname} ${employee?.maternal_surname}`}</strong>
              ?
            </Typography>
          }
          loading={deleting}
          success={success}
          onConfirm={blockEmployee}
        />
      )}
      {employee && openActive && (
        <ConfirmDelete
          event="CONFIRM"
          confirmText={'Aceptar'}
          open={openActive}
          onClose={toggleOpenActive}
          message={
            <Box>
              <Typography variant="h6">
                ¿Estás seguro de restaurar a:{' '}
                <strong>{`${employee.names} ${employee.paternal_surname} ${employee?.maternal_surname}`}</strong>
                ?
              </Typography>
              <Box marginTop="10px">
                <Alert severity="warning">
                  Al activar el usuario pasará de eliminado a activo
                </Alert>
              </Box>
            </Box>
          }
          loading={deleting}
          success={success}
          onConfirm={activeEmployee}
        />
      )}
    </Box>
  )
}

export default memo(Employee)
