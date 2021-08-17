import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Box } from '@material-ui/core'
import { ActionsTable, Button, Wrapper } from '../../UI'
import { DataTable } from '../../Shared'
import AssistanceType from './AssistanceType'
import assistanceActions from '../../../state/actions/assistance'
import { useToggle } from '../../../hooks'

const AssistanceTypeList = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [currentData, setCurrentData] = useState(null)
  const { open: openEdit, toggleOpen: toggleOpenEdit } = useToggle()
  const { idVisit } = useParams()

  const { assistanceConstructionList, showModal } = useSelector(
    (state) => state.assistance
  )
  const { user } = useSelector((state) => state.auth)

  const toggleModal = () => {
    dispatch(assistanceActions.toggleModal(showModal))
  }

  const addButtonClick = () => {
    dispatch(assistanceActions.toggleModal(showModal))
  }

  const createAssistanceConstruction = (data) =>
    dispatch(
      assistanceActions.createConstructionAttention({
        ...data,
        created_by: user.id,
        visit_id: idVisit
      })
    )

  const updateAssistanceConstruction = (data) =>
    dispatch(
      assistanceActions.updateConstructionAttention(currentData.id, {
        ...data,
        created_by: user.id,
        visit_id: idVisit
      })
    )

  const fetchConstructionType = () => {
    setLoading(true)
    dispatch(assistanceActions.getConstructionAttention({ visit_id: idVisit }))
      .then(() => {
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchConstructionType()
  }, [])

  return (
    <Box>
      <Box marginTop="10px">
        <Wrapper>
          <Box display="flex" justifyContent="flex-end">
            <Button onClick={addButtonClick}>Nueva atención</Button>
          </Box>
          <DataTable
            progressPending={loading}
            highlightOnHover
            pointerOnHover
            columns={[
              {
                name: 'Tipo de Atención',
                selector: 'type_name',
                sortable: true
              },
              {
                name: 'Cantidad',
                selector: 'quantity'
              },
              {
                right: true,
                cell: (row) => (
                  <ActionsTable
                    onEdit={() => {
                      setCurrentData(row)
                      toggleOpenEdit()
                    }}
                  />
                )
              }
            ]}
            data={assistanceConstructionList}
          />
        </Wrapper>

        <AssistanceType
          open={showModal}
          onClose={toggleModal}
          submitFunction={createAssistanceConstruction}
          successFunction={fetchConstructionType}
        />

        {currentData && openEdit && (
          <AssistanceType
            open={openEdit}
            onClose={toggleOpenEdit}
            submitFunction={updateAssistanceConstruction}
            successFunction={fetchConstructionType}
            type={'UPDATE'}
            data={currentData}
          />
        )}
      </Box>
    </Box>
  )
}

export default AssistanceTypeList
