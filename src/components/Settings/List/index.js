import { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Box, Typography } from '@material-ui/core'
import { Wrapper, Button, ActionsTable } from '../../UI'
import constructionsActions from '../../../state/actions/constructions'
import CreateTypology from '../Create/CreateTypology'
import { useSuccess, useToggle } from '../../../hooks'
import { ConfirmDelete, DataTable } from '../../Shared'
import commonActions from '../../../state/actions/common'
import ListCharges from '../Charges/List'

const List = () => {
  const dispatch = useDispatch()
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

  useEffect(() => {
    dispatch(commonActions.getTypologies({})).then((list) => {
      setTableData(list)
    })
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
              columns={[
                {
                  name: 'Nombre de Tipología',
                  selector: 'name',
                  sortable: true
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
              ]}
              data={tableData}
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
      <ListCharges />
    </Box>
  )
}

export default withRouter(List)
