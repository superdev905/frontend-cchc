import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Box, Grid, Typography } from '@material-ui/core'
import {
  AddCircleOutline as AddIcon,
  Edit as EditIcon
} from '@material-ui/icons'
import employeesAction from '../../state/actions/employees'
import { DataTable } from '../Shared'
import { Button, RutTextField, Wrapper } from '../UI'

const ContactList = () => {
  const dispatch = useDispatch()
  const [searchUser, setSearchUser] = useState('')
  const [searchResult, setSearchResult] = useState([])

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
            selector: 'run',
            sortable: true
          },
          {
            name: 'Nombres',
            selector: 'fullName',
            sortable: true
          },
          {
            name: 'Apellidos',
            selector: 'lastName'
          }
        ]}
        data={[]}
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
              selector: 'run',
              sortable: true
            },
            {
              name: 'Nombres',
              selector: 'fullName',
              sortable: true
            },
            {
              name: 'Apellidos',
              selector: 'lastName'
            },
            {
              name: '',
              right: true,
              cell: () => (
                <Box>
                  <Button size="small" startIcon={<EditIcon />}>
                    Trabajos
                  </Button>
                  <Button size="small" startIcon={<AddIcon />}>
                    Atención
                  </Button>
                </Box>
              )
            }
          ]}
          data={searchResult}
        />
      </Box>
    </Wrapper>
  )
}

export default ContactList
