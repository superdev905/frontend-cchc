import { Avatar, Box, Chip, makeStyles, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: () => ({
    position: 'relative',
    marginBottom: theme.spacing(2),
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  })
}))

const AutocompleteRow = ({ option }) => {
  const classes = useStyles()
  return (
    <Box className={classes.root} width="100%">
      <Box display="flex" alignItems="center">
        <Avatar style={{ backgroundColor: option.avatarBg }}>
          {option.names.charAt(0)}
        </Avatar>
        <Box pl={1}>
          <Typography
            style={{
              fontWeight: 'bold'
            }}
          >{`${option.names} ${option.paternal_surname} ${option.maternal_surname}`}</Typography>
          <Typography
            style={{ fontSize: 14 }}
          >{`Rut: ${option.run}`}</Typography>
        </Box>
      </Box>
      <Box>
        <Chip
          color="primary"
          label={`${option.isRelative ? 'Familiar' : 'Trabajador'}`}
        ></Chip>
      </Box>
    </Box>
  )
}

export default AutocompleteRow
