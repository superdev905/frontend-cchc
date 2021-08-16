import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Box } from '@material-ui/core'
import assistanceActions from '../../../state/actions/assistance'
import { Button, Wrapper } from '../../UI'
import { DataTable } from '../../Shared'

const AssistanceTypeList = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [tableData] = useState([])
  const [loading] = useState(false)
  const { user } = useSelector((state) => state.auth)
  const [filters, setFilters] = useState({
    skip: 0,
    size: 30,
    status: 'PROGRAMADA',
    user_id: user?.id
  })

  const { showModal } = useSelector((state) => state.assistance)
  const attentionTypeClick = () => {
    console.log('ver modal')
    dispatch(assistanceActions.toggleModal(showModal))
  }

  const { totalEvents: totalPages } = useSelector((state) => state.assistance)

  const onRowClick = (row) => {
    history.push(`/visit/${row.id}`)
  }

  return (
    <Box>
      <Box marginTop="10px">
        <Wrapper>
          <Box display="flex" justifyContent="flex-end">
            <Button onClick={attentionTypeClick} size="small">
              Tipo de Atención
            </Button>
          </Box>
          <DataTable
            data={tableData}
            progressPending={loading}
            highlightOnHover
            pointerOnHover
            columns={[
              {
                name: 'Tipo de Atención',
                selector: '',
                sortable: true
              },
              {
                name: 'Cantidad',
                selector: ''
              }
            ]}
            pagination
            paginationServer={true}
            onRowClicked={onRowClick}
            paginationRowsPerPageOptions={[30, 40]}
            paginationPerPage={filters.size}
            onChangeRowsPerPage={(limit) => {
              setFilters({ ...filters, size: limit })
            }}
            onChangePage={(page) => {
              setFilters({ ...filters, skip: page })
            }}
            paginationTotalRows={totalPages}
          />
        </Wrapper>
      </Box>
    </Box>
  )
}

export default AssistanceTypeList
