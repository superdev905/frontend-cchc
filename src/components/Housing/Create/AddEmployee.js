import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Skeleton } from '@material-ui/lab'
import { Box, Grid, Typography } from '@material-ui/core'
import { Dialog } from '../../Shared'
import { formatSearchWithRut } from '../../../formatters'
import { EmptyState, TextField } from '../../UI'
import { useToggle } from '../../../hooks'
import EmployeeRow from '../../Scholarships/Create/EmployeeRow'
import employeesActions from '../../../state/actions/employees'
import generateColor from '../../../utils/generateColor'
import EmployeeModal from '../../Employees/EmployeeForm'

const AddEmployee = ({ open, onClose, loader, onAdd }) => {
  const dispatch = useDispatch()

  const { isMobile } = useSelector((state) => state.ui)
  const { user } = useSelector((state) => state.auth)
  const [employeeList, setEmployeeList] = useState([])
  const [searchRut, setSearchRut] = useState('')
  const [searchList, setSearchList] = useState([])
  const [selectedEmployee, setSelectedEmployee] = useState(null)
  const { open: openForm, toggleOpen: toggleOpenForm } = useToggle()

  const addEmployee = (selected) => {
    const updatedList = employeeList.concat(selected)
    setEmployeeList(updatedList)
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

  const createNewEmployee = (values) =>
    dispatch(
      employeesActions.createEmployee({ ...values, created_by: user.id })
    )

  const afterCreating = () => {
    setSearchRut('')
    setSearchList([])
    setSelectedEmployee(null)
  }

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
                          event={searchRut ? toggleOpenForm : null}
                          actionMessage={searchRut ? 'Nuevo Trabajador' : null}
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
                              onAdd(item)
                              onClose()
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
        {openForm && (
          <EmployeeModal
            open={openForm}
            onClose={toggleOpenForm}
            submitFunction={createNewEmployee}
            successMessage="trabajador creado correctamente"
            successFunction={afterCreating}
          />
        )}
      </Box>
    </Dialog>
  )
}

export default AddEmployee
