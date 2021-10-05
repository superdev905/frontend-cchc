import { memo } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { Box } from '@material-ui/core'
import { Tabs } from '../Shared'

const PollTabs = ({ children }) => {
  const { idCourse } = useParams()
  const history = useHistory()

  const getRoute = (index) => {
    if (index === 2) return 'employees'
    if (index === 1) return 'payments'
    return 'classes'
  }

  const getCurrentTab = () => {
    const { pathname } = history.location
    if (pathname.includes('employees')) return 2
    if (pathname.includes('payments')) return 1
    return 0
  }

  const handleTabChange = (__, value) => {
    history.push(`/courses/${idCourse}/${getRoute(value)}`)
  }

  return (
    <Box p={1}>
      <Tabs
        fullWidth
        value={getCurrentTab()}
        tabs={['Clases', 'Pagos a OTEC', 'Trabajadores']}
        onChange={handleTabChange}
      >
        {children}
      </Tabs>
    </Box>
  )
}
export default memo(PollTabs)
