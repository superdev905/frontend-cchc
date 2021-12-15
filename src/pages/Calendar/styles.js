import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  eventCard: {
    cursor: 'pointer',
    color: theme.palette.common.black,
    height: '100%',
    width: '100%'
  },
  canceled: {
    backgroundColor: theme.palette.error.light
  },
  title: {
    marginBottom: 2,
    fontSize: 13,
    fontWeight: 'bold',
    overflow: 'hidden'
  },
  hours: {
    fontSize: 13
  },
  status: {
    fontSize: 11,
    textTransform: 'capitalize'
  },
  blue: {
    backgroundColor: '#aed5ff',
    border: `2px solid #076af9`
  },
  green: {
    backgroundColor: '#81d88d',
    border: `2px solid #48C659`
  },
  yellow: { backgroundColor: '#f6e68f', border: `2px solid #F2DB5C` },
  red: {
    backgroundColor: '#FFEBF6',
    border: `2px solid #ED61B0`
  },
  brown: {
    backgroundColor: '#cc7722',
    border: `2px solid #704241`
  },
  grey: {
    backgroundColor: '#8c92ac',
    border: `2px solid #536878`
  },
  orange: {
    backgroundColor: '#ff9933',
    border: `2px solid #ff4f00`
  },
  task: {
    backgroundColor: '#DAD3FE',
    border: `2px solid #6353BA`
  }
}))

export default useStyles
