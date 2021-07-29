import PropTypes from 'prop-types'
import { Box, Grid, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  paper: ({ selected }) => ({
    cursor: 'pointer',
    borderRadius: 5,
    border: `2px solid ${selected ? theme.palette.primary.main : '#E8ECEE'}`,
    backgroundColor: selected ? '#e3f3fd' : 'transparent'
  })
}))

const SelectableCard = ({ onClick, children, Icon, selected }) => {
  const classes = useStyles({ selected })
  return (
    <Grid item xs={12} md={3}>
      <Box onClick={onClick} p={2} className={classes.paper}>
        {Icon && <Icon />}
        {children}
      </Box>
    </Grid>
  )
}

SelectableCard.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string])
}

export default SelectableCard
