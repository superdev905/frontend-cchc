import { FiDownload as DownloadIcon } from 'react-icons/fi'
import { Box, IconButton, makeStyles, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.gray.gray100,
    borderRadius: 5,
    cursor: 'pointer'
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  info: {
    fontSize: 14,
    opacity: 0.5
  }
}))

const ProtocolCard = ({ protocol }) => {
  const classes = useStyles()
  return (
    <Box p={2} className={classes.root}>
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
      >
        <Box>
          <Box display={'flex'} alignItems={'center'}>
            <Box></Box>
            <Box>
              <Typography className={classes.title}>
                {protocol.title}
              </Typography>
              <Typography className={classes.info}>
                {protocol.classification}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box>
          <IconButton color="primary">
            <DownloadIcon />
          </IconButton>
          <IconButton color="primary">
            <DownloadIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  )
}

ProtocolCard.defaultProps = {
  title: 'Protocolo 1',
  classification: 'Classificación'
}

export default ProtocolCard
