import { useState } from 'react'
import { Box } from '@material-ui/core'
import { Tabs } from '../Shared'
import ActivitiesTab from './ActivitiesTab'
import RestrictionsTab from './RestrictionsTab'

const BenefitTabs = () => {
  const [tabValue, setTabValue] = useState(0)

  const getCurrentTab = (index) => {
    if (index === 0) return <ActivitiesTab />
    return <RestrictionsTab />
  }
  return (
    <Box p={1}>
      <Tabs
        fullWidth
        value={tabValue}
        tabs={['Actividades', 'Restricciones']}
        onChange={(__, value) => {
          setTabValue(value)
        }}
      >
        {getCurrentTab(tabValue)}
      </Tabs>
    </Box>
  )
}
export default BenefitTabs
