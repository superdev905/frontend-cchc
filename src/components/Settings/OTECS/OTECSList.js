import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import { Box, Typography } from '@material-ui/core'
import { ActionsTable, Button, Wrapper } from '../../UI'
import { ConfirmDelete, DataTable } from '../../Shared'
import Can from '../../Can'
import { useToggle, useSuccess } from '../../../hooks'
import commonActions from '../../../state/actions/common'
import CreateOTEC from './CreateOTEC'

const OTECSList = () => {
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()
  const { success, changeSuccess } = useSuccess()
  const [deleting, setDeleting] = useState(false)
  const [loading, setLoading] = useState(false)
  const [currentOTEC, setCurrentOTEC] = useState(null)
  const [filters, setFilters] = useState({
    page: 1,
    size: 30,
    search: '',
    status: ''
  })
  const { otecs, totalOtecs } = useSelector((state) => state.common)
  const { open: openAdd, toggleOpen: toggleOpenAdd } = useToggle()
  const { open: openUpdate, toggleOpen: toggleOpenUpdate } = useToggle()
  const { open: openDelete, toggleOpen: toggleOpenDelete } = useToggle()

  const fetchOTECS = () => {
    setLoading(true)
    dispatch(
      commonActions.getAllOTECS({
        ...filters
      })
    ).then(() => {
      setLoading(false)
    })
  }

  const createOTEC = (values) => {
    dispatch(
      commonActions.createOTEC({
        ...values
      })
    )
      .then(() => {
        setLoading(false)
        changeSuccess(true)
        toggleOpenAdd()
        fetchOTECS()
        enqueueSnackbar('OTEC creada correctamente', {
          autoHideDuration: 1500,
          variant: 'success'
        })
      })
      .catch(() => {
        setLoading(false)
      })
  }

  const updateOTEC = (values) => {
    dispatch(
      commonActions.updateOTEC(currentOTEC.id, {
        ...values,
        createdBy: currentOTEC.createdBy
      })
    )
      .then(() => {
        setLoading(false)
        changeSuccess(true)
        toggleOpenUpdate()
        fetchOTECS()
        enqueueSnackbar('OTEC actualizada correctamente', {
          autoHideDuration: 1500,
          variant: 'success'
        })
      })
      .catch(() => {
        setLoading(false)
      })
  }

  const deleteOTEC = (id) => {
    dispatch(
      commonActions.deleteOTEC(id, {
        state: 'DELETED'
      })
    )
      .then(() => {
        setDeleting(false)
        changeSuccess(true)
        toggleOpenDelete()
        fetchOTECS()
        enqueueSnackbar('El contacto fue eliminado', {
          autoHideDuration: 1500,
          variant: 'success'
        })
      })
      .catch(() => {
        setDeleting(false)
      })
  }

  useEffect(() => {
    fetchOTECS()
  }, [filters])

  return (
    <Wrapper>
      <Box>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography>Lista de OTEC</Typography>
          <Can
            availableTo={['ADMIN', 'SOCIAL_ASSISTANCE']}
            yes={() => <Button onClick={toggleOpenAdd}>Nueva OTEC</Button>}
            no={() => null}
          />
        </Box>
      </Box>

      <DataTable
        progressPending={loading}
        emptyMessage={
          filters.search
            ? `No se encontraron resultados para: ${filters.search}`
            : 'Aún no hay postulaciones'
        }
        highlightOnHover
        pointerOnHover
        columns={[
          {
            name: 'Rut',
            selector: (row) => row.rut
          },
          {
            name: 'Nombre',
            selector: (row) => row.businessName,
            hide: 'md'
          },
          {
            name: 'Contacto',
            selector: (row) => row.contact,
            hide: 'md'
          },
          {
            name: 'Direccion',
            selector: (row) => row.address,
            hide: 'md'
          },
          {
            name: '',
            right: true,
            cell: (row) => (
              <ActionsTable
                {...row}
                disabledDelete={row.state === 'DELETED'}
                onEdit={() => {
                  setCurrentOTEC(row)
                  toggleOpenUpdate()
                }}
                onDelete={() => {
                  setCurrentOTEC(row)
                  toggleOpenDelete()
                }}
                //  onView={() => { props.history.push(`/obras/${row.id}`)  }}
              />
            )
          }
        ]}
        data={otecs}
        pagination
        paginationRowsPerPageOptions={[30, 40]}
        paginationPerPage={filters.size}
        paginationServer={true}
        onChangeRowsPerPage={(limit) => {
          setFilters({ ...filters, size: limit })
        }}
        onChangePage={(page) => {
          setFilters({ ...filters, skip: page })
        }}
        paginationTotalRows={totalOtecs}
      />
      <CreateOTEC
        open={openAdd}
        onClose={toggleOpenAdd}
        submitFunction={createOTEC}
      />

      {currentOTEC && openUpdate && (
        <CreateOTEC
          type="UPDATE"
          open={openUpdate}
          onClose={toggleOpenUpdate}
          data={currentOTEC}
          submitFunction={updateOTEC}
          successFunction={fetchOTECS}
        />
      )}

      {currentOTEC && openDelete && (
        <ConfirmDelete
          open={openDelete}
          onClose={toggleOpenDelete}
          onConfirm={() => deleteOTEC(currentOTEC.id)}
          message={
            <Typography variant="h6">
              ¿Estás seguro de eliminar esta OTEC?
            </Typography>
          }
          loading={deleting}
          success={success}
        />
      )}
    </Wrapper>
  )
}

export default withRouter(OTECSList)
