import { memo } from 'react'
import { useHistory, useParams, useLocation } from 'react-router-dom'
import { Box } from '@material-ui/core'
import { Tabs } from '../../Shared'
import Background from './Background'
import Analysis from './Analysis'
import Records from './Records'
import Closing from './Closing'
import Plan from './Plan'

const SocialCaseTabs = () => {
  const history = useHistory()
  const { socialCaseId } = useParams()
  const { pathname } = useLocation()
  const positions = {
    details: 0,
    analysis: 1,
    plan: 2,
    records: 3,
    close: 4
  }
  const tabs = {
    0: { component: <Background />, path: '/details' },
    1: { component: <Analysis />, path: '/analysis' },
    2: { component: <Plan />, path: '/plan' },
    3: { component: <Records />, path: '/records' },
    4: { component: <Closing />, path: '/close' }
  }
  const getValue = () => positions[pathname.split('/').pop()]

  const handleChange = (value) => {
    history.push(`/social-case/${socialCaseId}${tabs[value].path}`)
  }

  return (
    <Box p={1}>
      <Tabs
        fullWidth
        value={getValue()}
        tabs={[
          'Antecendes',
          'Análisis',
          'Plan de derivación',
          'Registros de intervencion',
          'Cierre de caso'
        ]}
        onChange={(__, valueTarget) => handleChange(valueTarget)}
      >
        {tabs[getValue()].component}
      </Tabs>
    </Box>
  )
}
export default memo(SocialCaseTabs)
