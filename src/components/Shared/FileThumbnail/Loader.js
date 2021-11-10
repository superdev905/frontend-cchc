import { Box, makeStyles } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'

const useStyles = makeStyles((theme) => ({
  paper: ({ bgWhite }) => ({
    backgroundColor: bgWhite ? theme.palette.common.white : '#f5f6f8',
    borderRadius: 5
  }),
  iconLoader: {
    transform: 'none',
    width: '100%',
    height: 50
  },
  textWrapper: {
    marginLeft: 15,
    width: 'calc(100% - 40px)'
  }
}))
const Loader = () => {
  const classes = useStyles()

  return (
    <Box>
      <Box p={2} className={classes.paper}>
        <Box display={'flex'}>
          <Box width={'40px'}>
            <Skeleton className={classes.iconLoader} />
          </Box>
          <Box className={classes.textWrapper}>
            <Skeleton width={'80%'}></Skeleton>
            <Skeleton width={'40%'}></Skeleton>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Loader
