import { useState } from 'react'
import { Box } from '@material-ui/core'
import { Tabs } from '../Shared'
import PaymentTab from './Payments'
import ClassesTab from './Classes'

const PollTabs = () => {
  const [tabValue, setTabValue] = useState(0)

  const getCurrentTab = (index) => {
    if (index === 0) return <ClassesTab />
    return <PaymentTab />
  }
  return (
    <Box p={1}>
      <Tabs
        fullWidth
        value={tabValue}
        tabs={['Clases', 'Pagos', 'Trabajadores']}
        onChange={(__, value) => {
          setTabValue(value)
        }}
      >
        {getCurrentTab(tabValue)}
      </Tabs>
    </Box>
  )
}
export default PollTabs
