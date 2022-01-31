import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSnackbar } from 'notistack'
import { Box, Typography } from '@material-ui/core'
import { RestoreFromTrash as RestoreIcon } from '@material-ui/icons'
import { useSuccess, useToggle } from '../../hooks'
import employeesActions from '../../state/actions/employees'
import { ConfirmDelete, DataTable } from '../Shared'
import { ActionsTable, Button, StatusChip, Wrapper } from '../UI'
import RelativeForm from './RelativeForm'
import { formatDate } from '../../formatters'

const FamiliarGroup = () => {
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()
  const [tableData, setTableData] = useState([])
  const [currentRelative, setCurrentRelative] = useState(null)
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const { employee } = useSelector((state) => state.employees)
  const { user } = useSelector((state) => state.auth)

  const { open: openAdd, toggleOpen: toggleOpenAdd } = useToggle()
  const { open: openEdit, toggleOpen: toggleOpenEdit } = useToggle()
  const { open: openView, toggleOpen: toggleOpenView } = useToggle()
  const { open: openDelete, toggleOpen: toggleOpenDelete } = useToggle()
  const { open: openRestore, toggleOpen: toggleOpenRestore } = useToggle()
  const { success, changeSuccess } = useSuccess()

  const fetchRelatives = () => {
    setLoading(true)
    dispatch(
      employeesActions.getEmployeeRelatives({ employee_run: employee.run })
    )
      .then((list) => {
        setLoading(false)
        setTableData(
          list.map((item) => ({
            ...item,
            surnames: `${item.paternal_surname} ${item.maternal_surname}`,
            born_date_string: formatDate(item.born_date),
            run_string: item.run || 'Sin RUN'
          }))
        )
      })
      .catch(() => {
        setLoading(false)
      })
  }
  const createRelative = (values) =>
    dispatch(
      employeesActions.createRelative({
        ...values,
        employee_run: employee.run,
        rsh_percentage_id: values.rsh_percentage_id || null,
        created_by: user.id
      })
    )

  const editRelative = (values) =>
    dispatch(
      employeesActions.updateRelative(currentRelative.id, {
        ...values,
        rsh_percentage_id: values.rsh_percentage_id || null,
        is_main: currentRelative.is_main,
        state: currentRelative.state,
        employee_run: employee.run,
        created_by: currentRelative.created_by
      })
    )

  const blockRelative = (idRelative) => {
    setDeleting(true)
    dispatch(employeesActions.blockRelative(idRelative))
      .then(() => {
        setDeleting(false)
        changeSuccess(true)
        toggleOpenDelete()
        fetchRelatives()
      })
      .catch(() => {
        setDeleting(false)
      })
  }
  const handleAction = (idRelative, state, toggleFunction, message) => {
    setSubmitting(true)
    dispatch(employeesActions.patchRelative(idRelative, { state }))
      .then(() => {
        setSubmitting(false)
        changeSuccess(true, () => {
          enqueueSnackbar(message, { variant: 'success' })
          toggleFunction()
          fetchRelatives()
        })
      })
      .catch((err) => {
        setSubmitting(false)
        enqueueSnackbar(err, { variant: 'error' })
      })
  }

  useEffect(() => {
    if (employee) {
      fetchRelatives()
    }
  }, [employee])
  return (
    <Box width="100%">
      <Wrapper>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography style={{ fontSize: '19px', fontWeight: 'bold' }}>
            Grupo Familiar
          </Typography>
          <Button onClick={toggleOpenAdd}>Agregar nuevo</Button>
        </Box>

        <Box>
          <DataTable
            progressPending={loading}
            columns={[
              {
                name: 'Nombres',
                selector: (row) => row.names,
                sortable: true
              },
              {
                name: 'Apellidos',
                selector: (row) => row.surnames
              },
              {
                name: 'Run',
                selector: (row) => row.run_string
              },
              {
                name: 'Estado',
                selector: (row) => row.state,
                hide: 'md',
                center: true,
                cell: (row) => (
                  <StatusChip
                    label={row.state === 'CREATED' ? 'Activo' : 'Eliminado'}
                    error={row.state !== 'CREATED'}
                    success={row.state === 'CREATED'}
                  />
                )
              },
              {
                name: 'Sexo',
                selector: (row) => row.gender,
                hide: 'md'
              },
              {
                name: 'Fecha de nacimiento',
                selector: (row) => row.born_date_string,
                hide: 'md'
              },
              {
                name: '',
                right: true,
                cell: (row) => (
                  <ActionsTable
                    {...row}
                    onEdit={() => {
                      setCurrentRelative(row)
                      toggleOpenEdit()
                    }}
                    onView={() => {
                      setCurrentRelative(row)
                      toggleOpenView()
                    }}
                    onDelete={
                      row.state !== 'DELETED'
                        ? () => {
                            setCurrentRelative(row)
                            toggleOpenDelete()
                          }
                        : null
                    }
                    moreOptions={
                      row.state === 'DELETED' && user.role.key === 'ADMIN'
                        ? [
                            {
                              icon: <RestoreIcon color="primary" />,

                              onClick: () => {
                                setCurrentRelative(row)
                                toggleOpenRestore()
                              }
                            }
                          ]
                        : []
                    }
                  />
                )
              }
            ]}
            data={tableData}
            pend
            emptyMessage={'Este trabajador no tiene familiares'}
          />
        </Box>
        <RelativeForm
          successMessage="Familiar creado con éxito"
          open={openAdd}
          onClose={toggleOpenAdd}
          submitFunction={createRelative}
          successFunction={fetchRelatives}
        />
        {currentRelative && openEdit && (
          <RelativeForm
            successMessage="Familiar actualizado con éxito"
            type="UPDATE"
            data={currentRelative}
            open={openEdit}
            onClose={toggleOpenEdit}
            submitFunction={editRelative}
            successFunction={fetchRelatives}
          />
        )}
        {currentRelative && openView && (
          <RelativeForm
            type="VIEW"
            data={currentRelative}
            open={openView}
            onClose={toggleOpenView}
          />
        )}

        {currentRelative && openDelete && (
          <ConfirmDelete
            open={openDelete}
            onClose={toggleOpenDelete}
            loading={deleting}
            success={success}
            onConfirm={() => blockRelative(currentRelative.id)}
            message={
              <span>
                ¿Estás seguro de eliminar{' '}
                <strong>{currentRelative.names}</strong>?
              </span>
            }
          />
        )}
        {currentRelative && openRestore && (
          <ConfirmDelete
            event={'RESTORE'}
            confirmText={'Restaurar'}
            open={openRestore}
            onClose={toggleOpenRestore}
            loading={submitting}
            success={success}
            onConfirm={() =>
              handleAction(
                currentRelative.id,
                'CREATED',
                toggleOpenRestore,
                'Familiar restaurado'
              )
            }
            message={
              <span>
                ¿Estás seguro de restaurar{' '}
                <strong>{currentRelative.names}</strong>?
              </span>
            }
          />
        )}
      </Wrapper>
    </Box>
  )
}

export default FamiliarGroup
