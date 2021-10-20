import { useSelector } from 'react-redux'
import { Box } from '@material-ui/core'
import RestrictionCard from '../Restriction/Cards'

const RestrictionsTab = () => {
  const { benefitDetails: benefit } = useSelector((state) => state.benefits)
  return (
    <Box>
      {benefit && (
        <>
          <RestrictionCard
            type="BUSINESS"
            restriction={benefit.businessRestriction}
          />
          <RestrictionCard
            type="GENERAL"
            restriction={benefit.generalRestriction}
          />
          <RestrictionCard
            type="COURSE"
            restriction={benefit.courseRestriction}
          />
        </>
      )}
    </Box>
  )
}

export default RestrictionsTab
