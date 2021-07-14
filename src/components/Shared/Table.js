import clsx from 'clsx'
import { Box, Grid, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  heading: {
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px ${theme.spacing(
      2
    )}px`,
    borderBottom: '1px solid #EBEFF2',
    fontSize: 14,
    color: theme.palette.dark_blue.main,
    fontWeight: 'bold'
  },
  row: {
    borderBottom: '1px solid #EBEFF2',
    padding: `4px ${theme.spacing(2)}px`,
    fontSize: 15,
    cursor: 'pointer'
  },
  center: {
    textAlign: 'center'
  }
}))

const Table = ({ heading, data }) => {
  const classes = useStyles()

  return (
    <Box marginTop="10px">
      <Box>
        <Box className={classes.heading}>
          <Grid container>
            {Object.keys(heading).map((item, index) => (
              <Grid
                key={`heading-table-${index}`}
                item
                xs={heading[item].width}
                className={clsx(heading[item].center && classes.center)}
              >
                {heading[item].title}
              </Grid>
            ))}
          </Grid>
        </Box>

        {data.map((item, pos) => {
          const temp = []
          temp.push(
            <Box key={`table-row-${pos}`} className={classes.row}>
              <Grid container alignItems="center">
                {Object.keys(heading).map((key, i) => (
                  <Grid key={`row-${key}-${i}`} item xs={heading[key].width}>
                    {heading[key].component && heading[key].component()}
                    {!heading[key].static && item[key]}
                  </Grid>
                ))}
              </Grid>
            </Box>
          )
          return temp
        })}
      </Box>
    </Box>
  )
}

export default Table
