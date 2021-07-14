import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  Box,
  Chip,
  IconButton,
  makeStyles,
  Typography
} from '@material-ui/core'
import DataTable from 'react-data-table-component'
import {
  ArrowDownward as SortIcon,
  Edit as EditIcon,
  Delete as DeleteIcon
} from '@material-ui/icons/'
import companyActions from '../../state/actions/companies'
import { Button, Wrapper } from '../UI'
import DivisionModal from '../Companies/Division/Modal'
import { useSuccess, useToggle } from '../../hooks'
import { ConfirmDelete } from '../Shared'

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

const useStyles = makeStyles(() => ({
  root: {}
}))

const Details = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [tableData, setTableData] = useState([])
  const { company } = useSelector((state) => state.companies)
  const { open: openCreate, toggleOpen: toggleOpenCreate } = useToggle()
  const { open: openUpdate, toggleOpen: toggleOpenUpdate } = useToggle()
  const { open: openDelete, toggleOpen: toggleOpenDelete } = useToggle()
  const [currentDivision, setCurrentDivision] = useState(null)
  const { success, changeSuccess } = useSuccess()
  const [deleting, setDeleting] = useState(false)

  const onEditClick = (division) => {
    setCurrentDivision(division)
    toggleOpenUpdate()
  }

  const onDelete = (division) => {
    setCurrentDivision(division)
    toggleOpenDelete()
  }

  const deleteDivision = (id) => {
    setDeleting(true)
    dispatch(companyActions.deleteDivision(id))
      .then(() => {
        setDeleting(false)
        changeSuccess(true)
        toggleOpenDelete()
      })
      .catch(() => {
        setDeleting(false)
      })
  }
  const columns = [
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
      name: 'Empresa socia',
      selector: 'is_partner',
      cell: (row) => <Chip {...row} label="No"></Chip>
    },
    {
      name: 'Fecha de creación',
      selector: 'createDate'
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
    setTableData(
      company?.sub_businesses.map((item) => ({
        ...item,
        is_partner: Boolean(item.is_partner),
        createDate: new Date(item.created_at).toLocaleDateString('es-CL', {
          dateStyle: 'long'
        })
      }))
    )
  }, [company])

  return (
    <Box className={classes.root}>
      <Wrapper>
        <Box display="flex" justifyContent="space-between">
          <Typography>Divisiones</Typography>
          <Button onClick={toggleOpenCreate}>Agregar</Button>
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
      </Wrapper>
      <DivisionModal open={openCreate} onClose={toggleOpenCreate} />
      {currentDivision && openUpdate && (
        <DivisionModal
          type="UPDATE"
          open={openUpdate}
          onClose={toggleOpenUpdate}
          division={currentDivision}
        />
      )}
      {currentDivision && openDelete && (
        <ConfirmDelete
          open={openDelete}
          onClose={toggleOpenDelete}
          loading={deleting}
          success={success}
          onConfirm={() => deleteDivision(currentDivision.id)}
          message={
            <span>
              ¿Estás seguro de eliminar
              <strong>{currentDivision.business_name}</strong>?
            </span>
          }
        />
      )}
    </Box>
  )
}

export default Details
