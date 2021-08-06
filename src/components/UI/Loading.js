import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import PropTypes from 'prop-types'

const useStyles = makeStyles(() => ({
  root: ({ centerVertically, center, background, height, width }) => ({
    zIndex: 1050,
    display: 'flex',
    flexDirection: 'column',
    alignItems: centerVertically ? 'center' : 'flex-start',
    justifyContent: center ? 'center' : 'flex-start',
    height: height ? `${height}` : '100%',
    width: width ? `${width}` : '100%',
    backgroundColor: background || 'rgba(255,255,255)'
  }),
  circle: () => ({}),
  logo: (props) => ({
    marginTop: 80,
    width: 200,
    height: 'auto',
    WebkitFilter: 'grayscale(100%)',
    filter: 'grayscale(100%)',
    ...props.logoStyle
  })
}))

const Progress = ({
  loading,
  size,
  thickness,
  color,
  showLogo,
  logo,
  logoStyle,
  center,
  centerVertically,
  height,
  width,
  background
}) => {
  const classes = useStyles({
    loading,
    size,
    thickness,
    color,
    showLogo,
    logo,
    logoStyle,
    center,
    centerVertically,
    height,
    width,
    background
  })

  return loading ? (
    <div className={classes.root}>
      <CircularProgress
        className={classes.circle}
        size={size || 40}
        thickness={thickness || 5}
        color={color || 'primary'}
      />
      {showLogo && <img src={logo} alt="Weber" className={classes.logo} />}
    </div>
  ) : null
}

Progress.propTypes = {
  loading: PropTypes.bool,

  size: PropTypes.number,

  thickness: PropTypes.number,

  color: PropTypes.oneOf(['primary', 'secondary', 'inherit']),

  center: PropTypes.bool,

  centerVertically: PropTypes.bool,

  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  background: PropTypes.any,

  showLogo: PropTypes.bool,

  logo: PropTypes.any,

  logoStyle: PropTypes.any
}
export default Progress
