import { ConstructionList } from '../../components/Constructions'
import { PollsDot } from '../../components/Polls'
import { PageHeading } from '../../components/UI'

const Constructions = () => (
  <div>
    <PageHeading>
      Obras <PollsDot />
    </PageHeading>
    <ConstructionList />
  </div>
)

export default Constructions
