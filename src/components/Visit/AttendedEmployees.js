import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Box, Grid, Typography } from '@material-ui/core'
import {
  AddCircleOutline as AddIcon,
  Edit as EditIcon
} from '@material-ui/icons'
import employeesAction from '../../state/actions/employees'
import assistanceAction from '../../state/actions/assistance'
import { DataTable } from '../Shared'
import { Button, RutTextField, Wrapper } from '../UI'
import WorkerInterventionRecord from '../Assistance/InterventionRegistration/WorkerInterventionRecord'
import { useToggle } from '../../hooks'

const ContactList = () => {
  const dispatch = useDispatch()
  const { idVisit } = useParams()
  const [searchUser, setSearchUser] = useState('')
  const [selectedUser, setSelectedUser] = useState(null)
  const { open, toggleOpen } = useToggle()
  const [searchResult, setSearchResult] = useState([])
  const { visit, attendedEmployeeList: attendedList } = useSelector(
    (state) => state.assistance
  )

  const fetchAttendedList = () => {
    dispatch(assistanceAction.getAssistanceList({ visit_id: idVisit }))
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

  useEffect(() => {
    if (searchUser) {
      dispatch(
        employeesAction.getEmployees(
          { search: searchUser, state: 'CREATED' },
          false
        )
      ).then((result) => {
        setSearchResult(
          result.map((item) => ({
            ...item,
            fullName: `${item.names}`,
            lastName: `${item.paternal_surname} ${item.maternal_surname}`
          }))
        )
      })
    } else {
      setSearchResult([])
    }
  }, [searchUser])

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
        emptyMessage="No hay trabajadores atendidos"
        columns={[
          {
            name: 'Run',
            selector: (row) => row.employee_rut,
            sortable: true
          },
          {
            name: 'Nombres',
            selector: (row) => row.employee_name,
            sortable: true
          },
          {
            name: 'Apellidos',
            selector: (row) => row.employee_lastname,
            sortable: true
          },
          {
            name: 'Area',
            selector: (row) => row.area_name
          }
        ]}
        data={attendedList}
      />
      <Box marginTop="20px">
        <Typography style={{ marginBottom: '20px' }}>
          Agregar nuevo trabajador
        </Typography>
        <Grid spacing={2}>
          <Grid item xs={12} md={4}>
            <RutTextField
              label="Buscar trabajador"
              placeholder="Rut"
              value={searchUser}
              onChange={(e) => {
                setSearchUser(e.target.value)
              }}
            />
          </Grid>
        </Grid>

        <DataTable
          overflow={false}
          emptyMessage="No se encontraron trabajadores"
          columns={[
            {
              name: 'Run',
              selector: (row) => row.run,
              sortable: true
            },
            {
              name: 'Nombres',
              selector: (row) => row.fullName,
              sortable: true
            },
            {
              name: 'Apellidos',
              selector: (row) => row.lastName
            },
            {
              name: '',
              right: true,
              cell: (row) => (
                <Box>
                  <Button size="small" startIcon={<EditIcon />}>
                    Trabajos
                  </Button>
                  <Button
                    size="small"
                    startIcon={<AddIcon />}
                    onClick={() => {
                      toggleOpen()
                      setSelectedUser(row)
                    }}
                  >
                    Atención
                  </Button>
                </Box>
              )
            }
          ]}
          data={searchResult}
        />
      </Box>
      {visit && open && (
        <WorkerInterventionRecord
          open={open}
          onClose={toggleOpen}
          submitFunction={createAttention}
          company={{ business_name: visit.business_name }}
          construction={{ name: visit.construction_name }}
          successFunction={fetchAttendedList}
        />
      )}
    </Wrapper>
  )
}

export default ContactList
