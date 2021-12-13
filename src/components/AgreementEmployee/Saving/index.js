import { Box } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { useToggle } from '../../../hooks'
import housingActions from '../../../state/actions/housing'
import { EmptyState } from '../../UI'
import SavingDialog from './Dialog'
import SavingCard from './Card'

const SavingSection = ({ handler }) => {
  const dispatch = useDispatch()

  const { employeeData } = useSelector((state) => state.housing)
  const { open: openAdd, toggleOpen: toggleOpenAdd } = useToggle()
  const { open: openEdit, toggleOpen: toggleOpenEdit } = useToggle()

  const createSaving = (values) =>
    dispatch(housingActions.createEmployeeSaving(employeeData.id, values))

  const updateSaving = (values) =>
    dispatch(
      housingActions.updateEmployeeSaving(employeeData.saving.id, values)
    )

  return (
    <Box>
      {employeeData?.saving ? (
        <SavingCard saving={employeeData.saving} onEdit={toggleOpenEdit} />
      ) : (
        <EmptyState
          message="Este trabajador no tiene datos de ahorro"
          actionMessage="Agregar"
          event={toggleOpenAdd}
        />
      )}

      {openAdd && (
        <SavingDialog
          open={openAdd}
          onClose={toggleOpenAdd}
          submitFunction={createSaving}
          successFunction={handler}
        />
      )}
      {openEdit && employeeData?.saving && (
        <SavingDialog
          type="UPDATE"
          data={employeeData?.saving}
          open={openEdit}
          onClose={toggleOpenEdit}
          submitFunction={updateSaving}
          successFunction={handler}
        />
      )}
    </Box>
  )
}

export default SavingSection
