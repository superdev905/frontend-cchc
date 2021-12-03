import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Skeleton } from '@material-ui/lab'
import { Box, Grid, Typography } from '@material-ui/core'
import { Dialog, DataTable } from '../../Shared'
import { formatSearchWithRut } from '../../../formatters'
import { Button, EmptyState, TextField, ActionsTable } from '../../UI'
import EmployeeRow from '../../Scholarships/Create/EmployeeRow'
import employeesActions from '../../../state/actions/employees'
import generateColor from '../../../utils/generateColor'

const AddEmployee = ({ open, onClose, loader, submitFunction }) => {
  const dispatch = useDispatch()

  const { isMobile } = useSelector((state) => state.ui)
  const [employeeList, setEmployeeList] = useState([])
  const [searchRut, setSearchRut] = useState('')
  const [searchList, setSearchList] = useState([])
  const [selectedEmployee, setSelectedEmployee] = useState(null)

  const addEmployee = (selected) => {
    const updatedList = employeeList.concat(selected)
    setEmployeeList(updatedList)
  }

  const handleSubmit = () => {
    submitFunction(employeeList)
    onClose()
  }

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
      setSearchRut('')
      setSearchList([])
      setSelectedEmployee(null)
    }
  }, [open])

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth={'lg'}
      fullScreen={isMobile}
    >
      <Box>
        <Typography variant="h6" align="center" style={{ fontWeight: 'bold' }}>
          Agregar trabajadores
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
                              addEmployee(item)
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

        <Box mt={2}>
          <Box>
            <Typography
              style={{ fontSize: 18, fontWeight: 'bold' }}
            >{`Trabajadores seleccionados: ${employeeList.length}`}</Typography>
          </Box>
          <DataTable
            data={employeeList}
            columns={[
              { name: 'Run', selector: (row) => row.run },
              {
                name: 'Nombres y apellidos',
                selector: (row) =>
                  `${row.names} ${row.paternal_surname} ${
                    row.paternal_surname || ''
                  }`
              },
              {
                name: 'Sexo',
                selector: (row) => row.gender
              },
              {
                name: '',
                right: true,
                selector: (row) => (
                  <ActionsTable
                    onDelete={() => {
                      const list = employeeList.filter(
                        (item) => item.id !== row.id
                      )
                      setEmployeeList(list)
                    }}
                  />
                )
              }
            ]}
          />
        </Box>

        <Box textAlign="center" marginTop="10px">
          <Button onClick={onClose} variant="outlined">
            Cancelar
          </Button>
          <Button
            onClick={() => handleSubmit()}
            disabled={employeeList.length === 0}
          >
            Agregar
          </Button>
        </Box>
      </Box>
    </Dialog>
  )
}

export default AddEmployee
