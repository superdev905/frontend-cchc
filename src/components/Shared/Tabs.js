import PropTypes from 'prop-types'
import { Box, makeStyles, Tabs, Tab } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  tabRoot: {
    marginBottom: 15,
    minHeight: 0,
    '& button': {
      minHeight: 0,
      fontSize: 15,
      fontWeight: 'bold',
      opacity: 0.8,
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

const CustomTabs = ({ children, value, onChange, tabs }) => {
  const classes = useStyles()

  return (
    <Box>
      <Box>
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
            <Tab label={item} key={`index-tab-${index}`} />
          ))}
        </Tabs>
      </Box>
      <Box>{children}</Box>
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
