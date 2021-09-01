import { Box, Typography } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { formatDate } from '../../formatters'
import { Dialog } from '../Shared'
import { Button } from '../UI'
import { QuestionCard } from './Question'

const AnswerDialog = ({ open, onClose, userAnswer }) => {
  const { isMobile } = useSelector((state) => state.ui)
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      fullScreen={isMobile}
    >
      <Box marginBottom="15px">
        <Typography style={{ fontSize: '20px', fontWeight: 'bold' }}>
          Respuesta de: {userAnswer.user_fullname}
        </Typography>
        <Typography>Fecha : {formatDate(userAnswer.date)}</Typography>
      </Box>
      {userAnswer.answers.map((item, index) => (
        <QuestionCard
          editable={false}
          answer
          question={{
            ...item.question,
            type_name: item.question.question_type.display_name,
            type: item.question.question_type.key
          }}
          index={index + 1}
          textResponse={item.response_text}
          selectedOptions={
            item.response_options
              ? item.response_options.split(',').map((i) => parseInt(i, 10))
              : []
          }
          simpleResponse={!item.response_yn ? 'No' : 'Si'}
          successFunction={() => {}}
          onAnswer={() => {}}
        />
      ))}
      <Box textAlign="center" marginTop="15px">
        <Button onClick={onClose}>Aceptar</Button>
      </Box>
    </Dialog>
  )
}

export default AnswerDialog
