import { Box, Drawer } from '@material-ui/core'

import useStyles from './styles'

const ProgramBenefit = ({ open, onClose }) => {
  const classes = useStyles()

  return (
    <Drawer
      classes={{ paper: classes.root }}
      anchor="right"
      fullScreen={isMobile}
      open={open}
      onClose={onClose}
    >
      <Box></Box>
    </Drawer>
  )
}

export default ProgramBenefit
