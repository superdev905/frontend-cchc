import { ConstructionList } from '../../components/Constructions'
import { ModuleIndicator } from '../../components/Shared'
import { PageHeading } from '../../components/UI'

const Constructions = () => (
  <div>
    <ModuleIndicator module={'OBRAS'} />
    <PageHeading>Obras</PageHeading>
    <ConstructionList />
  </div>
)

export default Constructions
