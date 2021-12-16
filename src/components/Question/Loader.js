import { Box } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'

const Loader = () => (
  <Box p={2}>
    <Box mb={1}>
      <Skeleton
        width="60%"
        style={{
          fontSize: 18
        }}
      />
    </Box>
    <Box>
      <Skeleton width="100%" height="16px" />
      <Skeleton width="100%" height="16px" />
      <Skeleton width="100%" height="16px" />
      <Skeleton width="100%" height="16px" />
      <Skeleton width="40%" height="16px" />
    </Box>
  </Box>
)

export default Loader
