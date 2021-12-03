import { useState } from 'react'
import { Box, Typography } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import ScheduleBenefitDrawer from '../BenefitDrawer'
import { ConfirmDelete, DataTable } from '../../Shared'
import { Button } from '../../UI'
import { useSuccess, useToggle } from '../../../hooks'
import scheduleActions from '../../../state/actions/schedule'

const Meetings = () => {
  const dispatch = useDispatch()
  const [updating, setUpdating] = useState(false)
  const [currentBenefit, setCurrentBenefit] = useState(null)
  const [targetMonths, setTargetMonths] = useState(null)
  const { open: openBenefitEdit, toggleOpen: toggleOpenBenefitEdit } =
    useToggle()
  const { open: openDelete, toggleOpen: toggleOpenDelete } = useToggle()
  const { scheduleDetails } = useSelector((state) => state.schedule)
  const { success, changeSuccess } = useSuccess()

  const handleScheduleEdit = () => {
    setUpdating(true)
    dispatch(
      scheduleActions.updateProgrammedBenefit(currentBenefit.id, {
        ...currentBenefit,
        ...targetMonths
      })
    )
      .then(() => {
        setUpdating(false)
        changeSuccess(true, () => {
          toggleOpenDelete()
        })
      })
      .catch(() => {
        setUpdating(false)
      })
  }

  return (
    <Box>
      <Typography>Programacion de beneficios</Typography>
      <DataTable
        emptyMessage={'Esta empresa no tiene beneficios'}
        data={scheduleDetails?.benefits}
        progressPending={false}
        columns={[
          {
            name: 'Nombre de beneficio',
            selector: (row) => row.benefitName
          },
          {
            name: 'Mes de inicio - Mes de fin',
            selector: (row) => `${row.startMonth} - ${row.endMonth}`
          },
          {
            name: '',
            right: true,
            selector: (row) => (
              <Box display="flex" alignItems="center">
                <Button
                  size="small"
                  onClick={() => {
                    setCurrentBenefit(row)
                    toggleOpenBenefitEdit()
                  }}
                >
                  Editar
                </Button>
              </Box>
            )
          }
        ]}
        pagination
        highlightOnHover
        pointerOnHover
        paginationServer={true}
        paginationRowsPerPageOptions={[30, 40]}
        paginationPerPage={30}
        paginationTotalRows={0}
      />
      {openBenefitEdit && currentBenefit && (
        <ScheduleBenefitDrawer
          type="UPDATE"
          data={{
            startMonth: currentBenefit.startMonth,
            endMonth: currentBenefit.endMonth
          }}
          benefit={currentBenefit}
          open={openBenefitEdit}
          onClose={toggleOpenBenefitEdit}
          onSubmit={(__, values) => {
            setTargetMonths(values)
            toggleOpenDelete()
          }}
        />
      )}
      {currentBenefit && openDelete && (
        <ConfirmDelete
          event="CONFIRM"
          confirmText="Actualizar"
          open={openDelete}
          onClose={toggleOpenDelete}
          loading={updating}
          success={success}
          onConfirm={handleScheduleEdit}
          message={
            <Box>
              <Typography align="center" variant="h6">
                ¿Estás seguro de modificar la programacion de este beneficio?
              </Typography>
            </Box>
          }
        />
      )}
    </Box>
  )
}
export default Meetings
