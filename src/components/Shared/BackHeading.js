import { ArrowBack as BackIcon } from '@material-ui/icons'
import { Box, IconButton } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import { PageHeading, TimeStamp } from '../UI'

const BackHeading = ({ goBack, title, loading, timeAgo }) => (
  <Box display="flex" alignItems="center">
    <Box>
      <IconButton onClick={goBack}>
        <BackIcon />
      </IconButton>
    </Box>
    <Box>
      {!loading ? (
        <PageHeading>{title}</PageHeading>
      ) : (
        <Skeleton width="200px"></Skeleton>
      )}
      {timeAgo && <TimeStamp loading={loading} text={timeAgo} />}
    </Box>
  </Box>
)

export default BackHeading
