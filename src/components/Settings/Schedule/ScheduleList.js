import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import { Box, Typography } from '@material-ui/core'
import { ConfirmDelete, DataTable } from '../../Shared'
import { Button, Wrapper, ActionsTable } from '../../UI'
import { useToggle, useSuccess } from '../../../hooks'
import commonActions from '../../../state/actions/common'
import CreateSchedule from './CreateSchedule'
import Can from '../../Can'

const ScheduleList = () => {
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()
  const { success, changeSuccess } = useSuccess()
  const [currentSchedule, setCurrentSchedule] = useState(null)
  console.log(success)
  const [loading, setLoading] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [filters, setFilters] = useState({
    page: 1,
    size: 30,
    search: '',
    status: ''
  })
  const { schedule } = useSelector((state) => state.common)
  const { open: openAdd, toggleOpen: toggleOpenAdd } = useToggle()
  const { open: openUpdate, toggleOpen: toggleOpenUpdate } = useToggle()
  const { open: openDelete, toggleOpen: toggleOpenDelete } = useToggle()

  const fetchSchedule = () => {
    setLoading(true)
    dispatch(
      commonActions.getSchedule({
        ...filters
      })
    ).then(() => {
      setLoading(false)
    })
  }

  const createSchedule = (values) => {
    dispatch(commonActions.createSchedule({ ...values }))
      .then(() => {
        setLoading(false)
        changeSuccess(true)
        toggleOpenAdd()
        fetchSchedule()
        enqueueSnackbar('Jornada creada correctamente', {
          autoHideDuration: 1500,
          variant: 'success'
        })
      })
      .catch(() => {
        setLoading(false)
      })
  }

  const updateSchedule = (values) => {
    dispatch(
      commonActions.updateSchedule(currentSchedule.id, {
        ...values,
        createdBy: currentSchedule.createdBy
      })
    )
      .then(() => {
        setLoading(false)
        changeSuccess(true)
        toggleOpenUpdate()
        fetchSchedule()
        enqueueSnackbar('Jornada actualizada correctamente', {
          autoHideDuration: 1500,
          variant: 'success'
        })
      })
      .catch(() => {
        setLoading(false)
      })
  }

  const deleteSchedule = (id) => {
    dispatch(
      commonActions.deleteSchedule(id, {
        state: 'DELETED'
      })
    )
      .then(() => {
        setDeleting(false)
        changeSuccess(true)
        toggleOpenDelete()
        fetchSchedule()
        enqueueSnackbar('La jornada fue eliminado', {
          autoHideDuration: 1500,
          variant: 'success'
        })
      })
      .catch(() => {
        setDeleting(false)
      })
  }

  useEffect(() => {
    fetchSchedule()
  }, [filters])

  return (
    <Wrapper>
      <Box>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography>Lista de Jornadas</Typography>
          <Can
            availableTo={['ADMIN']}
            yes={() => <Button onClick={toggleOpenAdd}>Nueva Jornada</Button>}
            no={() => null}
          />
        </Box>
      </Box>
      <DataTable
        progressPending={loading}
        emptyMessage={
          filters.search
            ? `No se encontraron resultados para: ${filters.search}`
            : 'Aún no hay jornadas'
        }
        highlightOnHover
        pointerOnHover
        columns={[
          {
            name: 'Jornada',
            selector: (row) => row.name
          },
          {
            name: 'Inicio',
            selector: (row) => row.start_time,
            hide: 'md'
          },
          {
            name: 'FIn',
            selector: (row) => row.end_time,
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
                  setCurrentSchedule(row)
                  toggleOpenUpdate()
                  console.log(row)
                }}
                onDelete={() => {
                  setCurrentSchedule(row)
                  toggleOpenDelete()
                }}
                //  onView={() => { props.history.push(`/obras/${row.id}`)  }}
              />
            )
          }
        ]}
        data={schedule}
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
      />
      <CreateSchedule
        open={openAdd}
        onClose={toggleOpenAdd}
        submitFunction={createSchedule}
      />

      {currentSchedule && openUpdate && (
        <CreateSchedule
          type="UPDATE"
          open={openUpdate}
          onClose={toggleOpenUpdate}
          data={currentSchedule}
          submitFunction={updateSchedule}
          successFunction={fetchSchedule}
        />
      )}

      {currentSchedule && openDelete && (
        <ConfirmDelete
          open={openDelete}
          onClose={toggleOpenDelete}
          onConfirm={() => deleteSchedule(currentSchedule.id)}
          message={
            <Typography variant="h6">
              ¿Estás seguro de eliminar esta Jornada?
            </Typography>
          }
          loading={deleting}
          success={success}
        />
      )}
    </Wrapper>
  )
}

export default withRouter(ScheduleList)
