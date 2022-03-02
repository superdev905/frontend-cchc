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
import AssistanceDialog from '../Assistance/Dialog'
import { AssistanceDetailsModal } from '../Assistance'

const AttentionDetails = () => {
  const dispatch = useDispatch()
  const { idEmployee } = useParams()
  const [list, setList] = useState([])
  const { employee } = useSelector((state) => state.employees)

  const { open: openAdd, toggleOpen: toggleOpenAdd } = useToggle()
  const { open: openView, toggleOpen: toggleOpenView } = useToggle()
  const [currentData, setCurrentData] = useState(null)
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
        employee_rut: employee.run
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
            emptyMessage="No hay existen detalles de atención "
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
                name: 'Lugar de atención',
                selector: (row) => row.attention_place,
                hide: 'md'
              },
              {
                name: 'Método de contacto',
                selector: (row) => row.contact_method,
                hide: 'md'
              },
              {
                name: '',
                right: true,
                cell: (row) => (
                  <ActionsTable
                    {...row}
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
            sourceSystem={'OFICINA'}
            onClose={toggleOpenAdd}
            open={openAdd}
            employee={employee}
            visitShift={''}
            submitFunction={createAttention}
            company={{
              business_name: employee?.current_job?.business_name,
              id: employee?.current_job?.business_id
            }}
            construction={{ name: '' }}
            successFunction={fetchList}
            successMessage="Atención creada con éxito"
          />
        )}
      </Wrapper>
    </Box>
  )
}

export default AttentionDetails
