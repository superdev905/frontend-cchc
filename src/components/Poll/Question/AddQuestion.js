import { Box, makeStyles, Typography } from '@material-ui/core'
import AddOutlinedIcon from '@material-ui/icons/AddOutlined'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#F6F6F6',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    minHeight: 120,
    border: `2px dashed ${theme.palette.common.black}`,
    cursor: 'pointer',
    marginBottom: '15px',
    '&:hover': {
      border: `2px dashed ${theme.palette.primary.main}`
    }
  },
  icon: {
    fontSize: 35
  }
}))

const AddQuestion = ({ onClick }) => {
  const classes = useStyles()
  return (
    <Box className={classes.root} onClick={onClick}>
      <Box textAlign="center">
        <AddOutlinedIcon className={classes.icon} />
        <Typography align="center">Nueva pregunta</Typography>
      </Box>
    </Box>
  )
}

AddQuestion.propTypes = {}

export default AddQuestion
