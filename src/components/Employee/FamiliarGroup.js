import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Typography } from '@material-ui/core'
import { useSuccess, useToggle } from '../../hooks'
import employeesActions from '../../state/actions/employees'
import { ConfirmDelete, DataTable } from '../Shared'
import { ActionsTable, Button, StatusChip, Wrapper } from '../UI'
import RelativeForm from './RelativeForm'
import { formatDate } from '../../formatters'

const FamiliarGroup = () => {
  const dispatch = useDispatch()
  const [tableData, setTableData] = useState([])
  const [currentRelative, setCurrentRelative] = useState(null)
  const [loading, setLoading] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const { employee } = useSelector((state) => state.employees)

  const { open: openAdd, toggleOpen: toggleOpenAdd } = useToggle()
  const { open: openEdit, toggleOpen: toggleOpenEdit } = useToggle()
  const { open: openDelete, toggleOpen: toggleOpenDelete } = useToggle()
  const { success, changeSuccess } = useSuccess()

  const fetchRelatives = () => {
    setLoading(true)
    dispatch(employeesActions.getEmployeeRelatives(employee.run))
      .then((list) => {
        setLoading(false)
        setTableData(
          list.map((item) => ({
            ...item,
            surnames: `${item.paternal_surname} ${item.maternal_surname}`,
            born_date_string: formatDate(item.born_date),
            run_string: item.run || 'Sin RUN',
            country: item.nationality.description,
            marital_status: item.marital_status.description
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
        rsh_percentage_id: values.rsh_percentage_id || null
      })
    )

  const editRelative = (values) =>
    dispatch(
      employeesActions.updateRelative(currentRelative.id, {
        ...values,
        rsh_percentage_id: values.rsh_percentage_id || null,
        is_main: currentRelative.is_main,
        state: currentRelative.state,
        employee_run: employee.run
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
                name: 'Nacionalidad',
                selector: (row) => row.country,
                hide: 'md'
              },
              {
                name: 'Estado civil',
                selector: (row) => row.marital_status,
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
                    onDelete={() => {
                      setCurrentRelative(row)
                      toggleOpenDelete()
                    }}
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
      </Wrapper>
    </Box>
  )
}

export default FamiliarGroup
