import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/styles'
import { Box, Menu, Fade } from '@material-ui/core'
import { Select, Button } from '../UI'
import companiesActions from '../../state/actions/companies'
import employeesActions from '../../state/actions/employees'
import commonActions from '../../state/actions/common'

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.up('md')]: {
      minWidth: '400px'
    }
  }
}))

const FiltersMenu = ({ open, anchorEl, onClose }) => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const { areas } = useSelector((state) => state.common)
  const [companies, setCompanies] = useState([])
  const [employees, setEmployees] = useState([])
  /* const [seleted, setSeleted] = useState({
    businessId: '',
    isActive: '',
    employeeNames: '',
    zone: '',
    delegation: '',
    createdDate: '',
    areaId: ''
  }) */

  useEffect(() => {
    dispatch(companiesActions.getCompanies({ state: 'CREATED' }, false)).then(
      (list) => {
        setCompanies(list)
      }
    )
    dispatch(employeesActions.getEmployees({ state: 'CREATED' }, false)).then(
      (list) => {
        setEmployees(list)
      }
    )
    dispatch(commonActions.getAreas())
  }, [])

  return (
    <Menu
      classes={{ paper: classes.root }}
      TransitionComponent={Fade}
      open={open}
      onClose={onClose}
      anchorEl={anchorEl}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center'
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center'
      }}
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        padding="10px"
      >
        <Box width="100%">
          Empresa:
          <Select name="companies">
            <option value="">-Seleccione-</option>
            {companies.map((item) => (
              <option
                key={`application--filters-companies${item.id}`}
                value={item.id}
              >
                {item.name}
              </option>
            ))}
          </Select>
        </Box>

        <Box width="100%">
          Estado:
          <Select name="status">
            <option value="">-Seleccione-</option>
            {['ACTIVO', 'COMPLETADO'].map((item) => (
              <option key={`application--filters-state${item}`} value={item}>
                {item}
              </option>
            ))}
          </Select>
        </Box>

        <Box width="100%">
          Profesional:
          <Select name="employees">
            <option value="">-Seleccione-</option>
            {employees.map((item) => (
              <option
                key={`application--filters-employees${item.id}`}
                value={item.id}
              >
                {item.names}
              </option>
            ))}
          </Select>
        </Box>

        <Box width="100%">
          Zona:
          <Select name="zone">
            <option value="">-Seleccione-</option>
            {employees.map((item) => (
              <option
                key={`application--filters-zone${item.id}`}
                value={item.id}
              >
                {item.names}
              </option>
            ))}
          </Select>
        </Box>

        <Box width="100%">
          Delegación:
          <Select name="delegation">
            <option value="">-Seleccione-</option>
            {employees.map((item) => (
              <option
                key={`application--filters-delegation${item.id}`}
                value={item.id}
              >
                {item.names}
              </option>
            ))}
          </Select>
        </Box>

        <Box width="100%">
          Fecha de Inicio:
          <Select name="firstDate">
            <option value="">-Seleccione-</option>
            {employees.map((item) => (
              <option
                key={`application--filters-firstDate${item.id}`}
                value={item.id}
              >
                {item.names}
              </option>
            ))}
          </Select>
        </Box>

        <Box width="100%">
          Fecha de Fin:
          <Select name="endDate">
            <option value="">-Seleccione-</option>
            {employees.map((item) => (
              <option
                key={`application--filters-endDate${item.id}`}
                value={item.id}
              >
                {item.names}
              </option>
            ))}
          </Select>
        </Box>

        <Box width="100%">
          Area:
          <Select name="area">
            <option value="">-Seleccione-</option>
            {areas.map((item) => (
              <option
                key={`application--filters-areas${item.id}`}
                value={item.id}
              >
                {item.name}
              </option>
            ))}
          </Select>
        </Box>

        <Box width="100%" display="flex" justifyContent="center">
          <Button variant="outlined">Cancelar</Button>
          <Button>Aplicar</Button>
        </Box>
      </Box>
    </Menu>
  )
}

export default FiltersMenu
