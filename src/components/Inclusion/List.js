import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Box, Chip, Grid, IconButton } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import InclusionDialog from './Dialog'
import { useToggle } from '../../hooks'
import { DataTable } from '../Shared'
import { ActionsTable, Button, SearchInput, Select } from '../UI'
import inclusionActions from '../../state/actions/inclusion'
import { formatDate, formatSearchWithRut } from '../../formatters'

const List = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [query, setQuery] = useState({
    search: '',
    status: '',
    page: 1,
    size: 10
  })
  const [totalCases, setTotalCases] = useState(0)
  const { user } = useSelector((state) => state.auth)
  const [loading, setLoading] = useState(false)
  const { inclusionCases } = useSelector((state) => state.inclusion)
  const { open: openCreate, toggleOpen: toggleOpenCreate } = useToggle()

  const onCreateCase = (values) =>
    dispatch(
      inclusionActions.createCase({
        ...values,
        date: new Date().toISOString(),
        assistanceId: user.id
      })
    )

  const getCases = () => {
    setLoading(true)
    dispatch(inclusionActions.getCases(query))
      .then((res) => {
        setLoading(false)
        setTotalCases(res.total)
      })
      .catch(() => {
        setLoading(false)
      })
  }

  const searchButton = () => {
    getCases()
  }
  useEffect(() => {
    getCases()
  }, [])

  return (
    <Box>
      <Box mt={2}>
        <Grid container alignItems="center">
          <Grid item xs={12} md={6} lg={7}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Select
                  value={query.status}
                  onChange={(e) =>
                    setQuery({ ...query, status: e.target.value })
                  }
                >
                  <option value="">TODOS</option>
                  {['INGRESADA', 'APROBADA', 'CERRADO'].map((item) => (
                    <option key={`option-${item}`} value={item}>
                      {item}
                    </option>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={8}>
                <SearchInput
                  placeholder="Buscar por: Rut de trabajador, Nombre"
                  value={query.search}
                  onChange={(e) => {
                    setQuery({
                      ...query,
                      search: formatSearchWithRut(e.target.value)
                    })
                  }}
                >
                  <IconButton onClick={searchButton}>
                    <SearchIcon color="primary" fontSize="large" />
                  </IconButton>
                </SearchInput>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={6} lg={5}>
            <Box textAlign="right">
              <Button onClick={toggleOpenCreate}>Nuevo</Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box>
        <DataTable
          data={inclusionCases}
          progressPending={loading}
          columns={[
            {
              name: 'N°',
              width: '80px',
              sortable: true,
              center: true,
              selector: (row) => row.number
            },
            {
              name: 'Estado',
              compact: true,
              selector: (row) => <Chip color="primary" label={row.status} />
            },
            {
              name: 'Rut de trabajador',
              compact: true,
              selector: (row) => row.employeeRut
            },
            {
              name: 'Trabajador',
              compact: true,
              selector: (row) => row.employeeNames
            },
            {
              name: 'Fecha',
              compact: true,
              selector: (row) => formatDate(row.date, {})
            },
            {
              name: 'Rut de empresa',
              compact: true,
              selector: (row) => row.businessRut
            },
            {
              name: 'Empresa',
              compact: true,
              selector: (row) => row.businessName
            },
            {
              name: 'Metodo cobro',
              compact: true,
              selector: (row) => row.chargeMethod.name
            },
            {
              name: '',
              right: true,
              compact: true,
              selector: (row) => (
                <ActionsTable
                  onView={() => {
                    history.push(`/inclusion-cases/${row.number}`)
                  }}
                />
              )
            }
          ]}
          onRowClicked={(row) => {
            history.push(`/inclusion-cases/${row.number}`)
          }}
          pagination
          highlightOnHover
          pointerOnHover
          selectableRowsHighlight
          paginationRowsPerPageOptions={[10, 20, 30, 40]}
          paginationPerPage={query.size}
          paginationServer={true}
          onChangeRowsPerPage={(limit) => {
            setQuery({
              ...query,
              size: limit
            })
          }}
          onChangePage={(page) => {
            setQuery({
              ...query,
              page
            })
          }}
          paginationTotalRows={totalCases}
        />
      </Box>
      {openCreate && (
        <InclusionDialog
          open={openCreate}
          onClose={toggleOpenCreate}
          submitFunction={onCreateCase}
          successFunction={getCases}
          successMessage={'Caso creado'}
        />
      )}
    </Box>
  )
}

export default List
