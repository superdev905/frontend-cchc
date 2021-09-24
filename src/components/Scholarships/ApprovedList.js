import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Box } from '@material-ui/core'
import { Wrapper } from '../UI'
import { DataTable } from '../Shared'
import scholarshipsActions from '../../state/actions/scholarships'

const ApprovedList = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [filters, setFilters] = useState({
    page: 1,
    size: 30,
    search: '',
    state: ''
  })

  const fetchPostulations = () => {
    setLoading(true)
    dispatch(
      scholarshipsActions.getPostulations({
        ...filters,
        search: filters.search.trim()
      })
    ).then(() => {
      setLoading(false)
    })
  }

  useEffect(() => {
    fetchPostulations()
  }, [])

  return (
    <Box>
      <Wrapper>
        <DataTable
          progressPending={loading}
          highlightOnHover
          pointerOnHover
          columns={[
            {
              name: 'Fecha',
              selector: (row) => row.date,
              sortable: true
            },
            {
              name: 'Beca',
              selector: (row) => row.scholarshipType?.name,
              sortable: true
            },
            {
              name: 'Trabajador',
              selector: (row) => row.employeeNames
            },
            {
              name: 'Empresa',
              selector: (row) => row.bussinesName,
              hide: 'md'
            },
            {
              name: 'Beneficiario',
              selector: (row) => row.beneficiaryNames,
              hide: 'md'
            },
            {
              name: 'Estado',
              hide: 'md',

              cell: (row) => (
                <StatusChip
                  label={`${
                    row.state === 'DELETED' ? 'Rechazada' : 'Aprobada'
                  } `}
                  success={row.state === 'CREATED'}
                  error={row.state === 'DELETED'}
                />
              )
            }
          ]}
          // data={}
          pagination
          // onRowClicked={onRowClick}
          paginationRowsPerPageOptions={[30, 40]}
          paginationPerPage={filters.limit}
          paginationServer={true}
          onChangeRowsPerPage={(limit) => {
            setFilters({ ...filters, limit })
          }}
          onChangePage={(page) => {
            setFilters({ ...filters, skip: page })
          }}
        />
      </Wrapper>
    </Box>
  )
}

export default withRouter(ApprovedList)
