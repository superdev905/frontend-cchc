import { useState } from 'react'
import { FiArrowLeft as ArrowBack } from 'react-icons/fi'
import { useSelector } from 'react-redux'
import { Box, Chip, Drawer, IconButton, makeStyles } from '@material-ui/core'
import { LabeledRow, Text } from '../UI'
import { formatDate } from '../../formatters'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '80%'
    },
    [theme.breakpoints.up('lg')]: {
      width: 600
    }
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  heading: {
    fontSize: '17px',
    fontWeight: 'bold',
    marginTop: '10px'
  }
}))

const DetailsDraw = ({ open, onClose, protocol }) => {
  const classes = useStyles()
  const { isMobile } = useSelector((state) => state.ui)
  const [loading] = useState(false)

  return (
    <Drawer
      classes={{ paper: classes.root }}
      anchor="right"
      fullScreen={isMobile}
      open={open}
      onClose={onclose}
    >
      <Box px={3} py={4}>
        <Box display="flex" alignItems="center">
          <IconButton onClick={onClose}>
            <ArrowBack />
          </IconButton>
          <Text loading={loading} className={classes.title}>
            {`${protocol?.title}`}
          </Text>
        </Box>
        <Box my={2}>
          <LabeledRow loaderWidth="5%" label={'Clasificación'}>
            <Text loading={loading}>{protocol?.classification}</Text>
          </LabeledRow>
          <LabeledRow loaderWidth="5%" label={'Fecha de Inicio'}>
            <Text loading={loading}>{formatDate(protocol?.startDate)}</Text>
          </LabeledRow>
          <LabeledRow loaderWidth="5%" label={'Fecha de Fin'}>
            <Text loading={loading}>{formatDate(protocol?.endDate)}</Text>
          </LabeledRow>

          <Chip color="primary" label={protocol.modules.length} />
        </Box>
      </Box>
    </Drawer>
  )
}

export default DetailsDraw
