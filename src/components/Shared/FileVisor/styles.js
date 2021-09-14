import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  modalRoot: {
    backgroundColor: 'transparent'
  },
  bar: {
    height: '65px',
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  content: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  body: {
    height: '100%',
    width: '100%'
  },
  contentPaper: {
    padding: 0
  },
  loader: {
    '& svg': {
      color: theme.palette.common.white
    }
  },
  pdfWrapper: {
    height: '100%',
    position: 'relative',
    '& .react-transform-wrapper': {
      width: '100%',
      height: '100%',
      overflowY: 'auto'
    },
    '& .react-transform-component ': {
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%'
    }
  },
  controls: {
    position: 'absolute',
    bottom: 10,
    width: '100%',
    display: 'flex',
    justifyContent: 'center'
  },
  controlIcon: {
    padding: 7,
    opacity: 0.7,
    borderRadius: 8,
    backgroundColor: theme.palette.common.black,
    margin: 4,
    '&:hover': {
      backgroundColor: theme.palette.common.black
    }
  },
  icon: {
    fill: theme.palette.common.white
  }
}))

export default useStyles
