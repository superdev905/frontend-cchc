import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Typography } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import questionEmployeeActions from '../../../state/actions/questionEmployee'
import { useToggle } from '../../../hooks'
import { Button, EmptyState } from '../../UI'
import { EmployeeContactCard, EmployeeContactForm } from '../../Employee'
import useStyles from './styles'

const Information = () => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const [loadingContact, setLoadingContact] = useState(false)
  const { open: openContact, toggleOpen: toggleOpenContact } = useToggle()
  const { employee, employeeContact } = useSelector(
    (state) => state.questionEmployee
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
            <Skeleton width="100%" height="50px"></Skeleton>
            <Skeleton width="100%" height="50px"></Skeleton>
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
