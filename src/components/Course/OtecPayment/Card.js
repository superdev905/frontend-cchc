import { Box, Grid, makeStyles, Typography } from '@material-ui/core'
import { FileThumbnail } from '../../Shared'
import { formatDate } from '../../../formatters'

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 5,
    border: `1px solid ${theme.palette.common.black}`,
    marginBottom: 10
  },
  paper: {
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`
  },
  date: {
    fontSize: 15,
    marginBottom: 5
  },
  info: {
    fontWeight: 'bold'
  }
}))

const OTECPaymentCard = ({ payment }) => {
  const classes = useStyles()
  return (
    <Box className={classes.root}>
      <Box className={classes.paper}>
        <Box>
          <Typography className={classes.date}>
            {formatDate(new Date())}
          </Typography>
        </Box>
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Typography className={classes.info}>
                Factura : {payment.invoiceNumber}
              </Typography>
              <FileThumbnail
                fileName={payment.invoiceFile.fileName}
                date={new Date(payment.invoiceFile.uploadDate)}
                fileSize={payment.invoiceFile.fileSize}
              />
            </Grid>
            <Grid item xs={12} md={8}>
              <Box>
                <Typography className={classes.info}>
                  Número de OC : {payment.ocNumber}
                </Typography>
              </Box>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <FileThumbnail
                    fileName={payment.ocFile.fileName}
                    date={new Date(payment.ocFile.uploadDate)}
                    fileSize={payment.ocFile.fileSize}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FileThumbnail
                    fileName={payment.agreementFile.fileName}
                    date={new Date(payment.agreementFile.uploadDate)}
                    fileSize={payment.agreementFile.fileSize}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  )
}

export default OTECPaymentCard
