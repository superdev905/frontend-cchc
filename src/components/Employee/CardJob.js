import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  Box,
  Card,
  IconButton,
  CardContent,
  Grid,
  Typography,
  makeStyles
} from '@material-ui/core'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import companiesActions from '../../state/actions/companies'
import constructionsActions from '../../state/actions/constructions'
import { formatDate } from '../../formatters'
import { useMenu } from '../../hooks'
import { OptionsMenu } from '../Shared'

const useStyles = makeStyles(() => ({
  root: {
    position: 'relative'
  },
  btnMore: {
    position: 'absolute',
    top: 15,
    right: 15
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold'
  }
}))

const CardSpec = ({ data, onEdit, onDelete }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [company, setCompany] = useState(null)
  const [construction, setConstruction] = useState(null)
  const { open, anchorEl, handleOpen, handleClose } = useMenu()

  useEffect(() => {
    if (data) {
      dispatch(companiesActions.getCompany(data.business_id, false)).then(
        (result) => {
          setCompany(result)
        }
      )
      dispatch(
        constructionsActions.getConstruction(data.construction_id, false)
      ).then((result) => {
        setConstruction(result)
      })
    }
  }, [data])

  return (
    <Grid item xs={12} md={6}>
      <Card>
        <CardContent className={classes.root}>
          <IconButton className={classes.btnMore} onClick={handleOpen}>
            <MoreVertIcon />
          </IconButton>
          <Grid container spacing={1}>
            <Grid item xs={3}>
              <Box>S</Box>
            </Grid>
            <Grid item xs={9}>
              <Box p={2}>
                <Typography className={classes.name}>
                  {company && company.business_name}
                </Typography>
                <Typography>
                  {construction && construction.business_name}
                </Typography>
                <Typography>Tipo de contrato: {data.contract_type}</Typography>
                <Typography>Plazo de contrato: {data.contract_term}</Typography>
                <Typography>
                  Motivo de finiquito: {data.leave_motive}
                </Typography>
                <Typography>
                  Fecha de inicio: {formatDate(data.admission_date)}
                </Typography>
                <Typography>
                  Fecha de salida: {formatDate(data.leave_date)}
                </Typography>
                <Typography>{`$ ${data.salary}`}</Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
        <OptionsMenu
          open={open}
          onClose={handleClose}
          anchorEl={anchorEl}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </Card>
    </Grid>
  )
}

export default CardSpec
