import { memo, useState } from 'react'
import { useSelector } from 'react-redux'
import { Box } from '@material-ui/core'
import { Tabs } from '../Shared'
import Annexed from './Annexed'

const AgreementTabs = () => {
  const [value, setValue] = useState(0)
  const { agreementDetails } = useSelector((state) => state.housing)
  return (
    <Box>
      {agreementDetails && (
        <>
          <Tabs
            fullWidth
            value={value}
            tabs={agreementDetails.annexes.map(
              (__, index) => `Anexo ${index + 1}`
            )}
            onChange={(__, newValue) => setValue(newValue)}
          >
            <Annexed data={agreementDetails.annexes[value]} index={value + 1} />
          </Tabs>
        </>
      )}
    </Box>
  )
}
export default memo(AgreementTabs)
