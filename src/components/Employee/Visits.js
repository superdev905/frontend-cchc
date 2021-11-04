import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FiPlus as AddIcon } from 'react-icons/fi'
import { useParams } from 'react-router-dom'
import AttachFileIcon from '@material-ui/icons/AttachFile'
import { Box, Typography } from '@material-ui/core'
import assistanceActions from '../../state/actions/assistance'
import { ActionsTable, Button, Wrapper } from '../UI'
import { DataTable, FileVisor } from '../Shared'
import { formatDate } from '../../formatters'
import { useToggle } from '../../hooks'
import AssistanceDialog from '../Assistance/InterventionRegistration/WorkerInterventionRecord'
import VisitDialog from './VisitDialog'

const AttentionDetails = () => {
  const dispatch = useDispatch()
  const { idEmployee } = useParams()
  const [list, setList] = useState([])
  const { employee } = useSelector((state) => state.employees)
  const { open: showVisor, toggleOpen: toggleShowVisor } = useToggle()
  const { open: openAdd, toggleOpen: toggleOpenAdd } = useToggle()
  const [selectedVisit, setSelectedVisit] = useState(null)
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
        business_id: selectedVisit.business_id,
        construction_id: selectedVisit.construction_id,
        construction_name: selectedVisit.construction_name,
        employee_id: employee.id,
        employee_name: employee.names,
        employee_lastname: `${employee.paternal_surname}`,
        employee_rut: employee.run,
        visit_id: selectedVisit.id
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
                setSelectedVisit(null)
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
                selector: (row) => row.construction_name
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
                    moreOptions={[
                      {
                        icon: <AttachFileIcon />,
                        onClick: () => {
                          setCurrentData(row)
                          toggleShowVisor()
                        },
                        disabled: row.attached_url === ''
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

        {currentData && showVisor && (
          <FileVisor
            open={showVisor}
            src={currentData.attached_url}
            onClose={toggleShowVisor}
          />
        )}
        {openAdd && (
          <VisitDialog
            onClose={toggleOpenAdd}
            open={openAdd}
            onSelected={setSelectedVisit}
          />
        )}
        {openAdd && selectedVisit && (
          <AssistanceDialog
            onClose={toggleOpenAdd}
            open={openAdd}
            employee={employee}
            visitShift={selectedVisit.shift.name}
            submitFunction={createAttention}
            company={{ business_name: selectedVisit.business_name }}
            construction={{ name: selectedVisit.construction_name }}
            successFunction={fetchList}
            successMessage="Atención creada con éxito"
          />
        )}
      </Wrapper>
    </Box>
  )
}

export default AttentionDetails
