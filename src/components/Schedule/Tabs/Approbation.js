import { Box, Typography } from '@material-ui/core'
import { EmptyState } from '../../UI'
import useStyles from './styles'

const Approbation = () => {
  const classes = useStyles()
  return (
    <Box>
      <Box>
        <Box mb={1}>
          <Typography className={classes.subHeading}>
            Estado de envio
          </Typography>
        </Box>
        <Box>
          <EmptyState
            message="Esta programación no fue enviado"
            event={() => {}}
            actionMessage="Enviar"
          />
        </Box>
      </Box>
      <Box mt={2}>
        <Box mb={1}>
          <Typography className={classes.subHeading}>
            Estado de aprobación
          </Typography>
        </Box>
        <Box>
          <EmptyState
            message="Esta programación no tiene aprobación"
            event={() => {}}
            actionMessage="Registrar"
          />
        </Box>
      </Box>
    </Box>
  )
}

export default Approbation
