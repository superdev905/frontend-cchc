import { IoMdBusiness } from 'react-icons/io'
import { MdBusinessCenter as CompanyIcon } from 'react-icons/md'
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

const CompanyInfo = ({ company, iconColor = '#03C48C', type }) => {
  const classes = useStyles()
  return (
    <Box display="flex" alignItems="center">
      <Box p={1}>
        {type === 'COMPANY' ? (
          <CompanyIcon color={iconColor} fontSize="35px" />
        ) : (
          <IoMdBusiness color={iconColor} fontSize="35px" />
        )}
      </Box>
      <Box ml={1}>
        {type === 'COMPANY' ? (
          <>
            {company.business_name && (
              <Typography className={classes.name}>
                {company.business_name}
              </Typography>
            )}
            {company.businessName && (
              <Typography className={classes.name}>
                {company.businessName}
              </Typography>
            )}
            <Typography
              className={classes.info}
            >{`Rut: ${company.rut}`}</Typography>
            <Typography
              className={classes.info}
            >{`Dirección: ${company.address}`}</Typography>
            {company.type && (
              <Typography
                className={classes.info}
              >{`Tipo: ${formatText.capitalizeString(
                company.type
              )}`}</Typography>
            )}
          </>
        ) : (
          <>
            {company.name && (
              <Typography className={classes.name}>{company.name}</Typography>
            )}
            <Typography
              className={classes.info}
            >{`Dirección: ${company.address}`}</Typography>
          </>
        )}
      </Box>
    </Box>
  )
}

const Autocomplete = ({ company, iconColor, type = 'COMPANY' }) => {
  const classes = useStyles()
  return (
    <Box className={classes.autoComplete}>
      <CompanyInfo company={company} iconColor={iconColor} type={type} />
    </Box>
  )
}

const CompanyRow = ({
  type,
  company,
  onDelete,
  selectable = false,
  onSelect,
  iconColor
}) => {
  const classes = useStyles()
  return (
    <Box p={1} className={classes.root}>
      <CompanyInfo company={company} iconColor={iconColor} type={type} />
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

CompanyRow.defaultProps = {
  type: 'COMPANY'
}

CompanyRow.Autocomplete = Autocomplete

export default CompanyRow
