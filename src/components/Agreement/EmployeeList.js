import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { Box, Grid, Typography } from '@material-ui/core'
import { DataTable } from '../Shared'
import { ActionsTable, Button, SearchInput } from '../UI'
import housingActions from '../../state/actions/housing'
import { formatDate } from '../../formatters'

const EmployeeList = ({ annexedId, status }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { agreementId } = useParams()
  const [loading, setLoading] = useState(false)
  const [query, setQuery] = useState({
    page: 1,
    size: 30,
    search: ''
  })

  const onRowClick = (id) => {
    history.push(`/agreement/${agreementId}/employee/${id}`)
  }
  const { employees, totalEmployees: totalDocs } = useSelector(
    (state) => state.housing
  )

  const fetchEmployees = () => {
    setLoading(true)
    dispatch(
      housingActions.getAgreementEmployees({ ...query, annexedId })
    ).then(() => {
      setLoading(false)
    })
  }

  useEffect(() => {
    fetchEmployees()
  }, [query, annexedId])
  return (
    <Box>
      <Typography
        style={{ fontSize: 17, fontWeight: 'bold', marginBottom: 10 }}
      >
        Trabajadores
      </Typography>
      <Grid container>
        <Grid item xs={12} md={5}>
          <SearchInput
            placeholder="Buscar trabajador: Nombres"
            value={query.search}
            onChange={(e) => {
              setQuery({ ...query, search: e.target.value })
            }}
          />
        </Grid>
        <Grid item xs={12} md={7}>
          <Box display="flex" justifyContent="flex-end">
            <Button disabled={status === 'VALID'}>Agregar</Button>
          </Box>
        </Grid>
      </Grid>
      <DataTable
        progressPending={loading}
        emptyMessage={
          query.search
            ? `No se encontraron resultados para: ${query.search}`
            : 'Aún no hay trabajadores creados'
        }
        highlightOnHover
        pointerOnHover
        columns={[
          {
            name: 'Fecha de convenio',
            selector: (row) => formatDate(row.createdDate),
            hide: 'md'
          },
          {
            name: 'Rut',
            selector: (row) => row.employeeRut,

            sortable: true
          },
          {
            name: 'Nombres y apellidos',
            selector: (row) => row.fullName
          },

          {
            name: '',
            right: true,
            selector: () => <ActionsTable onView={() => {}} />
          }
        ]}
        data={employees}
        pagination
        onRowClicked={(row) => onRowClick(row.employeeId)}
        paginationRowsPerPageOptions={[30, 40]}
        paginationPerPage={query.size}
        paginationServer={true}
        onChangeRowsPerPage={(limit) => {
          setQuery({ ...query, size: limit })
        }}
        onChangePage={(page) => {
          setQuery({ ...query, page })
        }}
        paginationTotalRows={totalDocs}
      />
    </Box>
  )
}

export default EmployeeList
