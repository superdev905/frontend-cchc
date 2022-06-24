import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Box, Typography } from '@material-ui/core'
import { Wrapper, Button } from '../UI'
import { DataTable } from '../Shared'
import { useToggle } from '../../hooks'
import unemployedActions from '../../state/actions/unemployed'
import AssistanceDialog from '../Assistance/Dialog'

const AttentionDetails = ({ createAttention, dataList }) => {
  const dispatch = useDispatch
  const { idUnemployed } = useParams()
  const { unemployed } = useSelector((state) => state.unemployed)
  const { open: openAttention, toggleOpen: toggleOpenAttention } = useToggle()

  const fetchList = () => {
    dispatch(
      unemployedActions.getUnemployedById({
        id_unemployed: idUnemployed
      })
    )
  }

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
          columns={[
            {
              name: 'Fecha',
              selector: (row) => row.date.split('T')[0]
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
            }
          ]}
          pagination
          data={dataList}
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
          company={{ business_name: '', construction_name: '' }}
          construction={{ name: '' }}
          successFunction={fetchList}
          successMessage="Atención creada con éxito"
        />
      )}
    </Wrapper>
  )
}

export default AttentionDetails
