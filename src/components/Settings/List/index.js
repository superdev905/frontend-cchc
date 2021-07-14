import { useEffect, useState } from 'react'
import clsx from 'clsx'
import { withRouter } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Box, Chip, IconButton, makeStyles, Grid } from '@material-ui/core'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import { Wrapper, Button } from '../../UI'
import constructionsActions from '../../../state/actions/constructions'
import CreateTypology from '../Create/CreateTypology'
import { useToggle } from '../../../hooks'

const heading = {
  name: { title: 'Nombre', width: 3 },
  status: {
    title: 'Estado',
    center: true,
    width: 1,
    component: () => (
      <Box textAlign="center">
        <Chip
          label="Activo"
          style={{
            backgroundColor: '#7CCE97',
            borderRadius: 5,
            fontWeight: 'bold',
            color: '#ffffff'
          }}
        />
      </Box>
    )
  },
  actions: {
    static: true,
    title: '',
    width: 1,
    component: () => (
      <Box display="flex" justifyContent="flex-end">
        <IconButton
          onClick={(e) => {
            e.stopPropagation()
          }}
        >
          <MoreVertIcon />
        </IconButton>
      </Box>
    )
  }
}

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
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: theme.palette.primary.light
    }
  },
  center: {
    textAlign: 'center'
  }
}))

const List = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [data, setData] = useState([])
  const [sortOperator, setSortOperator] = useState('DESC')
  const { list, filters } = useSelector((state) => state.constructions)
  const { open, toggleOpen } = useToggle()

  useEffect(() => {
    setData(list)
  }, [list])
  useEffect(() => {
    dispatch(constructionsActions.getConstructionTypology(filters))
  }, [])

  const handleSort = (key) => {
    let temp = [...data]
    temp = temp.sort((a, b) =>
      sortOperator === 'DESC' ? b[key] - a[key] : a[key] - b[key]
    )
    setSortOperator('ASC')
    setData(temp)
  }

  return (
    <Box marginTop="10px">
      <Wrapper>
        <Box>
          <Box>
            <Grid item xs={12} md={6}>
              <Box display="flex" justifyContent="flex-end">
                <Button onClick={toggleOpen}>Nueva tipología</Button>
              </Box>
            </Grid>
            <Box className={classes.heading}>
              <Grid container>
                {Object.keys(heading).map((item, index) => (
                  <Grid
                    onClick={() => handleSort(item)}
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
                      <Grid
                        key={`row-${key}-${i}`}
                        item
                        xs={heading[key].width}
                      >
                        {heading[key].component && heading[key].component()}
                        {(!heading[key].static && item[key]) ||
                          (key === 'phone' && '92828282')}
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              )
              return temp
            })}
          </Box>
        </Box>
      </Wrapper>
      <CreateTypology open={open} onClose={toggleOpen} />
    </Box>
  )
}

export default withRouter(List)
