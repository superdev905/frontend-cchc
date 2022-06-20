import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Box, Typography } from '@material-ui/core'
import { Wrapper, Button, ActionsTable } from '../UI'
import { DataTable } from '../Shared'
import { useToggle } from '../../hooks'
import assistanceActions from '../../state/actions/assistance'
import unemployedActions from '../../state/actions/unemployed'
import AssistanceDialog from '../Assistance/Dialog'

const AttentionDetails = () => {
  const dispatch = useDispatch
  const { idUnemployed } = useParams()
  const [loading, setLoading] = useState()
  const { unemployed } = useSelector((state) => state.unemployed)
  const { open: openAttention, toggleOpen: toggleOpenAttention } = useToggle()

  const fetchList = () => {
    setLoading(true)
    dispatch(
      unemployedActions.getUnemployedById({
        id_unemployed: idUnemployed
      })
    ).then(() => {
      setLoading(false)
    })
  }

  const createAttention = (values) =>
    dispatch(
      assistanceActions.createAssistance({
        ...values,
        employee_id: unemployed.employee.id,
        employee_name: unemployed.employee.names,
        employee_lastname: `${unemployed.employee.paternalSurname}`,
        employee_rut: unemployed.employee.run
      })
    )

  return (
    <Wrapper>
      <Box>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography style={{ fontSize: '19px', fontWeight: 'bold' }}>
            Lista de atenciones
          </Typography>
          <Button
            onClick={() => {
              toggleOpenAttention()
            }}
          >
            Agregar nuevo
          </Button>
        </Box>
      </Box>
      <Box>
        <DataTable
          emptyMessage="No existen detalles de atención "
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
              name: 'Area',
              selector: (row) => row?.area_name,
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
              cell: (row) => <ActionsTable {...row} onView={() => {}} />
            }
          ]}
          pagination
        />
      </Box>
      {openAttention && (
        <AssistanceDialog
          sourceSystem={'CESANTES'}
          onClose={toggleOpenAttention}
          open={openAttention}
          employee={unemployed?.employee}
          visitShift={''}
          submitFunction={createAttention}
          company={{ business_name: '' }}
          construction={{ name: '' }}
          successFunction={fetchList}
          successMessage="Atención creada con éxito"
        />
      )}
    </Wrapper>
  )
}

export default AttentionDetails
