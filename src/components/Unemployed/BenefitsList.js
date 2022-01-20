import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FiCheck as DoneIcon } from 'react-icons/fi'
import { useParams } from 'react-router-dom'
import { Box, Typography } from '@material-ui/core'

import { DataTable } from '../Shared'
import { formatDate } from '../../formatters'
import { ActionsTable, Button } from '../UI'
import { useToggle } from '../../hooks'
import BenefitDialog from './BenefitDialog'
import assistanceActions from '../../state/actions/assistance'
import AssistanceDialog from '../Assistance/Dialog'
import unemployedActions from '../../state/actions/unemployed'

const BenefitsList = ({ benefits }) => {
  const dispatch = useDispatch()
  const { idUnemployed } = useParams()
  const { open: openEdit, toggleOpen: toggleOpenEdit } = useToggle()
  const { open: openAttention, toggleOpen: toggleOpenAttention } = useToggle()
  const [benefit, setBenefit] = useState(null)
  const { unemployed } = useSelector((state) => state.unemployed)

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
    <Box>
      <Typography style={{ fontSize: '18px', fontWeight: 'bold' }}>
        Lista de beneficios
      </Typography>
      <Box mt={2}>
        <DataTable
          data={benefits}
          columns={[
            {
              name: 'Fecha',
              selector: (row) => (
                <Box>
                  {row.isC}
                  {row.benefit.name.includes('ATENCIÓN SOCIAL') &&
                  !row.isCompleted ? (
                    <Button
                      onClick={() => {
                        setBenefit(row)
                        toggleOpenAttention()
                      }}
                      size={'small'}
                    >
                      Atender
                    </Button>
                  ) : (
                    <>{row.date ? formatDate(row.date) : 'Sin fecha'}</>
                  )}
                </Box>
              )
            },
            {
              name: 'Tipo beneficio',
              selector: (row) => row.benefit.name
            },
            {
              name: '',
              right: true,
              maxWidth: '50px',
              selector: (row) => (
                <>
                  {row.isCompleted ? (
                    <DoneIcon fontSize={'24px'} color="green" />
                  ) : (
                    <>
                      {!row.benefit.name.includes('ATENCIÓN SOCIAL') && (
                        <ActionsTable
                          onEdit={() => {
                            setBenefit(row)
                            toggleOpenEdit()
                          }}
                        />
                      )}
                    </>
                  )}
                </>
              )
            }
          ]}
        />
        {openEdit && benefit && (
          <BenefitDialog
            open={openEdit}
            onClose={toggleOpenEdit}
            benefit={benefit}
          />
        )}
        {openAttention && (
          <AssistanceDialog
            sourceSystem={'CENSANTES'}
            onClose={toggleOpenAttention}
            open={openAttention}
            employee={unemployed?.employee}
            visitShift={''}
            submitFunction={createAttention}
            company={{ business_name: '' }}
            construction={{ name: '' }}
            successFunction={() => {
              dispatch(
                unemployedActions.updateDeliveredBenefit(benefit.id, {
                  date: new Date().toISOString(),
                  isCompleted: true
                })
              ).then(() => {
                dispatch(unemployedActions.getUnemployedById(idUnemployed))
              })
            }}
            successMessage="Atención creada con éxito"
          />
        )}
      </Box>
    </Box>
  )
}

export default BenefitsList
