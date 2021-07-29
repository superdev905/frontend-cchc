import TreeView from '@material-ui/lab/TreeView'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import TreeItem from '@material-ui/lab/TreeItem'
import { Box, Checkbox, Typography, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  wrapper: {
    [theme.breakpoints.up('md')]: {
      minHeight: 300
    }
  },

  businessName: {
    fontWeight: 'bold',
    fontSize: 17
  },
  rut: {
    fontSize: 15
  }
}))

export default function RecursiveTreeView({ data, selectedId, onChange }) {
  const classes = useStyles()

  const renderTree = (nodes) => (
    <TreeItem
      key={nodes.id}
      nodeId={nodes.id}
      label={
        <Box display="flex" alignItems="center" m={1}>
          <Checkbox
            color="primary"
            checked={nodes.id === selectedId}
            disabled={nodes.state === 'DELETED'}
            onChange={() => onChange(nodes.id)}
          />
          <Box>
            <Typography>
              Razon social:{' '}
              <span className={classes.businessName}>
                {nodes.business_name}
              </span>
            </Typography>
            <Typography className={classes.rut}>Rut: {nodes.rut}</Typography>
          </Box>
        </Box>
      }
    >
      {nodes.children_business
        ? Object.keys(nodes.children_business).map((node) =>
            renderTree(nodes.children_business[node])
          )
        : null}
    </TreeItem>
  )

  return (
    <Box className={classes.wrapper}>
      <TreeView
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpanded={['root']}
        defaultExpandIcon={<ChevronRightIcon />}
      >
        {data.map((item) => (
          <>{renderTree(item)}</>
        ))}
      </TreeView>
    </Box>
  )
}
