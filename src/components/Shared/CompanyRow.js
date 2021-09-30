import { IoMdBusiness } from 'react-icons/io'
import { FiTrash2 as IconDelete } from 'react-icons/fi'
import { Box, IconButton, makeStyles, Typography } from '@material-ui/core'
import { Button } from '../UI'
import { formatText } from '../../formatters'

const useStyles = makeStyles((theme) => ({
  root: () => ({
    width: '100%',
    position: 'relative',
    marginBottom: theme.spacing(2),
    cursor: 'pointer',
    display: 'flex',
    borderRadius: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
    border: `1px solid ${theme.palette.gray.gray600}`
  }),
  autoComplete: {
    cursor: 'pointer',
    display: 'flex',
    borderRadius: 5,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  name: {
    fontWeight: 'bold',
    fontSize: 17
  },
  info: {
    fontSize: 14
  },
  deleteIcon: {
    color: theme.palette.error.main
  }
}))

const CompanyInfo = ({ company, iconColor = '#03C48C' }) => {
  const classes = useStyles()
  return (
    <Box display="flex" alignItems="center">
      <Box p={1}>
        <IoMdBusiness color={iconColor} fontSize="35px" />
      </Box>
      <Box ml={1}>
        <Typography className={classes.name}>
          {company.business_name}
        </Typography>
        <Typography
          className={classes.info}
        >{`Rut: ${company.rut}`}</Typography>
        <Typography
          className={classes.info}
        >{`Dirección: ${company.address}`}</Typography>
        <Typography
          className={classes.info}
        >{`Tipo: ${formatText.capitalizeString(company.type)}`}</Typography>
      </Box>
    </Box>
  )
}

const Autocomplete = ({ company, iconColor }) => {
  const classes = useStyles()
  return (
    <Box className={classes.autoComplete}>
      <CompanyInfo company={company} iconColor={iconColor} />
    </Box>
  )
}

const CompanyRow = ({
  company,
  onDelete,
  selectable = false,
  onSelect,
  iconColor
}) => {
  const classes = useStyles()
  return (
    <Box p={1} className={classes.root}>
      <CompanyInfo company={company} iconColor={iconColor} />
      {selectable ? (
        <Button size="small" onClick={onSelect}>
          Seleccionar
        </Button>
      ) : (
        <IconButton onClick={onDelete}>
          <IconDelete className={classes.deleteIcon} />
        </IconButton>
      )}
    </Box>
  )
}

CompanyRow.Autocomplete = Autocomplete

export default CompanyRow
