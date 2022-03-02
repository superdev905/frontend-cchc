import { makeStyles } from '@material-ui/core/styles'
import { Box, InputBase } from '@material-ui/core/'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: theme.palette.gray.gray100,
    borderRadius: 5,
    marginTop: 5,
    [theme.breakpoints.up('md')]: {
      width: '100%'
    }
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
    '& input': {
      textTransform: 'uppercase'
    }
  },
  iconButton: {
    padding: 10
  }
}))
const SearchInput = ({
  placeholder,
  onChange,
  status,
  id,
  value,
  CustomInput,
  children
}) => {
  const classes = useStyles()

  return (
    <Box className={classes.root}>
      {
        <CustomInput
          className={classes.input}
          id={id}
          status={status}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          inputProps={{ 'aria-label': 'search input' }}
        />
      }
      {children}
    </Box>
  )
}

SearchInput.defaultProps = {
  CustomInput: InputBase
}

export default SearchInput
