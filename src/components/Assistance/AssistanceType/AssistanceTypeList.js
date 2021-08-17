import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Box } from '@material-ui/core'
import { ActionsTable, Button, Wrapper } from '../../UI'
import { ConfirmDelete, DataTable } from '../../Shared'
import { useToggle, useSuccess } from '../../../hooks'
import AssistanceType from './AssistanceType'
import assistanceActions from '../../../state/actions/assistance'

const AssistanceTypeList = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [currentData, setCurrentData] = useState(null)
  const { open: openEdit, toggleOpen: toggleOpenEdit } = useToggle()
  const { open: openDelete, toggleOpen: toggleOpenDelete } = useToggle()
  const [deleting, setDeleting] = useState(false)
  const { success, changeSuccess } = useSuccess()
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
    dispatch(assistanceActions.getConstructionAttention())
      .then(() => {
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }

  const deleteAssistance = (id) => {
    setDeleting(true)
    dispatch(assistanceActions.deleteConstructionAttention(id))
      .then(() => {
        setDeleting(false)
        toggleOpenDelete()
        changeSuccess(false)
        setCurrentData(null)
        fetchConstructionType()
      })
      .catch(() => {
        setDeleting(false)
        changeSuccess(false)
      })
  }

  useEffect(() => {
    fetchConstructionType()
  }, [])

  console.log(currentData)

  return (
    <Box>
      <Box marginTop="10px">
        <Wrapper>
          <Box display="flex" justifyContent="flex-end">
            <Button onClick={addButtonClick} size="small">
              Tipo de Atención
            </Button>
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
                    onDelete={() => {
                      setCurrentData(row)
                      toggleOpenDelete()
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

        {currentData && openDelete && (
          <ConfirmDelete
            open={openDelete}
            onClose={toggleOpenDelete}
            loading={deleting}
            success={success}
            onConfirm={() => deleteAssistance(currentData.id)}
            message={
              <span>
                ¿Estás seguro de eliminar
                <strong>{currentData.type_name}</strong>?
              </span>
            }
          />
        )}
      </Box>
    </Box>
  )
}

export default AssistanceTypeList
