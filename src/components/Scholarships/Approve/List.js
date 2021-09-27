import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { formatDate } from '../../../formatters'
import scholarshipsActions from '../../../state/actions/scholarships'
import { DataTable } from '../../Shared'
import { PageHeading, Wrapper } from '../../UI'

const ApprovedList = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [loading, setLoading] = useState(false)
  const { approvedScholarships: list, totalApproved: totalDocs } = useSelector(
    (state) => state.scholarships
  )
  const [filters, setFilters] = useState({
    skip: 0,
    limit: 30,
    search: '',
    state: ''
  })

  const onRowClick = (row) => {
    history.push(`/scholarship/approved/${row.id}`)
  }

  const fetchData = () => {
    setLoading(true)
    dispatch(scholarshipsActions.getApprovedScholarships(filters))
      .then(() => {
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchData()
  }, [])
  return (
    <Wrapper>
      <PageHeading>Becas aprobadas</PageHeading>
      <DataTable
        progressPending={loading}
        emptyMessage={
          filters.search
            ? `No se encontraron resultados para: ${filters.search}`
            : 'Aún no hay becas aprobadas'
        }
        highlightOnHover
        pointerOnHover
        columns={[
          {
            name: 'Fecha de aprobación',
            selector: (row) => formatDate(row.date)
          },
          {
            name: 'Nombre del beneficiario',
            selector: (row) => row.postulation.beneficiaryNames,
            sortable: true
          },
          {
            name: 'Trabajador',
            selector: (row) => row.postulation.employeeNames,
            hide: 'md'
          },
          {
            name: 'Empresa',
            selector: (row) => row.postulation.businessName,
            hide: 'md'
          }
        ]}
        data={list}
        pagination
        onRowClicked={onRowClick}
        paginationRowsPerPageOptions={[30, 40]}
        paginationPerPage={filters.limit}
        paginationServer={true}
        onChangeRowsPerPage={(limit) => {
          setFilters({ ...filters, limit })
        }}
        onChangePage={(page) => {
          setFilters({ ...filters, skip: page })
        }}
        paginationTotalRows={totalDocs}
      />
    </Wrapper>
  )
}

export default ApprovedList
