import PropTypes from 'prop-types'
import { Box, makeStyles, Tabs, Tab } from '@material-ui/core'

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`
  }
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: `${window.innerWidth - 16}px`,
    backgroundColor: theme.palette.background.paper,
    [theme.breakpoints.up('md')]: {
      width: '100%'
    }
  },
  tabRoot: {
    marginBottom: 15,
    minHeight: 0,
    '& button': {
      minHeight: 0,
      maxWidth: 'fit-content',
      fontSize: 15,
      fontWeight: 'bold',
      opacity: 0.9,
      minWidth: 0,
      //  padding: `10px`,
      textTransform: 'inherit',
      [theme.breakpoints.up('md')]: {
        padding: `${theme.spacing(2)}px ${theme.spacing(2)}px`
      }
    },
    '& .Mui-selected': {
      color: theme.palette.primary.main,
      opacity: 1
    }
  }
}))

const CustomTabs = ({ children, value, onChange, tabs }) => {
  const classes = useStyles()

  return (
    <Box>
      <Box className={classes.root}>
        <Tabs
          value={value}
          onChange={onChange}
          classes={{ root: classes.tabRoot }}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
        >
          {tabs.map((item, index) => (
            <Tab
              label={item}
              key={`index-tab-${index}`}
              {...a11yProps(index)}
            />
          ))}
        </Tabs>
      </Box>
      <Box container>{children}</Box>
    </Box>
  )
}

CustomTabs.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.string),
  value: PropTypes.number.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ])
}

export default CustomTabs
