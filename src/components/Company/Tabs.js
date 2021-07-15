import { useState } from 'react'
import { Box, makeStyles, Tabs, Tab } from '@material-ui/core'
import Details from './Details'
import Divisions from './Divisions'
import Contacts from './Contacts'
import Constructions from './Constructions'

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

const CompanyTabs = () => {
  const classes = useStyles()
  const [tab, setTab] = useState(0)

  const handleTabChange = (__, newValue) => {
    setTab(newValue)
  }

  const getPanel = (value) => {
    if (value === 0) return <Details />
    if (value === 1) return <Divisions />
    if (value === 2) return <Contacts />
    if (value === 3) return <Constructions />
    return <span>Not found</span>
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
      <Box>{getPanel(tab)}</Box>
    </Box>
  )
}

export default CompanyTabs
