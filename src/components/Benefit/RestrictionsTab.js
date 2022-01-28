import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Box, Typography } from '@material-ui/core'
import { useSnackbar } from 'notistack'
import RestrictionCard from '../Restriction/Cards'
import { useSuccess, useToggle } from '../../hooks'
import { RestrictionEdit } from '../Benefits'
import benefitsActions from '../../state/actions/benefits'
import { Button } from '../UI'
import RestrictionDialog from '../Benefits/Restrictions/AddDialog'
import { ConfirmDelete } from '../Shared'

const RestrictionsTab = () => {
  const dispatch = useDispatch()
  const { benefitId } = useParams()
  const { enqueueSnackbar } = useSnackbar()
  const { benefitDetails: benefit } = useSelector((state) => state.benefits)
  const [currentType, setCurrentType] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [currentRes, setCurrentRes] = useState(null)
  const { success, changeSuccess } = useSuccess()
  const { open: openEdit, toggleOpen: toggleOpenEdit } = useToggle()
  const { open: openAdd, toggleOpen: toggleOpenAdd } = useToggle()
  const { open: openDelete, toggleOpen: toggleOpenDelete } = useToggle()
  const fetchDetails = () => {
    dispatch(benefitsActions.getBenefitDetails(benefitId))
  }
  const updateRestriction = (values) =>
    dispatch(
      benefitsActions.updateRestriction(currentRes.id, currentType, values)
    )

  const handleDelete = (id, type) => {
    setSubmitting(true)
    dispatch(benefitsActions.deleteRestriction(benefit.id, id, type))
      .then(() => {
        setSubmitting(false)

        changeSuccess(true, () => {
          fetchDetails()
          toggleOpenDelete()
          enqueueSnackbar('Restricción eliminada!', { variant: 'success' })
        })
      })
      .catch((err) => {
        setSubmitting(false)
        enqueueSnackbar(err, { variant: 'error' })
      })
  }

  const onEditClick = (type, item) => {
    setCurrentType(type)
    setCurrentRes(item)
    toggleOpenEdit()
  }

  const onDeleteClick = (type, item) => {
    setCurrentType(type)
    setCurrentRes(item)
    toggleOpenDelete()
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
              onDelete={() =>
                onDeleteClick('BUSINESS', benefit.businessRestriction)
              }
              restriction={benefit.businessRestriction}
              onEdit={() =>
                onEditClick('BUSINESS', benefit.businessRestriction)
              }
            />
          )}
          {benefit.generalRestriction && (
            <RestrictionCard
              type="GENERAL"
              onDelete={() =>
                onDeleteClick('GENERAL', benefit.generalRestriction)
              }
              restriction={benefit.generalRestriction}
              onEdit={() => onEditClick('GENERAL', benefit.generalRestriction)}
            />
          )}
          {benefit.courseRestriction && (
            <RestrictionCard
              type="COURSE"
              onDelete={() =>
                onDeleteClick('COURSE', benefit.generalRestriction)
              }
              restriction={benefit.courseRestriction}
              onEdit={() => onEditClick('COURSE', benefit.courseRestriction)}
            />
          )}
          {benefit.scholarshipRestriction && (
            <RestrictionCard
              type="SCHOLARSHIP"
              onDelete={() =>
                onDeleteClick('SCHOLARSHIP', benefit.scholarshipRestriction)
              }
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
          {currentRes && openDelete && (
            <ConfirmDelete
              open={openDelete}
              onClose={toggleOpenDelete}
              onConfirm={() => handleDelete(currentRes.id, currentType)}
              loading={submitting}
              success={success}
              message={
                <Typography variant="h6">
                  ¿Estás seguro de eliminar esta restricción?
                </Typography>
              }
            />
          )}
        </>
      )}
    </Box>
  )
}

export default RestrictionsTab
