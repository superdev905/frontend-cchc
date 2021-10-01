import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  subtitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10
  },
  form: {
    [theme.breakpoints.up('md')]: {
      width: 800,
      margin: '0 auto'
    }
  },
  actions: {
    textAlign: 'center',
    margin: `${15}px 0px`
  },
  mapContainer: {
    borderRadius: 5,
    '& .mapboxgl-ctrl-bottom-left': {
      display: 'none'
    },
    '& .mapboxgl-ctrl-bottom-right': {
      display: 'none'
    }
  },
  fileWrapper: {
    border: `2px solid ${theme.palette.gray.gray200}`,
    borderRadius: 5
  },
  requiredFile: {
    border: `2px solid ${theme.palette.error.main}`
  }
}))

export default useStyles
