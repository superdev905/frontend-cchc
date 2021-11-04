import { Box, Typography } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { EmptyState } from '../../UI'
import PollCard from '../Card'

const PollList = ({ loading, onSelectPoll, list }) => {
  const { moduleResponse } = useSelector((state) => state.poll)
  return (
    <Box>
      <Typography
        style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '15px' }}
        align="center"
      >
        Encuestas disponibles
      </Typography>
      <Box>
        {loading ? (
          <>
            <PollCard loader />
            <PollCard loader />
          </>
        ) : (
          <>
            {list.length === 0 ? (
              <EmptyState message="No hay encuestas para este módulo" />
            ) : (
              list.map((item) => (
                <PollCard
                  poll={item}
                  showAnswers={false}
                  isAnswered={
                    moduleResponse.pollStatus.find(
                      (poll) => poll.id === item.id
                    )?.isAnswered || false
                  }
                  onClick={(currentPoll) => onSelectPoll(currentPoll)}
                />
              ))
            )}
          </>
        )}
      </Box>
    </Box>
  )
}
export default PollList
