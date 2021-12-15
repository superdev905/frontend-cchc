import { Box, Chip, makeStyles, Typography } from '@material-ui/core'
import { formatDate, formatHours } from '../../formatters'

const useStyles = makeStyles((theme) => ({
  root: {
    border: `2px solid ${theme.palette.gray.gray300}`,
    borderRadius: theme.spacing(1),
    cursor: 'pointer'
  },
  numberWrapper: {
    width: 120,
    borderRadius: 3,
    border: '1px solid ',
    height: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 18,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white
  },
  chip: {
    fontSize: 15,
    marginRight: 5
  },
  title: {
    fontSize: 19,
    fontWeight: 'bold'
  }
}))

const QuestionCard = () => {
  const classes = useStyles()

  return (
    <Box p={2} className={classes.root}>
      <Box className={classes.numberWrapper}>N° 022828</Box>
      <Box mt={1}>
        <Typography style={{ fontSize: 14 }}>
          {`${formatDate(new Date())} - ${formatHours(new Date())}`}
        </Typography>
        <Box my={1}>
          <Typography className={classes.title}>Consulta de Estado</Typography>
          <Typography>
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of using Lorem Ipsum is that it has a more-or-less normal
            distribution of letters, as opposed to using 'Content here, content
            here', making it look like readable English. Many desktop publishing
            packages and web page editors now use Lorem Ipsum as their default
            model text, and a search for 'lorem ipsum' will uncover many web
            sites still in their infancy. Var
          </Typography>
        </Box>
        <Box display="flex">
          <Chip
            className={classes.chip}
            variant="oulined"
            label={`Estado: ${'Asginado'}`}
            size="medium"
          />
          <Chip
            className={classes.chip}
            variant="oulined"
            label={`Area: ${'Salud'}`}
            size="medium"
          />
        </Box>
      </Box>
    </Box>
  )
}

export default QuestionCard
