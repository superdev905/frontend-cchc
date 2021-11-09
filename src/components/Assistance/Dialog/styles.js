import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  benefitBox: {
    borderRadius: 5,
    border: `1px dashed ${theme.palette.gray.gray600}`
  }
}))

export default useStyles
