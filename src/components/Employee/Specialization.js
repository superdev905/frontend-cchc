import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import { Box, Typography } from '@material-ui/core'
import { AttachFile as AttachFileIcon } from '@material-ui/icons'
import { useToggle } from '../../hooks'
import employeesActions from '../../state/actions/employees'
import { ActionsTable, Button, Wrapper } from '../UI'
import SpecForm from './SpecForm'
import { ConfirmDelete, DataTable, FileVisor } from '../Shared'
import { formatDate } from '../../formatters'

const PensionSituation = ({ employeeId }) => {
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()
  const { idEmployee } = useParams()
  const [currentEmployeeId] = useState(idEmployee || employeeId)
  const [list, setList] = useState([])
  const [current, setCurrent] = useState(null)
  const { user } = useSelector((state) => state.auth)
  const { open: openAdd, toggleOpen: toggleOpenAdd } = useToggle()
  const { open: openEdit, toggleOpen: toggleOpenEdit } = useToggle()
  const { open: openDelete, toggleOpen: toggleOpenDelete } = useToggle()
  const { open: openVisor, toggleOpen: toggleOpenVisor } = useToggle()

  const fetchData = () => {
    dispatch(
      employeesActions.getSpecializationHistory({
        employee_id: currentEmployeeId
      })
    ).then((data) => {
      setList(
        data.map((item) => ({
          ...item,
          specName: item.specialty.description,
          specDetailName: item.specialty_detail.description,
          certEntity: item.certifying_entity
            ? item.certifying_entity.description
            : 'Sin entidad',
          certDate: item.certificated_date
            ? formatDate(item.certificated_date)
            : 'Sin fecha'
        }))
      )
    })
  }

  const createEvent = (values) => {
    if (!values.certificated_date) {
      delete values.certificated_date
    }
    if (!values.certifying_entity_id) {
      delete values.certifying_entity_id
    }
    if (values.certification_file) {
      values.certification_file.dataId = currentEmployeeId
    }
    return dispatch(
      employeesActions.createSpecialization({
        ...values,
        employee_id: parseInt(currentEmployeeId, 10),
        created_by: user.id
      })
    )
  }

  const updateEvent = (values) => {
    if (!values.certificated_date) {
      delete values.certificated_date
    }
    if (!values.certifying_entity_id) {
      delete values.certifying_entity_id
    }
    if (values.certification_file) {
      values.certification_file.dataId = currentEmployeeId
    }
    return dispatch(
      employeesActions.updateSpecialization(current.id, {
        ...values,
        state: current.state,
        employee_id: parseInt(currentEmployeeId, 10),
        created_by: current.created_by
      })
    )
  }
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
    <Box width="100%">
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
              emptyMessage="Este trabajador no tiene especialidades en su historial "
              columns={[
                {
                  name: 'Nombre de especialidad',
                  selector: (row) => row.specName,
                  sortable: true
                },
                {
                  name: 'Detalle de especialidad',
                  selector: (row) => row.specDetailName,
                  sortable: true
                },
                {
                  name: 'Autodidacta',
                  selector: (row) => row.is_self_taught
                },
                {
                  name: 'Certificado',
                  selector: (row) => row.is_certificated
                },

                {
                  name: 'Entidad certificadora',
                  selector: (row) => row.certEntity,
                  hide: 'md'
                },
                {
                  name: 'Fecha de certificación',
                  selector: (row) => row.certDate,
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
                      moreOptions={[
                        {
                          disabled: !row.certification_file,
                          icon: <AttachFileIcon />,
                          onClick: () => {
                            toggleOpenVisor()
                            setCurrent(row)
                          }
                        }
                      ]}
                    />
                  )
                }
              ]}
              data={list}
              pagination
            />
          </Box>
        </Box>
        {openAdd && (
          <SpecForm
            successMessage="Especialización creada"
            open={openAdd}
            onClose={toggleOpenAdd}
            submitFunction={createEvent}
            successFunction={fetchData}
          />
        )}
        {current && openEdit && (
          <SpecForm
            type="UPDATE"
            successMessage="Especialización actualizada"
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
        {current && openVisor && (
          <FileVisor
            open={openVisor}
            onClose={toggleOpenVisor}
            src={current.certification_file.file_url}
            filename={current.certification_file.file_name}
          />
        )}
      </Wrapper>
    </Box>
  )
}

PensionSituation.propTypes = {}

export default PensionSituation
