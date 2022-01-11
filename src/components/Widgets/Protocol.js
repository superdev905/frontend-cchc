import { useEffect } from 'react'
import { FiHelpCircle as HelpIcon } from 'react-icons/fi'
import { IconButton } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { ProtocolModuleDialog } from '../Protocols'
import { useToggle } from '../../hooks'

const Protocol = () => {
  const { module } = useSelector((state) => state.ui)

  const { open, toggleOpen } = useToggle()

  const getProtocolsByModule = () => {}
  useEffect(() => {
    getProtocolsByModule()
  }, [module])

  return (
    <>
      <IconButton onClick={toggleOpen}>
        <HelpIcon />
      </IconButton>

      <ProtocolModuleDialog open={open} onClose={toggleOpen} />
    </>
  )
}

export default Protocol
