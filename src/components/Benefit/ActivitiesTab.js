import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Box } from '@material-ui/core'
import { useToggle } from '../../hooks'
import { Button } from '../UI'
import CreateActivity from '../Benefits/CreateActivity'
import benefitsActions from '../../state/actions/benefits'
import ActivityTimeLine from './ActivityTimeline'

const ActivitiesTab = () => {
  const dispatch = useDispatch()
  const { benefitId } = useParams()
  const { open: openAdd, toggleOpen: toggleOpenAdd } = useToggle()

  const createActivity = (values) =>
    dispatch(
      benefitsActions.createActivity({
        ...values,
        benefitId,
        createdDate: new Date(),
        isActive: true
      })
    )

  return (
    <Box>
      <Box>
        <Button onClick={toggleOpenAdd}>Agregar</Button>
        <ActivityTimeLine />
      </Box>
      {openAdd && (
        <CreateActivity
          open={openAdd}
          onClose={toggleOpenAdd}
          submitFunction={createActivity}
        />
      )}
    </Box>
  )
}

export default ActivitiesTab
