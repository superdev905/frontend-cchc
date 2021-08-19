import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Typography } from '@material-ui/core'
import chargesActions from '../../../state/actions/charges'
import regionsActions from '../../../state/actions/regions'
import { ConfirmDelete, DataTable } from '../../Shared'
import { ActionsTable, Button, Wrapper } from '../../UI'
import { useSuccess, useToggle } from '../../../hooks'
import RegionModal from './RegionModal'

const List = () => {
  const dispatch = useDispatch()
  const { regions } = useSelector((state) => state.regions)
  const [currentCharge, setCurrentCharge] = useState(null)
  const [deleting, setDeleting] = useState(false)
  const [loading, setLoading] = useState(false)
  const { success, changeSuccess } = useSuccess()
  const { open: openAdd, toggleOpen: toggleOpenAdd } = useToggle()
  const { open: openUpdate, toggleOpen: toggleOpenUpdate } = useToggle()
  const { open: openDelete, toggleOpen: toggleOpenDelete } = useToggle()

  const fetchCharges = () => {
    setLoading(true)
    dispatch(regionsActions.getRegions()).then(() => {
      setLoading(false)
    })
  }

  const onCreateCharge = (values) =>
    dispatch(chargesActions.createCharge(values))

  const onEditCharge = (values) =>
    dispatch(chargesActions.updateCharge(currentCharge.id, values))

  const deleteCharge = (id) => {
    setDeleting(true)
    dispatch(chargesActions.deleteCharge(id))
      .then(() => {
        setDeleting(false)
        toggleOpenDelete()
        changeSuccess(false)
        setCurrentCharge(null)
        fetchCharges()
      })
      .catch(() => {
        setDeleting(false)
        changeSuccess(false)
      })
  }

  useEffect(() => {
    fetchCharges()
  }, [])

  return (
    <Wrapper>
      <Box
        p={2}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography>Lista de regiones</Typography>
        <Button onClick={toggleOpenAdd}>Agregar región</Button>
      </Box>
      <Box>
        <DataTable
          columns={[
            {
              name: 'Región',
              selector: (row) => row.name,
              sortable: true
            },
            {
              name: 'Comunas',
              selector: (row) => row.communesCount,
              sortable: true
            },
            {
              name: '',
              right: true,
              cell: (row) => (
                <ActionsTable
                  {...row}
                  onEdit={() => {
                    setCurrentCharge(row)
                    toggleOpenUpdate()
                  }}
                  onDelete={() => {
                    setCurrentCharge(row)
                    toggleOpenDelete()
                  }}
                />
              )
            }
          ]}
          data={regions.map((item) => ({
            ...item,
            communesCount: item.communes.length
          }))}
          progressPending={loading}
        />
      </Box>
      <RegionModal
        open={openAdd}
        onClose={toggleOpenAdd}
        submitFunction={onCreateCharge}
        successFunction={fetchCharges}
      />
      {currentCharge && openUpdate && (
        <RegionModal
          open={openUpdate}
          type="UPDATE"
          data={currentCharge}
          onClose={toggleOpenUpdate}
          submitFunction={onEditCharge}
          successFunction={fetchCharges}
        />
      )}
      {currentCharge && openDelete && (
        <ConfirmDelete
          open={openDelete}
          onClose={toggleOpenDelete}
          loading={deleting}
          success={success}
          onConfirm={() => deleteCharge(currentCharge.id)}
          message={
            <span>
              ¿Estás seguro de eliminar este cargo:
              <strong> {currentCharge.name}</strong>?
            </span>
          }
        />
      )}
    </Wrapper>
  )
}

export default List
