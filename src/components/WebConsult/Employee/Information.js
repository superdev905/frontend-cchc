import { Box, Typography } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import questionEmployeeActions from '../../../state/actions/questionEmployee'
import { useToggle } from '../../../hooks'
import { Button } from '../../UI'
import EmployeeForm from '../../Employees/EmployeeForm'
import { EmployeeDetailsForm } from '../../Employee'
import useStyles from './styles'

const Information = () => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const { open: openEdit, toggleOpen: toggleOpenEdit } = useToggle()
  const { employee, employeeId } = useSelector(
    (state) => state.questionEmployee
  )

  const updateEmployeeInfo = (values) =>
    dispatch(
      questionEmployeeActions.updateEmployee(employee.id, {
        ...values,
        created_by: employee.created_by
      })
    )
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
    </Box>
  )
}

export default Information
