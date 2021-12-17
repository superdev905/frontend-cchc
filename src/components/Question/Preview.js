import { Box, Typography } from '@material-ui/core'

const PreviewQuestion = ({ question }) => (
  <Box px={2} py={3}>
    <Typography style={{ fontSize: 17, fontWeight: 'bold' }}>
      Título: {question.title}
    </Typography>
    <Typography>Consulta: {question.question}</Typography>
  </Box>
)

export default PreviewQuestion
