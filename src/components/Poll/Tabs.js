import { useState } from 'react'
import { Box } from '@material-ui/core'
import { Tabs } from '../Shared'
import AnswersTab from './AnswersTab'
import QuestionTab from './QuestionTab'

const PollTabs = () => {
  const [tabValue, setTabValue] = useState(0)

  const getCurrentTab = (index) => {
    if (index === 0) return <QuestionTab />
    return <AnswersTab />
  }
  return (
    <Box p={1}>
      <Tabs
        fullWidth
        value={tabValue}
        tabs={['Preguntas', 'Respuestas']}
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
