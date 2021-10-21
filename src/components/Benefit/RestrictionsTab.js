import { useSelector } from 'react-redux'
import { Box } from '@material-ui/core'
import RestrictionCard from '../Restriction/Cards'

const RestrictionsTab = () => {
  const { benefitDetails: benefit } = useSelector((state) => state.benefits)
  return (
    <Box>
      {benefit && (
        <>
          {benefit.businessRestriction && (
            <RestrictionCard
              type="BUSINESS"
              restriction={benefit.businessRestriction}
            />
          )}
          {benefit.generalRestriction && (
            <RestrictionCard
              type="GENERAL"
              restriction={benefit.generalRestriction}
            />
          )}
          {benefit.courseRestriction && (
            <RestrictionCard
              type="COURSE"
              restriction={benefit.courseRestriction}
            />
          )}
          {benefit.scholarshipRestriction && (
            <RestrictionCard
              type="SCHOLARSHIP"
              restriction={benefit.scholarshipRestriction}
            />
          )}
        </>
      )}
    </Box>
  )
}

export default RestrictionsTab
