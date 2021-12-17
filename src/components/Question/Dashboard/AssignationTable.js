import { Box } from '@material-ui/core'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import questionActions from '../../../state/actions/questions'
import { DataTable } from '../../Shared'

const AssignationTable = () => {
  const dispatch = useDispatch()
  const { assignationStats } = useSelector((state) => state.questions)
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
            name: '%',
            selector: (row) => `${row.answered / row.assigned}`,
            center: true
          },
          {
            name: 'Tiempo promedio',
            selector: (row) => row.assigned,
            center: true
          }
        ]}
        data={assignationStats}
      />
    </Box>
  )
}

export default AssignationTable
