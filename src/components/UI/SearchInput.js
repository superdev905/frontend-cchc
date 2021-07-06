import { makeStyles } from '@material-ui/core/styles'
import { Box, InputBase } from '@material-ui/core/'
import SearchIcon from '@material-ui/icons/Search'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 8,
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#F5F8FA',
    borderRadius: 5,
    marginTop: 15,
    [theme.breakpoints.up('md')]: {
      width: '100%'
    }
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1
  },
  iconButton: {
    padding: 10
  }
}))

const SearchInput = ({ placeholder, onChange, id, value }) => {
  const classes = useStyles()

  return (
    <Box className={classes.root}>
      <SearchIcon style={{ fill: '#C2CFE0' }} />
      <InputBase
        className={classes.input}
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        inputProps={{ 'aria-label': 'search input' }}
      />
    </Box>
  )
}

export default SearchInput
