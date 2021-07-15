import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Box } from '@material-ui/core'
import companiesActions from '../../../state/actions/companies'
import Filters from './Filters'
import { ActionsTable, Wrapper } from '../../UI'
import CreateCompany from '../Create'
import { DataTable } from '../../Shared'

const List = ({ ...props }) => {
  const dispatch = useDispatch()

  const { list, showCreateModal, filters } = useSelector(
    (state) => state.companies
  )

  const toggleCreateModal = () => {
    dispatch(companiesActions.toggleCreateModal(showCreateModal))
  }

  const handleRowClick = (row) => {
    props.history.push(`/empresas/${row.id}`)
  }

  useEffect(() => {
    dispatch(companiesActions.getCompanies(filters))
  }, [])

  return (
    <Box marginTop="10px">
      <Filters />
      <Wrapper>
        <DataTable
          columns={[
            {
              name: 'Razón social',
              selector: 'business_name',
              sortable: true
            },
            {
              name: 'Rut',
              selector: 'rut'
            },
            {
              name: 'Correo',
              selector: 'email',

              hide: 'md'
            },
            {
              name: 'Estado',
              selector: 'state',
              hide: 'md'
            },
            {
              right: true,
              cell: (row) => <ActionsTable onView={() => handleRowClick(row)} />
            }
          ]}
          data={list}
          pagination
          onRowClicked={handleRowClick}
        />
      </Wrapper>

      <CreateCompany open={showCreateModal} onClose={toggleCreateModal} />
    </Box>
  )
}

export default withRouter(List)
