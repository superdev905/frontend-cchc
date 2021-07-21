import { useState } from 'react'
import { Box, makeStyles, Tabs, Tab } from '@material-ui/core'
import { useHistory, useLocation, useParams } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {},
  tabRoot: {
    marginBottom: 15,
    minHeight: 0,
    '& button': {
      minHeight: 0,
      fontSize: 15,
      fontWeight: 'bold',
      opacity: 0.7,
      minWidth: 0,
      padding: `${theme.spacing(1)}px ${theme.spacing(3)}px`,
      textTransform: 'inherit'
    },
    '& .Mui-selected': {
      color: theme.palette.primary.main,
      opacity: 1
    }
  }
}))

const CompanyTabs = ({ children }) => {
  const classes = useStyles()
  const history = useHistory()
  const location = useLocation()
  const { idCompany } = useParams()

  const getValue = () => {
    if (location.pathname.includes('constructions')) return 3
    if (location.pathname.includes('contacts')) return 2
    if (location.pathname.includes('divisions')) return 1

    return 0
  }

  const [tab] = useState(getValue())

  const getRoute = (value) => {
    if (value === 3) return 'constructions'
    if (value === 2) return 'contacts'
    if (value === 1) return 'divisions'
    return 'details'
  }

  const handleTabChange = (__, newValue) => {
    history.push(`/company/${idCompany}/${getRoute(newValue)}`)
  }

  return (
    <Box className={classes.root}>
      <Box>
        <Tabs
          value={tab}
          onChange={handleTabChange}
          classes={{ root: classes.tabRoot }}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="Detalles" />
          <Tab label="Divisiones" />
          <Tab label="Contactos" />
          <Tab label="Obras" />
        </Tabs>
      </Box>
      <Box>{children}</Box>
    </Box>
  )
}

export default CompanyTabs
