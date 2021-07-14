import { useEffect, useState } from 'react'
import clsx from 'clsx'
import { withRouter } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Box, Chip, Grid, IconButton, makeStyles } from '@material-ui/core'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import companiesActions from '../../../state/actions/companies'
import Filters from './Filters'
import { Wrapper } from '../../UI'
import CreateCompany from '../Create'

const heading = {
  business_name: { title: 'Nombre', width: 3 },
  rut: { title: 'Rut', width: 2 },
  email: { title: 'Correo', width: 3 },
  phone: { title: 'Teléfono', width: 2 },
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

const List = ({ ...props }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [data, setData] = useState([])
  const [sortOperator, setSortOperator] = useState('DESC')
  const { list, showCreateModal, filters } = useSelector(
    (state) => state.companies
  )

  const toggleCreateModal = () => {
    dispatch(companiesActions.toggleCreateModal(showCreateModal))
  }

  useEffect(() => {
    setData(list)
  }, [list])
  useEffect(() => {
    dispatch(companiesActions.getCompanies(filters))
  }, [])

  const rowClick = (companyId) => {
    props.history.push(`/empresas/${companyId}`)
  }

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
      <Filters />
      <Wrapper>
        <Box>
          <Box>
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
                <Box
                  key={`table-row-${pos}`}
                  className={classes.row}
                  onClick={() => rowClick(item.id)}
                >
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

      <CreateCompany open={showCreateModal} onClose={toggleCreateModal} />
    </Box>
  )
}

export default withRouter(List)
