import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  headingWrapper: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  },
  subHeading: {
    fontSize: 17,
    fontWeight: 'bold'
  }
}))

export default useStyles
