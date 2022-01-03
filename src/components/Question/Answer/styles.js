import { makeStyles } from '@material-ui/core'
import { COLORS } from '../../../utils/generateColor'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.gray.gray100,
    borderRadius: theme.spacing(1)
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  chip: {
    fontSize: 15,
    marginRight: 5,
    backgroundColor: theme.palette.common.white
  },
  areaChip: {
    backgroundColor: '#DAD3FE'
  },
  channelChip: {
    backgroundColor: '#BAE7FE'
  },
  topicArea: {
    backgroundColor: '#F5CBC7'
  },
  avatar: {
    backgroundColor: COLORS[3],
    marginRight: 5
  },
  professional: {
    fontWeight: 'bold'
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  lockedIcon: {
    fontSize: 40,
    color: theme.palette.error.main
  },
  answer: {
    '& p': {
      fontSize: 16,
      margin: '2px 0px'
    }
  }
}))

export default useStyles
