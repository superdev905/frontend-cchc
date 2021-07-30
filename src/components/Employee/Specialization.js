import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import { Box, Typography } from '@material-ui/core'
import { useToggle } from '../../hooks'
import employeesActions from '../../state/actions/employees'
import { ActionsTable, Button, Wrapper } from '../UI'
import SpecForm from './SpecForm'
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
      employeesActions.getSpecializationHistory({ employee_id: idEmployee })
    ).then((data) => {
      setList(
        data.map((item) => ({
          ...item,
          specName: item.specialty.description,
          specDetailName: item.specialty_detail.description,
          certEntity: item.certifying_entity
            ? item.certifying_entity.description
            : '',
          certDate: formatDate(item.certificated_date)
        }))
      )
    })
  }

  const createEvent = (values) =>
    dispatch(
      employeesActions.createSpecialization({
        ...values,
        employee_id: parseInt(idEmployee, 10)
      })
    )

  const updateEvent = (values) =>
    dispatch(
      employeesActions.updateSpecialization(current.id, {
        ...values,
        certification_url: current.certification_url || '',
        state: current.state,
        employee_id: parseInt(idEmployee, 10)
      })
    )
  const patchEvent = (id) => {
    dispatch(
      employeesActions.patchSpecialization(id, {
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
        <Box display="flex" justifyContent="space-between">
          <Typography style={{ fontSize: '19px', fontWeight: 'bold' }}>
            Historial de especialidades
          </Typography>
          <Button onClick={toggleOpenAdd}>Registrar </Button>
        </Box>
      </Box>
      <Box>
        <Box>
          <DataTable
            emptyMessage="Este trabajador no tiene espacialiadades en su historial "
            columns={[
              {
                name: 'Nombre de especialidad',
                selector: 'specName',
                sortable: true
              },
              {
                name: 'Detalle de especialidad',
                selector: 'specDetailName',
                sortable: true
              },
              {
                name: 'Autodidacta',
                selector: 'is_self_taught'
              },
              {
                name: 'Certificado',
                selector: 'is_certificated'
              },

              {
                name: 'Entidad certificadora',
                selector: 'certEntity',
                hide: 'md'
              },
              {
                name: 'Fecha de certificación',
                selector: 'certDate',
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
      </Box>
      <SpecForm
        successMessage="Especialización creado"
        open={openAdd}
        onClose={toggleOpenAdd}
        submitFunction={createEvent}
        successFunction={fetchData}
      />
      {current && openEdit && (
        <SpecForm
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