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
    '&:hover': {
      border: `2px dashed ${theme.palette.primary.main}`
    }
  },
  icon: {
    fontSize: 35
  }
}))

const AddAnswer = ({ onClick }) => {
  const classes = useStyles()
  return (
    <Box className={classes.rot} onClick={onClick}>
      <Box textAlign="center">
        <AddOutlinedIcon className={classes.icn} />
        <Typography align="center">Agregar respuesta</Typography>
      </Box>
    </Box>
  )
}

AddAnswer.propTypes = {}

export default AddAnswer
