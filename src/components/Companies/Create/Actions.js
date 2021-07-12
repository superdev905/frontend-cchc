import PropTypes from 'prop-types'
import { Box } from '@material-ui/core'
import {
  ArrowForward as NextIcon,
  ArrowBack as BackIcon
} from '@material-ui/icons'
import { Button } from '../../UI'
import useStyles from './styles'

const Actions = ({
  handleBack,
  backText,
  handleNext,
  nextText,
  showBackIcon,
  showNextIcon,
  disableNext
}) => {
  const classes = useStyles()
  return (
    <Box className={classes.actions}>
      <Button
        variant="outlined"
        onClick={handleBack}
        startIcon={showBackIcon && <BackIcon />}
      >
        {backText}
      </Button>
      <Button
        onClick={handleNext}
        disabled={disableNext}
        endIcon={showNextIcon && <NextIcon />}
      >
        {nextText}
      </Button>
    </Box>
  )
}
Actions.defaultProps = {
  showBackIcon: true,
  showNextIcon: true,
  backText: 'Anterior',
  nextText: 'Siguiente'
}

Actions.propTypes = {
  handleBack: PropTypes.func.isRequired,
  handleNext: PropTypes.func.isRequired,
  disabled: PropTypes.func.is
}

export default Actions
