import { ArrowBack as BackIcon } from '@material-ui/icons'
import { Box, IconButton } from '@material-ui/core'
import { PageHeading, TimeStamp } from '../UI'

const BackHeading = ({ goBack, title, loading, timeAgo }) => (
  <Box display="flex">
    <Box>
      <IconButton onClick={goBack}>
        <BackIcon />
      </IconButton>
    </Box>
    <Box>
      <PageHeading>{title}</PageHeading>
      <TimeStamp loading={loading} text={timeAgo} />
    </Box>
  </Box>
)

export default BackHeading
