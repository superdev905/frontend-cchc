import { Box } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { useToggle } from '../../../hooks'
import housingActions from '../../../state/actions/housing'
import { EmptyState } from '../../UI'
import DiagnosticDialog from './Dialog'
import DiagnosticCard from './Card'

const DiagnosticSection = ({ handler, loading }) => {
  const dispatch = useDispatch()
  const { employeeData } = useSelector((state) => state.housing)
  const { open: openAdd, toggleOpen: toggleOpenAdd } = useToggle()
  const { open: openEdit, toggleOpen: toggleOpenEdit } = useToggle()

  const createDiagnostic = (values) =>
    dispatch(housingActions.createEmployeeDiagnostic(employeeData.id, values))

  const updateSaving = (values) =>
    dispatch(
      housingActions.updateEmployeeDiagnostic(
        employeeData.diagnostic.id,
        values
      )
    )

  return (
    <Box>
      {!loading && employeeData && (
        <>
          {employeeData.diagnostic ? (
            <DiagnosticCard
              diagnostic={employeeData.diagnostic}
              onEdit={toggleOpenEdit}
            />
          ) : (
            <EmptyState
              message="Este trabajador no tiene datos de diagnpóstico"
              actionMessage="Agregar"
              event={toggleOpenAdd}
            />
          )}
        </>
      )}

      {openAdd && (
        <DiagnosticDialog
          open={openAdd}
          onClose={toggleOpenAdd}
          submitFunction={createDiagnostic}
          successFunction={handler}
        />
      )}
      {openEdit && employeeData?.diagnostic && (
        <DiagnosticDialog
          type="UPDATE"
          data={employeeData?.diagnostic}
          open={openEdit}
          onClose={toggleOpenEdit}
          submitFunction={updateSaving}
          successFunction={handler}
        />
      )}
    </Box>
  )
}

export default DiagnosticSection
