import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Typography } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import questionEmployeeActions from '../../../state/actions/questionEmployee'
import { useToggle } from '../../../hooks'
import { Button, EmptyState } from '../../UI'
import EmployeeForm from '../../Employees/EmployeeForm'
import {
  EmployeeContactCard,
  EmployeeContactForm,
  EmployeeDetailsForm
} from '../../Employee'
import useStyles from './styles'

const Information = () => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const [loadingContact, setLoadingContact] = useState(false)
  const { open: openEdit, toggleOpen: toggleOpenEdit } = useToggle()
  const { open: openContact, toggleOpen: toggleOpenContact } = useToggle()
  const { employee, employeeId, employeeContact } = useSelector(
    (state) => state.questionEmployee
  )

  const updateEmployeeInfo = (values) =>
    dispatch(
      questionEmployeeActions.updateEmployee(employee.id, {
        ...values,
        created_by: employee.created_by
      })
    )
  const updateContact = (values) =>
    dispatch(
      questionEmployeeActions.updateEmployeeContact(employeeContact.id, {
        ...employeeContact,
        ...values,
        employee_run: employee.run,
        is_main: true,
        created_by: employeeContact.created_by
      })
    )
  const getEmployeeContact = () => {
    setLoadingContact(true)
    dispatch(
      questionEmployeeActions.getEmployeeContact({
        employeeRun: employee.run
      })
    ).then(() => {
      setLoadingContact(false)
    })
  }

  useEffect(() => {
    if (employee) {
      getEmployeeContact()
    }
  }, [employee])

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography className={classes.title}>
          Mi información personal
        </Typography>
        <Button onClick={toggleOpenEdit}>Actualizar</Button>
      </Box>
      <EmployeeDetailsForm loading={false} data={employee} />
      {employee && openEdit && (
        <EmployeeForm
          heading="Actualizar mis datos"
          type="UPDATE"
          open={openEdit}
          successMessage="Datos personales actualizados"
          onClose={toggleOpenEdit}
          data={employee}
          submitFunction={updateEmployeeInfo}
          successFunction={() => {
            dispatch(questionEmployeeActions.getEmployeeDetails(employeeId))
          }}
        />
      )}
      <Box mt={2}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography className={classes.title}>
            Mi información de contacto
          </Typography>
          <Button disabled={!employeeContact} onClick={toggleOpenContact}>
            Actualizar contacto
          </Button>
        </Box>
        {loadingContact ? (
          <>
            <Skeleton width="100%" height="20px"></Skeleton>
          </>
        ) : (
          <>
            {!employeeContact ? (
              <EmptyState message="No tienes información de contacto" />
            ) : (
              <>
                <EmployeeContactCard contact={employeeContact} />
                {employeeContact && openContact && (
                  <EmployeeContactForm
                    type={'UPDATE'}
                    successMessage={'Contacto actualizado'}
                    data={employeeContact}
                    open={openContact}
                    onClose={toggleOpenContact}
                    alertConfirmation={false}
                    submitFunction={updateContact}
                    successFunction={getEmployeeContact}
                  />
                )}
              </>
            )}
          </>
        )}
      </Box>
    </Box>
  )
}

export default Information
