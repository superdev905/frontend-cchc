import { FiDownload as DownloadIcon, FiEye as ViewIcon } from 'react-icons/fi'
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

const ProtocolCard = ({ protocol, onDownload, onView }) => {
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
                {protocol.classification.name}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box>
          <IconButton color="primary" onClick={onDownload}>
            <DownloadIcon />
          </IconButton>
          <IconButton color="primary" onClick={onView}>
            <ViewIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  )
}

ProtocolCard.defaultProps = {
  protocol: { title: 'Protocolo 1', classification: 'Classificación' }
}

export default ProtocolCard
