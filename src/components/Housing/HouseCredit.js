import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Box, Grid, Typography, IconButton } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import { ActionsTable, Button, SearchInput } from '../UI'
import { DataTable } from '../Shared'
import housingActions from '../../state/actions/housing'
import { formatDate } from '../../formatters'

const HouseAgreements = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [loading, setLoading] = useState(false)
  const [query, setQuery] = useState({ page: 1, size: 10, search: '' })
  const { agreementList, totalAgreements } = useSelector(
    (state) => state.housing
  )

  const onClickCreate = () => {
    history.push(`/housing/new`)
  }

  const onClickArrow = (id) => {
    history.push(`/agreement/${id}`)
  }

  const handleSearch = (e) => {
    setQuery({ ...query, search: e.target.value })
  }

  const fetchAgreements = () => {
    setLoading(true)
    dispatch(
      housingActions.getAgreements({ ...query, search: query.search.trim() })
    ).then(() => {
      setLoading(false)
    })
  }
  const searchButton = () => {
    fetchAgreements()
  }
  useEffect(() => {
    fetchAgreements()
  }, [query])

  return (
    <Box>
      <Box>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography style={{ fontSize: 18, fontWeight: 'bold' }} variant="h7">
            Convenios
          </Typography>
        </Box>
      </Box>
      <Box mb={1}>
        <Grid container>
          <Grid item xs={12} md={5}>
            <SearchInput
              placeholder="Buscar convenio por: Nombre de empresa"
              value={query.search}
              onChange={handleSearch}
            >
              <IconButton onClick={searchButton}>
                <SearchIcon color="primary" fontSize="large" />
              </IconButton>
            </SearchInput>
          </Grid>
          <Grid item xs={12} md={7}>
            <Box textAlign="right">
              <Button onClick={onClickCreate}>Nuevo convenio</Button>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <DataTable
        higlightOnHover
        pointerOnHover
        data={agreementList}
        progressPending={loading}
        emptyMessage={
          query.search
            ? `No se encontraron resultados para:${query.search}`
            : 'No se crearon convenios'
        }
        columns={[
          {
            name: 'Rut',
            selector: (row) => row.number
          },
          {
            name: 'Empresa',
            selector: (row) => row.businessName.toUpperCase()
          },
          {
            name: 'Fecha',
            selector: (row) => formatDate(row.date)
          },
          {
            name: '',
            right: true,
            selector: (row) => (
              <ActionsTable onView={() => onClickArrow(row.id)} />
            )
          }
        ]}
        onRowClicked={(row) => onClickArrow(row.id)}
        pagination
        paginationRowsPerPageOptions={[10, 20, 30, 40]}
        paginationPerPage={query.size}
        paginationServer
        onChangeRowsPerPage={(limit) => {
          setQuery({ ...query, size: limit })
        }}
        onChangePage={(page) => {
          setQuery({ ...query, page })
        }}
        paginationTotalRows={totalAgreements}
      />
    </Box>
  )
}

export default HouseAgreements
