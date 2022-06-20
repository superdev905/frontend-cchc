import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Typography } from '@material-ui/core'
import { Wrapper, Button, ActionsTable } from '../UI'
import { DataTable } from '../Shared'
import { useToggle } from '../../hooks'
import assistanceActions from '../../state/actions/assistance'
import migrants from '../../state/actions/migrants'
import AssistanceDialog from '../Assistance/Dialog'

const AttentionDetails = ({ migrantId, open }) => {
  const dispatch = useDispatch
  const [loading, setLoading] = useState()
  const { migrant } = useSelector((state) => state.migrants)
  const { open: openAttention, toggleOpen: toggleOpenAttention } = useToggle()
  const [benefit, setBenefit] = useState(null)

  const fetchData = () => {
    setLoading(true)
    dispatch(migrants.getMigrantDetails(migrantId)).then(() => {
      setLoading(false)
    })
  }
  const createAttention = (values) =>
    dispatch(
      assistanceActions.createAssistance({
        ...values,
        employee_id: migrant.employee.id,
        employee_name: migrant.employee.names,
        employee_lastname: `${migrant.employee.paternalSurname}`,
        employee_rut: migrant.employee.run
      })
    )
  useEffect(() => {
    if (open) {
      fetchData()
    }
  }, [open])

  return (
    <Wrapper>
      <Box>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography style={{ fontSize: '19px', fontWeight: 'bold' }}>
            Lista de atenciones
          </Typography>
          <Button
            onClick={() => {
              setBenefit()
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
          sourceSystem={'MIGRANTES'}
          onClose={toggleOpenAttention}
          open={openAttention}
          employee={migrant?.employee}
          visitShift={''}
          submitFunction={createAttention}
          company={{ business_name: '' }}
          construction={{ name: '' }}
          successFunction={() => {
            dispatch(
              migrants.updateDeliveredBenefit(benefit.id, {
                date: new Date().toISOString(),
                isCompleted: true
              })
            ).then(() => {
              fetchData()
            })
          }}
          successMessage="Atención creada con éxito"
        />
      )}
    </Wrapper>
  )
}

export default AttentionDetails
