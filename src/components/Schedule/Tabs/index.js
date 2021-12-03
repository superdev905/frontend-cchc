import { memo, useState } from 'react'
import { Box } from '@material-ui/core'
import { Tabs } from '../../Shared'
import Approbation from './Approbation'
import Meetings from './Meetings'
import Benefits from './Benefits'

const ScheduleTabs = () => {
  const tabs = {
    0: <Approbation />,
    1: <Meetings />,
    2: <Benefits />
  }

  const [value, setValue] = useState(0)

  return (
    <Box p={1}>
      <Tabs
        fullWidth
        value={value}
        tabs={['Envio y aprobación', 'Reuniones', 'Programación']}
        onChange={(__, valueTarget) => setValue(valueTarget)}
      >
        {tabs[value]}
      </Tabs>
    </Box>
  )
}
export default memo(ScheduleTabs)
