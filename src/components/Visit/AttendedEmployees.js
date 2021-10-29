import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams, useLocation } from 'react-router-dom'
import { Box, Grid, Typography } from '@material-ui/core'
import {
  AddCircleOutline as AddIcon,
  Edit as EditIcon,
  ArrowForward as ArrowIcon
} from '@material-ui/icons'
import assistanceAction from '../../state/actions/assistance'
import { areaConfig } from '../../config'
import { DataTable } from '../Shared'
import { ActionsTable, Button, TextField, Wrapper } from '../UI'
import WorkerInterventionRecord from '../Assistance/InterventionRegistration/WorkerInterventionRecord'
import { useToggle } from '../../hooks'
import searchWithRut from '../../formatters/searchWithRut'
import JobsDialog from './JobsDialog'

const List = () => {
  const dispatch = useDispatch()
  const { idVisit } = useParams()
  const history = useHistory()
  const { pathname } = useLocation()
  const { open: openJobs, toggleOpen: toggleOpenJobs } = useToggle()
  const [searchUser, setSearchUser] = useState('')
  const [searching, setSearching] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const { open, toggleOpen } = useToggle()
  const [searchResult, setSearchResult] = useState([])
  const [attendedList, setAttendedList] = useState([])

  const { visit, attendedEmployeeList } = useSelector(
    (state) => state.assistance
  )

  const fetchAttendedList = () => {
    dispatch(assistanceAction.getAssistanceList({ visit_id: idVisit }))
  }

  const drawAreasColumns = (list) =>
    list.map((item) => ({
      name: item.short,
      minWidth: 10,
      selector: (row) => row[item.short],
      center: true,
      hide: 'md'
    }))

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
    setAttendedList(
      attendedEmployeeList.map((item) => ({
        ...item,
        fullName: `${item.employee_fullname}`
      }))
    )
  }, [attendedEmployeeList])

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
        bordered
        emptyMessage="No hay trabajadores atendidos"
        columns={[
          {
            name: 'Run',
            selector: (row) => row.employee_run,
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
                      history.push(`${pathname}/attended/${row.employee_id}`)
                    }
                  }
                ]}
              />
            )
          }
        ]}
        data={attendedList}
      />
      <Box marginTop="20px" p={1}>
        <Typography style={{ marginBottom: '20px' }}>
          Agregar nuevo trabajador
        </Typography>
        <Grid spacing={2}>
          <Grid item xs={12} md={4}>
            <TextField
              label="Buscar trabajador"
              placeholder="Rut"
              value={searchUser}
              onChange={(e) => {
                setSearchUser(searchWithRut(e.target.value))
              }}
            />
          </Grid>
        </Grid>

        <DataTable
          bordered
          progressPending={searching}
          emptyMessage="No se encontraron trabajadores"
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
                    disabled={row.is_old}
                    onClick={() => {
                      toggleOpenJobs()
                      setSelectedUser(row)
                    }}
                  >
                    Registrar
                  </Button>
                  <Button
                    size="small"
                    startIcon={<AddIcon />}
                    onClick={() => {
                      toggleOpen()
                      setSelectedUser(row)
                    }}
                  >
                    Atender
                  </Button>
                </Box>
              )
            }
          ]}
          data={searchResult}
        />
      </Box>
      {visit && selectedUser && open && (
        <WorkerInterventionRecord
          open={open}
          employee={selectedUser}
          visitShift={visit.shift.name}
          onClose={toggleOpen}
          submitFunction={createAttention}
          company={{ business_name: visit.business_name }}
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
        />
      )}
    </Wrapper>
  )
}

export default List
