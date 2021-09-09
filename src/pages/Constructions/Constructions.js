import { useEffect } from 'react'
import { ConstructionList } from '../../components/Constructions'
import { PollsDot } from '../../components/Polls'
import { PageHeading } from '../../components/UI'
import uiActions from '../../state/actions/ui'

const Constructions = () => {
  useEffect(() => {
    uiActions.setCurrentModule('OBRAS')
    console.log('CAMBIO DE MODULO: OBRAS')
  }, [])

  return (
    <div>
      <PageHeading>
        Obras <PollsDot module="OBRAS" />
      </PageHeading>
      <ConstructionList />
    </div>
  )
}

export default Constructions
