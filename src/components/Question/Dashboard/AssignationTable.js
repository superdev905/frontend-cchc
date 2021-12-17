import { Box } from '@material-ui/core'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import questionActions from '../../../state/actions/questions'
import { DataTable } from '../../Shared'

const AssignationTable = () => {
  const dispatch = useDispatch()
  const { assignationStats } = useSelector((state) => state.questions)

  const getPercentage = (row) => {
    if (row.assigned === 0) {
      return 0
    }
    return (row.answered / row.assigned) * 100
  }

  useEffect(() => {
    dispatch(questionActions.getAssignationByAssistance())
  }, [])

  return (
    <Box>
      <DataTable
        dense
        columns={[
          {
            name: 'Professional',
            selector: (row) => `${row.names} ${row.lastname}`
          },
          { name: 'Asignadas', selector: (row) => row.assigned, center: true },
          {
            name: 'Respondidas',
            selector: (row) => row.answered,
            center: true
          },
          {
            name: '(%) Porcentaje de respuestas',
            selector: (row) => `${getPercentage(row).toFixed(2)}%`,
            center: true
          }
        ]}
        data={assignationStats}
      />
    </Box>
  )
}

export default AssignationTable
