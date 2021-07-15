import { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Box, IconButton, Typography } from '@material-ui/core'
import {
  ArrowDownward as SortIcon,
  Edit as EditIcon,
  Delete as DeleteIcon
} from '@material-ui/icons/'
import DataTable from 'react-data-table-component'
import { Wrapper, Button } from '../../UI'
import constructionsActions from '../../../state/actions/constructions'
import CreateTypology from '../Create/CreateTypology'
import { useSuccess, useToggle } from '../../../hooks'
import { ConfirmDelete } from '../../Shared'

const ActionRow = ({ onEdit, onDelete }) => (
  <Box>
    <IconButton onClick={onEdit}>
      <EditIcon />
    </IconButton>
    <IconButton onClick={onDelete}>
      <DeleteIcon />
    </IconButton>
  </Box>
)

const List = () => {
  const dispatch = useDispatch()
  const { list, filters } = useSelector((state) => state.constructions)
  const { open: openCreate, toggleOpen: toggleOpenCreate } = useToggle()
  const { open: openUpdate, toggleOpen: toggleOpenUpdate } = useToggle()
  const { open: openDelete, toggleOpen: toggleOpenDelete } = useToggle()
  const [currentTypology, setCurrentTypology] = useState(null)
  const { success, changeSuccess } = useSuccess()
  const [deleting, setDeleting] = useState(false)
  const [tableData, setTableData] = useState([])

  const onEditClick = (typology) => {
    setCurrentTypology(typology)
    toggleOpenUpdate()
  }

  const onDelete = (typology) => {
    setCurrentTypology(typology)
    toggleOpenDelete()
  }

  const deleteTypology = (id) => {
    setDeleting(true)
    dispatch(constructionsActions.deleteConstructionTypology(id))
      .then(() => {
        setDeleting(false)
        changeSuccess(true)
        dispatch(constructionsActions.getConstructionTypology())
        toggleOpenDelete()
      })
      .catch(() => {
        setDeleting(false)
      })
  }

  const columns = [
    {
      name: 'Tipología',
      selector: 'name',
      sortable: true
    },
    {
      name: '',
      selector: '',
      right: true,
      cell: (row) => (
        <ActionRow
          {...row}
          onEdit={() => onEditClick(row)}
          onDelete={() => onDelete(row)}
        />
      )
    }
  ]

  useEffect(() => {
    setTableData(list)
  }, [list])
  useEffect(() => {
    dispatch(constructionsActions.getConstructionTypology(filters))
  }, [])

  return (
    <Box marginTop="10px">
      <Wrapper>
        <Box>
          <Box display="flex" justifyContent="space-between">
            <Typography>Tipologías</Typography>
            <Button onClick={toggleOpenCreate}>Nueva tipología</Button>
          </Box>
          <Box>
            <DataTable
              columns={columns}
              data={tableData}
              defaultSortFieldId={1}
              sortIcon={<SortIcon />}
              pagination={false}
            />
          </Box>
        </Box>
      </Wrapper>
      <CreateTypology open={openCreate} onClose={toggleOpenCreate} />
      {currentTypology && openUpdate && (
        <CreateTypology
          type="UPDATE"
          open={openUpdate}
          onClose={toggleOpenUpdate}
          typology={currentTypology}
        />
      )}
      {currentTypology && openDelete && (
        <ConfirmDelete
          open={openDelete}
          onClose={toggleOpenDelete}
          loading={deleting}
          success={success}
          onConfirm={() => deleteTypology(currentTypology.id)}
          message={
            <span>
              ¿Estás seguro de eliminar
              <strong> {currentTypology.name}</strong>?
            </span>
          }
        />
      )}
    </Box>
  )
}

export default withRouter(List)
