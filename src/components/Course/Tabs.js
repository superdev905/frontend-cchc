import { memo } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { Box } from '@material-ui/core'
import { Tabs } from '../Shared'

const PollTabs = ({ children }) => {
  const { idCourse } = useParams()
  const history = useHistory()

  const getRoute = (index) => {
    if (index === 1) return 'enroll'
    if (index === 2) return 'payments'
    return 'classes'
  }

  const getCurrentTab = () => {
    const { pathname } = history.location
    if (pathname.includes('enroll')) return 1
    if (pathname.includes('payments')) return 2
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
        tabs={['Clases', 'Trabajadores', 'Pagos a OTEC']}
        onChange={handleTabChange}
      >
        {children}
      </Tabs>
    </Box>
  )
}
export default memo(PollTabs)
