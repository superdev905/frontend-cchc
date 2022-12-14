import { useSelector } from 'react-redux'
import { Box, Grid, makeStyles, Typography } from '@material-ui/core'
import { TextField } from '../../UI'

const useStyles = makeStyles((theme) => ({
  itemWrapper: {
    border: `1px solid ${theme.palette.gray.gray500}`,
    borderRadius: 5,
    marginBottom: 8,
    padding: '5px 8px'
  }
}))

const List = () => {
  const classes = useStyles()
  const { assistanceConstructionList } = useSelector(
    (state) => state.assistance
  )
  return (
    <Grid container>
      {assistanceConstructionList.map((item, index) => (
        <Grid key={`report-item-${index}`} item xs={12}>
          <Box className={classes.itemWrapper}>
            <Grid container alignItems="center">
              <Grid item xs={10}>
                <Typography>{item.type_name}</Typography>
              </Grid>
              <Grid item xs={2}>
                <TextField
                  type="number"
                  value={item.quantity}
                  error={item.quantity === ''}
                  inputProps={{ readOnly: true }}
                />
              </Grid>
            </Grid>
          </Box>
        </Grid>
      ))}
    </Grid>
  )
}

export default List
