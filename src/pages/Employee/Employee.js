import { memo, useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { Box, IconButton, Typography } from '@material-ui/core'
import { ArrowBack as ArrowBackIcon } from '@material-ui/icons/'
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

  const goBack = () => {
    history.push('/employees')
  }

  const blockEmployee = () => {
    setDeleting(true)
    dispatch(employeesActions.patchEmployee(employee.id, { state: 'DELETED' }))
      .then(() => {
        setDeleting(false)
        changeSuccess(true, () => {
          history.push('/employees')
        })
      })
      .catch(() => {
        setDeleting(false)
      })
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
                `${employee.names} ${employee.paternal_surname} ${employee.maternal_surname}`}
            </PageHeading>
          </Text>
        </Box>
        <Button danger onClick={toggleOpen}>
          Eliminar
        </Button>
      </Box>
      <EmployeeTabs loading={loading}>{children}</EmployeeTabs>
      {employee && open && (
        <ConfirmDelete
          open={open}
          onClose={toggleOpen}
          message={
            <Typography variant="h6">
              ¿Estas seguro de a eliminar:{' '}
              <strong>{`${employee.names} ${employee.paternal_surname} ${employee.maternal_surname}`}</strong>
              ?
            </Typography>
          }
          loading={deleting}
          success={success}
          onConfirm={blockEmployee}
        />
      )}
    </Box>
  )
}

export default memo(Employee)
