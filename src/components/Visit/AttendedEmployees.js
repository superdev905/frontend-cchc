import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams, useLocation } from 'react-router-dom'
import { Box, Grid, IconButton, Typography } from '@material-ui/core'
import { Edit as EditIcon, ArrowForward as ArrowIcon } from '@material-ui/icons'
import SearchIcon from '@material-ui/icons/Search'
import assistanceAction from '../../state/actions/assistance'
import employeesActions from '../../state/actions/employees'
import authActions from '../../state/actions/auth'
import uiActions from '../../state/actions/ui'
import { areaConfig } from '../../config'
import { DataTable } from '../Shared'
import { ActionsTable, Button, Locked, TextField, Wrapper } from '../UI'
import AssistanceDialog from '../Assistance/Dialog'
import { useToggle } from '../../hooks'
import searchWithRut from '../../formatters/searchWithRut'
import JobsDialog from './JobsDialog'
import ConfirmationDialog from './ConfirmationDialog'
import { EmployeeForm } from '../Employees'

const List = () => {
  const dispatch = useDispatch()
  const { idVisit } = useParams()
  const history = useHistory()
  const { pathname } = useLocation()
  const { user } = useSelector((state) => state.auth)
  const { open: openJobs, toggleOpen: toggleOpenJobs } = useToggle()
  const { open: openEmployeeForm, toggleOpen: toggleOpenJEmployeeForm } =
    useToggle()
  const { open: openConfirmation, toggleOpen: toggleOpenConfirmation } =
    useToggle()
  const [searchUser, setSearchUser] = useState('')
  const [searching, setSearching] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const { open, toggleOpen } = useToggle()
  const [searchResult, setSearchResult] = useState([])
  const [attendedList, setAttendedList] = useState([])

  const { visit, attendedEmployeeList, historicly } = useSelector(
    (state) => state.assistance
  )
  const atentionType = [
    { name: 'SALUD', short: 'S' },
    { name: 'INCORPORACION', short: 'IN' },
    { name: 'FINIQUITADO', short: 'FN' },
    { name: 'DEUDA / AHORRO', short: 'D' },
    { name: 'FAMILIA', short: 'F' },
    { name: 'EDUCACIÓN', short: 'E' },
    { name: 'LEGAL', short: 'L' },
    { name: 'FUNDACION RECONOCER', short: 'FR' },
    { name: 'ATENCIÓN INDIVIDUAL', short: 'AI' },
    { name: 'ATENCION GRUPAL', short: 'AG' },
    { name: 'PREVISIÓN', short: 'P' },
    { name: 'VIVIENDA', short: 'V' },
    { name: 'PROYECTOS SOCIALES', short: 'PS' },
    { name: 'BENEFICIOS DE EMPRESA', short: 'B' }
  ]

  const fetchAttendedList = () => {
    dispatch(assistanceAction.getAssistanceList({ visit_id: idVisit }))
  }

  const onCreateEmployee = (values) =>
    dispatch(
      employeesActions.createEmployee({ ...values, created_by: user.id })
    )

  const drawAreasColumns = (list) =>
    list.map((item) => ({
      name: item.short,
      minWidth: 10,
      selector: (row) => row[item.short],
      center: true,
      hide: 'md'
    }))

  const addEmployee = (
    <Grid item xs={12} md={12}>
      <Box display={'flex'} flexDirection={'column'} justifyContent={'center'}>
        No se encontraron trabajadores
        <Button
          disabled={visit?.status !== 'INICIADA'}
          onClick={() => {
            dispatch(uiActions.setCurrentModule('EMPRESAS'))
            toggleOpenJEmployeeForm()
          }}
        >
          Agregar trabajador
        </Button>
      </Box>
    </Grid>
  )

  const confirmationButtom = (
    <Button onClick={() => toggleOpenConfirmation()}>Validar Datos</Button>
  )

  const logAction = (action) => {
    const values = {
      user_id: user.id,
      user_name: `${user.names} ${user.paternal_surname} ${user.maternal_surname}`,
      action
    }
    dispatch(authActions.logs(values))
  }

  const searchEmployee = () => {
    setSearching(true)
    setSearchResult([])
    logAction('BOTON BUSCAR TRABAJADOR')
    dispatch(
      assistanceAction.searchEmployee({
        employee_rut: searchUser,
        visit_id: idVisit
      })
    ).then((result) => {
      setSearching(false)
      setSearchResult(
        result.map((item) => ({
          ...item,
          fullName: `${item.names} ${item.paternal_surname} ${item?.maternal_surname}`
        }))
      )
    })
  }

  const createAttention = (values) =>
    dispatch(
      assistanceAction.createAssistance({
        ...values,
        business_id: visit.business_id,
        construction_id: visit.construction_id,
        construction_name: visit.construction_name,
        employee_id: selectedUser.id,
        employee_name: selectedUser.names,
        employee_lastname: `${selectedUser.paternal_surname} ${selectedUser.maternal_surname}`,
        employee_rut: selectedUser.run,
        visit_id: idVisit
      })
    )

  useEffect(() => {
    fetchAttendedList()
  }, [])

  const attended = (arr) => {
    const unique = []
    arr.forEach((element) => {
      const [type] = atentionType?.filter((f) => f.name === element.atention)
      if (unique.length > 0) {
        const add = []
        unique.forEach((el, index) => {
          if (el.id === element.id) {
            add.push(true)
            unique[index] = { ...el, [type.short]: element.quantity }
          }
        })
        if (add.length === 0) {
          unique.push({ ...element, [type.short]: element.quantity })
        }
      } else {
        unique.push({ ...element, [type.short]: element.quantity })
      }
    })
    return unique
  }

  const newOrOld = (arr) => {
    const unique = []
    if (arr.length > 0) {
      arr.forEach((validatedUser) => {
        const old = historicly.some((hist) => hist[0] === validatedUser.id)
        if (old) {
          unique.push({ ...validatedUser, tag: 'A' })
        } else {
          unique.push({ ...validatedUser, tag: 'N' })
        }
      })
      return unique
    }
    return unique
  }

  useEffect(() => {
    const result = attended(attendedEmployeeList)
    const newResult = newOrOld(result)
    setAttendedList(newResult)
    dispatch(assistanceAction.totalUsers(newResult))
  }, [attendedEmployeeList, historicly])

  useEffect(() => {
    if (searchUser) {
      setSearching(true)
      setSearchResult([])
      dispatch(
        assistanceAction.searchEmployee({
          employee_rut: searchUser,
          visit_id: idVisit
        })
      ).then((result) => {
        setSearching(false)
        setSearchResult(
          result.map((item) => ({
            ...item,
            fullName: `${item.names} ${item.paternal_surname} ${item?.maternal_surname}`
          }))
        )
      })
    } else {
      setSearching(false)
      setSearchResult([])
    }
  }, [])

  return (
    <Wrapper>
      <Box p={1}>
        <Typography
          style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '10px' }}
        >
          Trabajadores atendidos
        </Typography>
      </Box>

      <DataTable
        bordered
        background
        emptyMessage="No hay trabajadores atendidos"
        columns={[
          {
            name: 'Run',
            selector: (row) => row.run,
            sortable: true,
            width: '150px'
          },
          {
            name: 'Nombres y apellidos',
            selector: (row) => row.fullName,
            width: '250px'
          },
          {
            name: '',
            center: true,
            selector: (row) => row.tag
          },

          ...drawAreasColumns(areaConfig.areaList),
          {
            name: '',
            right: true,
            button: true,
            cell: (row) => (
              <ActionsTable
                moreOptions={[
                  {
                    icon: <ArrowIcon />,
                    onClick: () => {
                      history.push(`${pathname}/attended/${row.id}`)
                    }
                  }
                ]}
              />
            )
          }
        ]}
        data={attendedList}
      />
      {visit && !visit.is_close ? (
        <Box marginTop="20px" p={1}>
          <Box mb={2}>
            <Typography
              style={{
                marginBottom: '20px',
                fontSize: '18px',
                fontWeight: 'bold'
              }}
            >
              Atender trabajador
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <TextField
                  disabled={visit.status !== 'INICIADA'}
                  placeholder="BUSCAR POR: RUT, NOMBRES"
                  value={searchUser}
                  onChange={(e) => {
                    setSearchUser(searchWithRut(e.target.value))
                  }}
                />
              </Grid>
              <IconButton
                disabled={visit.status !== 'INICIADA'}
                onClick={() => searchEmployee()}
              >
                <SearchIcon />
              </IconButton>
            </Grid>
          </Box>

          <DataTable
            bordered
            progressPending={searching}
            emptyMessage={addEmployee}
            columns={[
              {
                name: 'Run',
                selector: (row) => row.run,
                sortable: true
              },
              {
                name: 'Nombres y Apellidos',
                selector: (row) => row.fullName,
                sortable: true
              },
              {
                name: 'N',
                selector: (row) => row.tag
              },
              {
                name: '',
                right: true,
                cell: (row) => (
                  <Box>
                    <Button
                      size="small"
                      startIcon={<EditIcon />}
                      onClick={() => {
                        const isAttended = attendedList.some(
                          (usuario) => usuario.id === row.id
                        )
                        if (isAttended) {
                          toggleOpen()
                        } else {
                          toggleOpenJobs()
                        }
                        setSelectedUser(row)
                      }}
                    >
                      Actualizar
                    </Button>
                    {/*  <Button
                      size="small"
                      startIcon={<AddIcon />}
                      onClick={() => {
                        toggleOpen()
                        setSelectedUser(row)
                      }}
                    >
                      Atender
                    </Button> */}
                  </Box>
                )
              }
            ]}
            data={searchResult}
          />

          <EmployeeForm
            open={openEmployeeForm}
            type={'CREATE'}
            onClose={toggleOpenJEmployeeForm}
            submitFunction={onCreateEmployee}
            successMessage={'Trabajador creado'}
            successFunction={() => {
              dispatch(uiActions.setCurrentModule('VISITAS'))
            }}
          />
        </Box>
      ) : (
        <Box mt={2}>
          <Locked message={'No se puede agregar más atenciones'} />
        </Box>
      )}

      {visit && selectedUser && open && (
        <AssistanceDialog
          event={visit}
          open={open}
          employee={selectedUser}
          visitShift={visit.shift.name}
          onClose={toggleOpen}
          submitFunction={createAttention}
          company={{
            business_name: visit.business_name,
            id: visit.business_id
          }}
          construction={{ name: visit.construction_name }}
          successFunction={fetchAttendedList}
          successMessage="Atención creada con éxito"
        />
      )}

      {selectedUser && openJobs && (
        <JobsDialog
          open={openJobs}
          onClose={toggleOpenJobs}
          employeeId={selectedUser.id}
          employeeNames={`${selectedUser.names} ${selectedUser.paternal_surname}`}
          employeeRun={selectedUser.run}
          customButon={confirmationButtom}
        />
      )}
      {selectedUser && openConfirmation && (
        <ConfirmationDialog
          open={openConfirmation}
          onClose={toggleOpenConfirmation}
          onCloseJobs={toggleOpenJobs}
          onCloseAssistence={toggleOpen}
          employeeId={selectedUser.id}
          employeeNames={`${selectedUser.names} ${selectedUser.paternal_surname}`}
          employeeRun={selectedUser.run}
        />
      )}
    </Wrapper>
  )
}

export default List
