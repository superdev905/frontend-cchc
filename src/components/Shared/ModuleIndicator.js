import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import uiActions from '../../state/actions/ui'

const ModuleIndicator = ({ module }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(uiActions.setCurrentModule(module))
  }, [])

  return <></>
}

export default ModuleIndicator
