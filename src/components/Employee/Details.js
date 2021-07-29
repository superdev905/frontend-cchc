import { useSelector, useDispatch } from 'react-redux'
import { Box, Typography } from '@material-ui/core'
import employeesActions from '../../state/actions/employees'
import { Button, LabeledRow, Text, Wrapper } from '../UI'
import { formatDate } from '../../formatters'
import { useToggle } from '../../hooks'
import { EmployeeForm } from '../Employees'

const Details = ({ loading, fetchFunction }) => {
  const dispatch = useDispatch()
  const { open: openEdit, toggleOpen: toggleOpenEdit } = useToggle()
  const { employee } = useSelector((state) => state.employees)

  const updateEmployeeInfo = (values) =>
    dispatch(employeesActions.updateEmployee(employee.id, values))

  return (
    <Box>
      <Wrapper>
        <Box display="flex" justifyContent="space-between">
          <Typography>Datos personales</Typography>
          <Button onClick={toggleOpenEdit}>Editar</Button>
        </Box>
        <Box>
          <LabeledRow label={'Run'}>
            <Text loading={loading}>{employee?.run}</Text>
          </LabeledRow>
          <LabeledRow label={'Nombres'}>
            <Text loading={loading}>{employee?.names}</Text>
          </LabeledRow>
          <LabeledRow label={'Apellido paterno'}>
            <Text loading={loading}>{employee?.paternal_surname}</Text>
          </LabeledRow>
          <LabeledRow label={'Apellido materno'}>
            <Text loading={loading}>{employee?.maternal_surname}</Text>
          </LabeledRow>
          <LabeledRow label={'Fecha de nacimiento'}>
            <Text loading={loading}>{formatDate(employee?.born_date)}</Text>
          </LabeledRow>

          <LabeledRow label={'Estado civil'}>
            <Text loading={loading}>
              {employee?.marital_status?.description}
            </Text>
          </LabeledRow>
          <LabeledRow label={'Nacionalidad'}>
            <Text loading={loading}>{employee?.nationality?.description}</Text>
          </LabeledRow>
          <Typography>Banco</Typography>
          <LabeledRow label={'Nombre de banco'}>
            <Text loading={loading}>{employee?.bank?.description}</Text>
          </LabeledRow>
          <LabeledRow label={'Tipo de cuenta'}>
            <Text loading={loading}>{employee?.account_type}</Text>
          </LabeledRow>
          <LabeledRow label={'Número de cuenta'}>
            <Text loading={loading}>{employee?.account_number}</Text>
          </LabeledRow>

          <LabeledRow label={'Escolaridad'}>
            <Text loading={loading}>{employee?.scholarship?.description}</Text>
          </LabeledRow>
          <LabeledRow label={'Discapacidad'}>
            <Text loading={loading}>{employee?.disability}</Text>
          </LabeledRow>
          <LabeledRow label={'Credencial discapacidad'}>
            <Text loading={loading}>{employee?.credential_disability}</Text>
          </LabeledRow>
          <LabeledRow label={'Vivo'}>
            <Text loading={loading}>{employee?.alive}</Text>
          </LabeledRow>
        </Box>
      </Wrapper>
      {employee && openEdit && (
        <EmployeeForm
          type="UPDATE"
          open={openEdit}
          successMessage="Datos personales actualizados"
          onClose={toggleOpenEdit}
          data={employee}
          submitFunction={updateEmployeeInfo}
          successFunction={fetchFunction}
        />
      )}
    </Box>
  )
}

export default Details
