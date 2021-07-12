import PropTypes from 'prop-types'
import { Box, makeStyles } from '@material-ui/core'
import { Pagination } from '@material-ui/lab'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: `${theme.spacing(2)}px 0px`,
    display: 'flex'
  }
}))

const CustomPagination = ({ totalCount }) => {
  const classes = useStyles()
  return (
    <Box className={classes.root}>
      <Pagination
        count={totalCount}
        variant="outlined"
        shape="rounded"
        color="primary"
      />
    </Box>
  )
}

CustomPagination.propTypes = {
  totalCount: PropTypes.number.isRequired
}

export default CustomPagination
