import { Badge, IconButton, makeStyles } from '@material-ui/core'
import { FiDownload as DownloadIcon } from 'react-icons/fi'
import ReportModuleDialog from '../Reports'
import { useToggle } from '../../hooks'

const useStyles = makeStyles(() => ({
  iconButton: {
    marginRight: 5
  }
}))

const Protocol = () => {
  const classes = useStyles()
  const { open, toggleOpen } = useToggle()

  return (
    <>
      <IconButton onClick={toggleOpen} className={classes.iconButton}>
        <Badge color="error">
          <DownloadIcon />
        </Badge>
      </IconButton>

      <ReportModuleDialog open={open} onClose={toggleOpen} />
    </>
  )
}

export default Protocol
