import { useHistory } from 'react-router-dom'
import { ArrowBack as BackIcon } from '@material-ui/icons'
import { Box, IconButton } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import { PageHeading, TimeStamp } from '../UI'

const BackHeading = ({ goBack, title, loading, timeAgo }) => {
  const history = useHistory()

  const handleGoBack = () => {
    if (goBack) {
      goBack()
    } else {
      history.goBack()
    }
  }

  return (
    <Box display="flex" alignItems="center">
      <Box>
        <IconButton onClick={handleGoBack}>
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
}

export default BackHeading
