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

  const renderTree = (node) => (
    <TreeItem
      key={node.id}
      nodeId={node.id}
      label={
        <Box display="flex" alignItems="center" m={1}>
          <Checkbox
            color="primary"
            checked={node.id === selectedId}
            disabled={node.state === 'DELETED'}
            onChange={() => onChange(node.id)}
          />
          <Box>
            <Typography>
              Razon social:{' '}
              <span className={classes.businessName}>{node.business_name}</span>
            </Typography>
            <Typography className={classes.rut}>Rut: {node.rut}</Typography>
          </Box>
        </Box>
      }
    >
      {node.children && node.children.length > 0
        ? node.children.map((item) => renderTree(item))
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
