import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import AddIcon from '@material-ui/icons/Add'
import { Box, Typography } from '@material-ui/core'
import { ActionsTable, Button, Wrapper } from '../../UI'
import { ConfirmDelete, DataTable } from '../../Shared'
import { useToggle, useSuccess } from '../../../hooks'
import AttendModal from './AttendModal'
import assistanceActions from '../../../state/actions/assistance'
import { formatDate } from '../../../formatters'

const AttendModalList = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [currentData, setCurrentData] = useState(null)
  const [tableDate, setTableDate] = useState([])
  const { open: openEdit, toggleOpen: toggleOpenEdit } = useToggle()
  const { open: openDelete, toggleOpen: toggleOpenDelete } = useToggle()
  const { open: openView, toggleOpen: toggleOpenView } = useToggle()
  const [deleting, setDeleting] = useState(false)
  const { success, changeSuccess } = useSuccess()
  const { idVisit } = useParams()

  const { assistanceConstructionList, showModal, visit } = useSelector(
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
    setTableDate(
      assistanceConstructionList.map((item) => ({
        ...item,
        stringDate: formatDate(item.date)
      }))
    )
  }, [assistanceConstructionList])

  useEffect(() => {
    fetchConstructionType()
  }, [])

  return (
    <Box>
      <Box marginTop="10px">
        <Wrapper>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography style={{ fontSize: '18px', fontWeight: 'bold' }}>
              Atenciones en obra
            </Typography>
            {visit && visit?.status !== 'PROGRAMADA' && !visit.is_close && (
              <Button startIcon={<AddIcon />} onClick={addButtonClick}>
                Agregar
              </Button>
            )}
          </Box>
          <DataTable
            background
            progressPending={loading}
            emptyMessage="No hay atenciones en esta obra"
            columns={[
              {
                name: 'Fecha',
                selector: (row) => row.stringDate
              },
              {
                name: 'Tipo de Atención',
                selector: (row) => row.type_name
              },
              {
                name: 'N° de personas',
                center: true,
                selector: (row) => row.quantity
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
                    onView={() => {
                      setCurrentData(row)
                      toggleOpenView()
                    }}
                  />
                )
              }
            ]}
            data={tableDate}
          />
        </Wrapper>
        <AttendModal
          type="CREATE"
          open={showModal}
          onClose={toggleModal}
          submitFunction={createAssistanceConstruction}
          successFunction={fetchConstructionType}
        />
        {currentData && openView && (
          <AttendModal
            open={openView}
            onClose={toggleOpenView}
            submitFunction={updateAssistanceConstruction}
            successFunction={fetchConstructionType}
            type={'VIEW'}
            data={currentData}
          />
        )}
        {currentData && openEdit && (
          <AttendModal
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
              <Box>
                <Typography variant="h6">
                  ¿Estás seguro de eliminar esta atención?
                </Typography>
                <Box p={2}>
                  <Typography align="left">{`Fecha: ${formatDate(
                    currentData.date
                  )}`}</Typography>
                  <Typography align="left">{`Tipo de atención: ${currentData.type_name}`}</Typography>
                </Box>
              </Box>
            }
          />
        )}
      </Box>
    </Box>
  )
}

export default AttendModalList
