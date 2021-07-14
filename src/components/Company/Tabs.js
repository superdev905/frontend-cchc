import { useState } from 'react'
import { Box, makeStyles, Tabs, Tab } from '@material-ui/core'
import Details from './Details'
import Divisions from './Divisions'
import Contacts from './Contacts'

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

const Constructions = () => <span>Obras</span>

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
    return <Constructions />
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
/**
 * 
 * 
 * is_partner(pin):"NO"
update_at(pin):null
id(pin):1
state(pin):"CREATED"
rut(pin):"24110487-7"
phone(pin):"399383838"
name(pin):"Anakin Corp"
phone1(pin):""
address(pin):"Company Address"
phone2(pin):""
business_name(pin):"Anakin Company"
region_id(pin):1
email(pin):"anakin@corp.com"
commune_id(pin):1
created_at(pin):"2021-07-13T04:41:40.526258+00:00"
 */
