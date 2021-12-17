import clsx from 'clsx'
import { FiLock as LockedIcon } from 'react-icons/fi'
import { Box, Typography } from '@material-ui/core'

import useStyles from './styles'

const Filled = () => {
  const classes = useStyles()
  return (
    <Box p={2} minHeight={250} className={clsx(classes.root, classes.center)}>
      <Box textAlign="center">
        <LockedIcon className={classes.lockedIcon} />
        <Typography>Pregunta sin asignar</Typography>
      </Box>
    </Box>
  )
}

export default Filled
