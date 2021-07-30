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
import { formatDate } from '../../formatters'
import { useMenu } from '../../hooks'
import { OptionsMenu } from '../Shared'
import { StatusChip } from '../UI'

const useStyles = makeStyles(() => ({
  root: {
    position: 'relative'
  },
  btnMore: {
    position: 'absolute',
    top: 15,
    right: 15
  }
}))

const CardSpec = ({ data, onEdit, onDelete }) => {
  console.log(data)
  const classes = useStyles()
  const { open, anchorEl, handleOpen, handleClose } = useMenu()
  return (
    <Grid item xs={12} md={6} lg={4}>
      <Card>
        <CardContent className={classes.root}>
          <IconButton className={classes.btnMore} onClick={handleOpen}>
            <MoreVertIcon />
          </IconButton>
          <Box p={2}>
            <Typography> {data.specialty.description}</Typography>
            <Typography> {data.specialty_detail.description}</Typography>
            <Typography>Certificado: {data.is_certificated}</Typography>
            <Typography>
              {`Fecha de certificación: ${formatDate(data.certificated_date)}`}
            </Typography>
            {data.certifying_entity && (
              <Typography>
                {`Entidad que valida: ${data.certifying_entity.description}`}
              </Typography>
            )}
            <Box marginTop="10px">
              <StatusChip
                label={`Autodidacta: ${data.is_self_taught}`}
                success={data.is_self_taught === 'SI'}
              />
            </Box>
          </Box>
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
