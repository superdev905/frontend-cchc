import { Box } from '@material-ui/core'
import { useHistory, useLocation } from 'react-router-dom'
import { Tabs } from '../../Shared'
import History from './History'
import Information from './Information'
import Questions from './Questions'

const EmployeeTabs = () => {
  const history = useHistory()
  const { pathname } = useLocation()
  const positions = {
    employee: 0,
    preguntas: 1,
    historial: 2
  }
  const tabs = {
    0: { component: <Information />, path: '/employee' },
    1: { component: <Questions />, path: '/preguntas' },
    2: { component: <History />, path: '/historial' }
  }
  const getValue = () => positions[pathname.split('/').pop()]

  const handleChange = (value) => {
    history.push(`/consultas-web${tabs[value].path}`)
  }

  return (
    <Box p={1}>
      <Tabs
        fullWidth
        value={getValue()}
        tabs={['Información', 'Preguntas', 'Historial']}
        onChange={(__, valueTarget) => handleChange(valueTarget)}
      >
        {tabs[getValue()].component}
      </Tabs>
    </Box>
  )
}

export default EmployeeTabs
