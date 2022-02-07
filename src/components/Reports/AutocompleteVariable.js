import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Box, Typography } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import { TextField } from '../UI'
import companiesActions from '../../state/actions/companies'
import employeesActions from '../../state/actions/employees'
import usersActions from '../../state/actions/users'

const AutocompleteVariable = ({ type, onChange }) => {
  const dispatch = useDispatch()
  const [companies, setCompanies] = useState([])
  const [employees, setEmployees] = useState([])
  const [users, setUsersList] = useState([])

  useEffect(() => {
    if (type === 'VISITS_COMPANY' || type === 'ASSISTANCE_COMPANY') {
      dispatch(companiesActions.getCompanies({ state: 'CREATED' }, false)).then(
        (list) => {
          setCompanies(list)
        }
      )
    }
    if (type === 'ASSISTANCE_EMPLOYEE') {
      dispatch(employeesActions.getEmployees({ state: 'CREATED' }, false)).then(
        (list) => {
          setEmployees(list)
        }
      )
    }
    if (type === 'VISITS_ASSIGNED') {
      dispatch(usersActions.getFoundationUsers()).then((list) => {
        setUsersList(list)
      })
    }
  }, [type])

  return (
    <>
      {(type === 'VISITS_COMPANY' || type === 'ASSISTANCE_COMPANY') && (
        <Autocomplete
          options={companies}
          getOptionLabel={(option) => option.business_name || ''}
          onChange={onChange}
          renderOption={(option) => (
            <Box>
              <Typography>
                {`Razón social: `}
                <strong>{option.business_name}</strong>
              </Typography>
              <Typography>{`Rut: ${option.rut}`}</Typography>
            </Box>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Selecciona empresa"
              placeholder="Nombre de empresa"
            />
          )}
        />
      )}
      {type === 'ASSISTANCE_EMPLOYEE' && (
        <Autocomplete
          options={employees}
          getOptionLabel={(option) =>
            `${option.names} ${option.paternal_surname} ${option.maternal_surname}` ||
            ''
          }
          onChange={onChange}
          renderOption={(option) => (
            <Box>
              <Typography>
                {`Nombre: `}
                <strong>{`${option.names} ${option.paternal_surname} ${option.maternal_surname}`}</strong>
              </Typography>
              <Typography>{`Rut: ${option.run}`}</Typography>
            </Box>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Selecciona Trabajador"
              placeholder="Nombre de trabajador"
            />
          )}
        />
      )}
      {type === 'VISITS_ASSIGNED' && (
        <Autocomplete
          options={users}
          getOptionLabel={(option) =>
            `${option.names} ${option.paternal_surname}` || ''
          }
          onChange={onChange}
          renderOption={(option) => (
            <Box>
              <Typography>
                {`Nombre: `}
                <strong>{`${option.names} ${option.paternal_surname} ${option.maternal_surname}`}</strong>
              </Typography>
              <Typography>{`email: ${option.email}`}</Typography>
            </Box>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Selecciona Profesional"
              placeholder="Nombre de Profesional"
            />
          )}
        />
      )}
    </>
  )
}

export default AutocompleteVariable
