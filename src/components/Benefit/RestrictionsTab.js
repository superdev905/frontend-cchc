import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Box, Typography } from '@material-ui/core'
import RestrictionCard from '../Restriction/Cards'
import { useToggle } from '../../hooks'
import { RestrictionEdit } from '../Benefits'
import benefitsActions from '../../state/actions/benefits'
import { Button } from '../UI'
import RestrictionDialog from '../Benefits/Restrictions/AddDialog'

const RestrictionsTab = () => {
  const dispatch = useDispatch()
  const { benefitId } = useParams()
  const { benefitDetails: benefit } = useSelector((state) => state.benefits)
  const [currentType, setCurrentType] = useState('')
  const [currentRes, setCurrentRes] = useState(null)
  const { open: openEdit, toggleOpen: toggleOpenEdit } = useToggle()
  const { open: openAdd, toggleOpen: toggleOpenAdd } = useToggle()
  const fetchDetails = () => {
    dispatch(benefitsActions.getBenefitDetails(benefitId))
  }
  const updateRestriction = (values) =>
    dispatch(
      benefitsActions.updateRestriction(currentRes.id, currentType, values)
    )

  const onEditClick = (type, item) => {
    setCurrentType(type)
    setCurrentRes(item)
    toggleOpenEdit()
  }

  return (
    <Box>
      {benefit && (
        <>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography>Restricciones</Typography>
            <Button onClick={toggleOpenAdd}>Agregar</Button>
          </Box>
          {benefit.businessRestriction && (
            <RestrictionCard
              type="BUSINESS"
              restriction={benefit.businessRestriction}
              onEdit={() =>
                onEditClick('BUSINESS', benefit.businessRestriction)
              }
            />
          )}
          {benefit.generalRestriction && (
            <RestrictionCard
              type="GENERAL"
              restriction={benefit.generalRestriction}
              onEdit={() => onEditClick('GENERAL', benefit.generalRestriction)}
            />
          )}
          {benefit.courseRestriction && (
            <RestrictionCard
              type="COURSE"
              restriction={benefit.courseRestriction}
              onEdit={() => onEditClick('COURSE', benefit.courseRestriction)}
            />
          )}
          {benefit.scholarshipRestriction && (
            <RestrictionCard
              type="SCHOLARSHIP"
              restriction={benefit.scholarshipRestriction}
              onEdit={() =>
                onEditClick('SCHOLARSHIP', benefit.scholarshipRestriction)
              }
            />
          )}
          {currentRes && openEdit && (
            <RestrictionEdit
              open={openEdit}
              onClose={toggleOpenEdit}
              restriction={currentRes}
              type={currentType}
              submitFunction={updateRestriction}
              successFunction={fetchDetails}
            />
          )}
          {openAdd && benefit && (
            <RestrictionDialog
              benefit={benefit}
              currentStep={0}
              open={openAdd}
              onClose={toggleOpenAdd}
            />
          )}
        </>
      )}
    </Box>
  )
}

export default RestrictionsTab
