import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FiPlus as AddIcon } from 'react-icons/fi'
import { useParams } from 'react-router-dom'
import { Box, Typography } from '@material-ui/core'
import assistanceActions from '../../state/actions/assistance'
import { ActionsTable, Button, Wrapper } from '../UI'
import { DataTable } from '../Shared'
import { formatDate } from '../../formatters'
import { useToggle } from '../../hooks'
import { AssistanceDetailsModal } from '../Assistance'
import AssistanceDialog from '../Assistance/Dialog'

const AttentionDetails = () => {
  const dispatch = useDispatch()
  const { idEmployee } = useParams()
  const [list, setList] = useState([])
  const { employee } = useSelector((state) => state.employees)
  const { open: openAdd, toggleOpen: toggleOpenAdd } = useToggle()
  const { open: openView, toggleOpen: toggleOpenView } = useToggle()
  const { open: openEdit, toggleOpen: toggleOpenEdit } = useToggle()
  const [currentData, setCurrentData] = useState()
  const [assistance, setAssistance] = useState()

  const [loading, setLoading] = useState(false)

  const fetchList = () => {
    setLoading(true)
    dispatch(
      assistanceActions.getAttention({
        id_employee: idEmployee
      })
    ).then((data) => {
      setLoading(false)
      setList(
        data.map((item) => ({ ...item, stringDate: formatDate(item.date, {}) }))
      )
    })
  }
  const createAttention = (values) =>
    dispatch(
      assistanceActions.createAssistance({
        ...values,
        employee_id: employee.id,
        employee_name: employee.names,
        employee_lastname: `${employee.paternal_surname}`,
        employee_rut: employee.run,
        business_id: employee.current_job.business_id || '',
        business_name: employee.current_job.business_name,
        construction_id: employee.current_job.construction_id || '',
        construction_name: employee.current_job.construction_name
      })
    )
  const editAttention = (values) =>
    dispatch(
      assistanceActions.editAssistance(assistance.id, {
        ...values,
        employee_id: employee.id,
        employee_name: employee.names,
        employee_lastname: `${employee.paternal_surname}`,
        employee_rut: employee.run,
        business_id: employee.current_job.business_id || '',
        construction_id: employee.current_job.construction_id || ''
      })
    )

  useEffect(() => {
    fetchList()
  }, [])

  return (
    <Box width="100%">
      <Wrapper>
        <Box>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography style={{ fontSize: '19px', fontWeight: 'bold' }}>
              Lista de atenciones
            </Typography>
            <Button
              onClick={() => {
                toggleOpenAdd()
              }}
              startIcon={<AddIcon />}
            >
              Agregar nuevo
            </Button>
          </Box>
        </Box>
        <Box>
          <DataTable
            emptyMessage="No hay existen detalles de atenci??n "
            progressPending={loading}
            columns={[
              {
                name: 'Fecha',
                selector: (row) => row.stringDate
              },
              {
                name: 'Nombre de Obra',
                selector: (row) => row?.construction_name || 'Sin obra'
              },
              {
                name: 'Sistema de origen',
                selector: (row) => row.source_system,
                hide: 'md'
              },
              {
                name: 'Area',
                selector: (row) => row.area_name,
                hide: 'md'
              },
              {
                name: 'Lugar de atenci??n',
                selector: (row) => row.attention_place,
                hide: 'md'
              },
              {
                name: 'M??todo de contacto',
                selector: (row) => row.contact_method,
                hide: 'md'
              },
              {
                name: '',
                right: true,
                cell: (row) => (
                  <ActionsTable
                    {...row}
                    onEdit={() => {
                      setAssistance(row)
                      toggleOpenEdit()
                    }}
                    onView={() => {
                      setCurrentData(row)
                      toggleOpenView()
                    }}
                  />
                )
              }
            ]}
            data={list}
            pagination
          />
        </Box>

        {currentData && openView && (
          <AssistanceDetailsModal
            open={openView}
            onClose={toggleOpenView}
            assistanceId={currentData.id}
          />
        )}

        {openAdd && (
          <AssistanceDialog
            event={{
              construction_name: employee.current_job.construction_name
            }}
            sourceSystem={'OFICINA'}
            onClose={toggleOpenAdd}
            open={openAdd}
            employee={employee}
            visitShift={''}
            submitFunction={createAttention}
            company={{
              business_name: employee?.current_job?.business_name,
              id: employee?.current_job?.business_id,
              construction_name: employee.current_job.construction_name
            }}
            construction={{
              construction_name: employee.current_job.construction_name,
              id: employee.current_job.construction_id
            }}
            successFunction={fetchList}
            successMessage="Atenci??n creada con ??xito"
          />
        )}
        {openEdit && (
          <AssistanceDialog
            open={openEdit}
            onClose={toggleOpenEdit}
            sourceSystem={'OFICINA'}
            employee={employee}
            visitShift={''}
            submitFunction={editAttention}
            company={{
              business_name: employee?.current_job?.business_name,
              id: employee?.current_job?.business_id
            }}
            data={assistance}
            type="UPDATE"
            construction={{
              construction_name: employee.current_job.construction_name,
              id: employee.current_job.construction_id
            }}
            successFunction={fetchList}
            successMessage="Atenci??n editada con ??xito"
          />
        )}
      </Wrapper>
    </Box>
  )
}

export default AttentionDetails
