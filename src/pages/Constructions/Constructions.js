import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { ConstructionList } from '../../components/Constructions'
import { PageHeading } from '../../components/UI'
import uiActions from '../../state/actions/ui'

const Constructions = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(uiActions.setCurrentModule('OBRAS'))
  }, [])

  return (
    <div>
      <PageHeading>Obras</PageHeading>
      <ConstructionList />
    </div>
  )
}

export default Constructions
