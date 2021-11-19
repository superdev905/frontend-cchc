import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Typography } from '@material-ui/core'
import {
  EmployeeJobs,
  EmployeeDetails,
  EmployeeInfoContact,
  Situation,
  EmployeeFamiliarGroup,
  SpecializationHistory
} from '../Employee'
import { Dialog, Tabs } from '../Shared'
import employees from '../../state/actions/employees'

const JobsDialog = ({
  open,
  onClose,
  employeeId,
  employeeNames,
  employeeRun
}) => {
  const tabsComponents = {
    0: <EmployeeDetails />,
    1: <EmployeeInfoContact />,
    2: <EmployeeFamiliarGroup />,
    3: <Situation employeeId={employeeId} />,
    4: <SpecializationHistory employeeId={employeeId} />,
    5: <EmployeeJobs employeeId={employeeId} />
  }
  const [value, setValue] = useState(0)
  const { isMobile } = useSelector((state) => state.ui)

  const dispatch = useDispatch()

  useEffect(() => {
    if (open) {
      dispatch(employees.getEmployeeDetails(employeeId))
    }
  }, [open])

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth
      fullWidth="lg"
      fullScreen={isMobile}
    >
      <Box>
        <Typography
          style={{
            fontSize: 14,
            opacity: 0.7,
            marginBottom: 5,
            textTransform: 'uppercase'
          }}
        >
          Trabajador:
        </Typography>
        <Typography style={{ fontSize: 20, fontWeight: 'bold' }}>
          <a href={`/employee/${employeeId}/info`} target={'_blank'}>
            {employeeNames}
          </a>
        </Typography>
        <Typography>Run: {employeeRun}</Typography>
        <Tabs
          value={value}
          onChange={(__, newValue) => {
            setValue(newValue)
          }}
          tabs={[
            'Datos personales',
            'Contacto',
            'Grupo Familiar',
            'Situación previsional y habitacional',
            'Especialidades',
            'Trabajos'
          ]}
        >
          {tabsComponents[value]}
        </Tabs>
      </Box>
    </Dialog>
  )
}

export default JobsDialog
