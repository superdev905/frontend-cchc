import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Box, Chip, makeStyles, Typography } from '@material-ui/core'
import companyActions from '../../state/actions/companies'
import { ActionsTable, Button, Wrapper } from '../UI'
import DivisionModal from '../Companies/Division/Modal'
import { useSuccess, useToggle } from '../../hooks'
import { ConfirmDelete, DataTable } from '../Shared'

const useStyles = makeStyles(() => ({
  root: {}
}))

const Details = ({ ...props }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { idCompany } = props.match.params
  const [tableData, setTableData] = useState([])
  const { divisions } = useSelector((state) => state.companies)
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
        dispatch(companyActions.getDivisions(idCompany))
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
      cell: (row) => <Chip {...row} label="No"></Chip>,
      hide: 'md'
    },
    {
      name: 'Fecha de creación',
      selector: 'createDate',
      hide: 'md'
    },
    {
      name: '',
      selector: '',
      right: true,
      cell: (row) => (
        <ActionsTable
          {...row}
          onEdit={() => onEditClick(row)}
          onDelete={() => onDelete(row)}
        />
      )
    }
  ]

  useEffect(() => {
    dispatch(companyActions.getDivisions(idCompany))
  }, [])

  useEffect(() => {
    setTableData(
      divisions.map((item) => ({
        ...item,
        is_partner: Boolean(item.is_partner),
        createDate: new Date(item.created_at).toLocaleDateString('es-CL', {
          dateStyle: 'long'
        })
      }))
    )
  }, [divisions])

  return (
    <Box className={classes.root}>
      <Wrapper>
        <Box display="flex" justifyContent="space-between">
          <Typography>Divisiones</Typography>
          <Button onClick={toggleOpenCreate}>Agregar</Button>
        </Box>

        <Box>
          <DataTable columns={columns} data={tableData} />
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

export default withRouter(Details)
