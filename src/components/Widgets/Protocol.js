import { useEffect } from 'react'
import { FiHelpCircle as HelpIcon } from 'react-icons/fi'
import { Badge, IconButton, makeStyles } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { ProtocolModuleDialog } from '../Protocols'
import { useToggle } from '../../hooks'
import protocolsActions from '../../state/actions/protocols'

const useStyles = makeStyles(() => ({
  iconButton: {
    marginRight: 5
  }
}))

const Protocol = () => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const { module } = useSelector((state) => state.ui)
  const { moduleList: list } = useSelector((state) => state.protocols)

  const { open, toggleOpen } = useToggle()

  const getProtocolsByModule = () => {
    dispatch(protocolsActions.getModuleProtocols({ module }))
  }
  useEffect(() => {
    getProtocolsByModule()
  }, [module])

  return (
    <>
      <IconButton onClick={toggleOpen} className={classes.iconButton}>
        <Badge badgeContent={list.length} color="error">
          <HelpIcon />
        </Badge>
      </IconButton>

      <ProtocolModuleDialog open={open} onClose={toggleOpen} />
    </>
  )
}

export default Protocol
