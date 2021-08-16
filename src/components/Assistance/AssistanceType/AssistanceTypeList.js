import { useState } from 'react'
// import { useLocation, useHistory } from 'react-router-dom'
import { Box } from '@material-ui/core'
// import assistanceActions from '../../../state/actions/assistance'
import { Button, Wrapper } from '../../UI'
import { DataTable } from '../../Shared'
import { useToggle } from '../../../hooks'
import AssistanceType from './AssistanceType'

const AssistanceTypeList = () => {
  const [tableData] = useState([])
  const [loading] = useState(false)
  const { open, toggleOpen } = useToggle()

  /*
  const { showModal } = useSelector((state) => state.assistance)
  const attentionTypeClick = () => {
    console.log('ver modal')
    dispatch(assistanceActions.toggleModal(showModal))
  }
  */

  return (
    <Box>
      <Box marginTop="10px">
        <Wrapper>
          <Box display="flex" justifyContent="flex-end">
            <Button onClick={toggleOpen} size="small">
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
          />
        </Wrapper>

        <AssistanceType open={open} onClose={toggleOpen} />
      </Box>
    </Box>
  )
}

export default AssistanceTypeList
