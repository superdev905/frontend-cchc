import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import { Box, Typography } from '@material-ui/core'
import { useToggle } from '../../hooks'
import employeesActions from '../../state/actions/employees'
import { ActionsTable, Button, Wrapper } from '../UI'
import JobForm from './JobForm'
import { ConfirmDelete, DataTable } from '../Shared'
import { formatDate } from '../../formatters'

const PensionSituation = () => {
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()
  const { idEmployee } = useParams()
  const [list, setList] = useState([])
  const [current, setCurrent] = useState(null)
  const { open: openAdd, toggleOpen: toggleOpenAdd } = useToggle()
  const { open: openEdit, toggleOpen: toggleOpenEdit } = useToggle()
  const { open: openDelete, toggleOpen: toggleOpenDelete } = useToggle()

  const fetchData = () => {
    dispatch(
      employeesActions.getEmployeeJobs({ employee_id: idEmployee })
    ).then((data) => {
      setList(
        data.map((item) => ({
          ...item,
          startDate: formatDate(item.admission_date),
          endDate: formatDate(item.leave_date),
          stringSalary: `$ ${item.salary}`
        }))
      )
    })
  }

  const createEvent = (values) =>
    dispatch(
      employeesActions.createEmployeeJob({
        ...values,
        employee_id: parseInt(idEmployee, 10)
      })
    )

  const updateEvent = (values) => {
    if (!values.leave_date) {
      delete values.leave_date
    }
    if (!values.leave_motive) {
      delete values.leave_motive
    }
    dispatch(
      employeesActions.updateEmployeeJob(current.id, {
        ...values,
        state: current.state,
        employee_id: parseInt(idEmployee, 10)
      })
    )
  }
  const patchEvent = (id) => {
    dispatch(
      employeesActions.patchEmployeeJob(id, {
        state: 'DELETED'
      })
    ).then(() => {
      enqueueSnackbar('Especializacion eliminada', { variant: 'success' })
      fetchData()
      toggleOpenDelete()
    })
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <Wrapper>
      <Box>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography style={{ fontSize: '19px', fontWeight: 'bold' }}>
            Historial de trabajos
          </Typography>
          <Button onClick={toggleOpenAdd}>Nuevo trabajo </Button>
        </Box>
      </Box>
      <Box>
        <DataTable
          emptyMessage="Este trabajador no tiene trabajos en su historial "
          columns={[
            {
              name: 'Nombre de empresa',
              selector: 'business_name',
              sortable: true
            },
            {
              name: 'Nombre de Obra',
              selector: 'construction_name',
              sortable: true
            },
            {
              name: 'Fecha de inicio',
              selector: 'startDate'
            },
            {
              name: 'Fecha de fin',
              selector: 'endDate'
            },

            {
              name: 'Plazo de contrato',
              selector: 'contract_term',
              hide: 'md'
            },
            {
              name: 'Tipo de contrato',
              selector: 'contract_type',
              hide: 'md'
            },
            {
              name: 'Ingreso',
              selector: 'stringSalary',
              hide: 'md'
            },
            {
              name: '',
              selector: '',
              right: true,
              cell: (row) => (
                <ActionsTable
                  {...row}
                  onEdit={() => {
                    setCurrent(row)
                    toggleOpenEdit()
                  }}
                  onDelete={() => {
                    setCurrent(row)
                    toggleOpenDelete()
                  }}
                />
              )
            }
          ]}
          data={list}
          pagination
        />
      </Box>
      <JobForm
        successMessage="Especialización creado"
        open={openAdd}
        onClose={toggleOpenAdd}
        submitFunction={createEvent}
        successFunction={fetchData}
      />
      {current && openEdit && (
        <JobForm
          type="UPDATE"
          successMessage="Especialización actualizado"
          open={openEdit}
          onClose={toggleOpenEdit}
          submitFunction={updateEvent}
          data={current}
          successFunction={fetchData}
        />
      )}
      {current && openDelete && (
        <ConfirmDelete
          open={openDelete}
          onClose={toggleOpenDelete}
          onConfirm={() => patchEvent(current.id)}
          message={
            <Typography variant="h6">
              ¿Estás seguro de eliminar esta especialización?
            </Typography>
          }
        />
      )}
    </Wrapper>
  )
}

PensionSituation.propTypes = {}

export default PensionSituation
