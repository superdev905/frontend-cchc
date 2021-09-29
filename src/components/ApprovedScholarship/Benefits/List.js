import { memo, useEffect, useState } from 'react'
import { Box, Typography } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { useSnackbar } from 'notistack'
import { useParams } from 'react-router-dom'
import { useSuccess, useToggle } from '../../../hooks'
import scholarshipsActions from '../../../state/actions/scholarships'
import approvedActions from '../../../state/actions/approvedScholarship'
import { Button } from '../../UI'
import BenefitCard from './Card'
import BenefitDialog from './Dialog'
import { ConfirmDelete } from '../../Shared'

const List = () => {
  const { idApproved } = useParams()
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()
  const [loading, setLoading] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [currentBenefit, setCurrentBenefit] = useState(null)
  const { open: openAdd, toggleOpen: toggleOpenAdd } = useToggle()
  const { open: openEdit, toggleOpen: toggleOpenEdit } = useToggle()
  const { open: openDelete, toggleOpen: toggleOpenDelete } = useToggle()
  const { success, changeSuccess } = useSuccess()
  const { benefitsList } = useSelector((state) => state.scholarships)

  const fetchBenefits = () => {
    setLoading(true)
    dispatch(scholarshipsActions.getBenefits({ approvedId: idApproved }))
      .then(() => {
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }

  const onCreateBenefit = (values) =>
    dispatch(
      scholarshipsActions.createBenefit({
        ...values,
        approvedScholarshipId: idApproved
      })
    )

  const onUpdateBenefit = (values) =>
    dispatch(
      approvedActions.updateBenefit(currentBenefit.id, {
        ...values,
        approvedScholarshipId: idApproved
      })
    )

  const onDeleteBenefit = (id) => {
    setDeleting(true)
    dispatch(
      approvedActions.patchBenefit(id, {
        state: 'DELETED'
      })
    )
      .then(() => {
        setDeleting(false)
        toggleOpenDelete()
        changeSuccess(false, () => {
          fetchBenefits()
          enqueueSnackbar('Beneficio elimindo', { variant: 'success' })
        })
      })
      .catch((err) => {
        changeSuccess(false)
        setDeleting(false)
        enqueueSnackbar(err, { variant: 'error' })
      })
  }

  useEffect(() => {
    fetchBenefits()
  }, [])

  return (
    <Box p={1}>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography style={{ fontWeight: 'bold', fontSize: '18px' }}>
          Beneficios
        </Typography>
        <Button onClick={toggleOpenAdd}>Nuevo beneficio</Button>
      </Box>
      <Box>
        {loading ? (
          <>
            <BenefitCard loader />
            <BenefitCard loader />
          </>
        ) : (
          <>
            {benefitsList.map((item) => (
              <BenefitCard
                key={`card-${item.id}`}
                benefit={item}
                onEdit={() => {
                  setCurrentBenefit(item)
                  toggleOpenEdit()
                }}
                onDelete={() => {
                  setCurrentBenefit(item)
                  toggleOpenDelete()
                }}
              />
            ))}
          </>
        )}
      </Box>
      {openAdd && (
        <BenefitDialog
          open={openAdd}
          onClose={toggleOpenAdd}
          submitFunction={onCreateBenefit}
          successFunction={fetchBenefits}
          successMessage={'Beneficio creado'}
        />
      )}
      {openEdit && currentBenefit && (
        <BenefitDialog
          type="UPDATE"
          open={openEdit}
          data={currentBenefit}
          onClose={toggleOpenEdit}
          submitFunction={onUpdateBenefit}
          successFunction={fetchBenefits}
          successMessage={'Beneficio actualizado'}
        />
      )}
      {openDelete && currentBenefit && (
        <ConfirmDelete
          open={openDelete}
          onConfirm={() => onDeleteBenefit(currentBenefit.id)}
          loading={deleting}
          success={success}
          message={
            <Typography variant="h6" align="center">
              ¿Estás seguro de eliminar este beneficio:{' '}
              <strong>{currentBenefit.name}</strong>?
            </Typography>
          }
          onClose={toggleOpenDelete}
        />
      )}
    </Box>
  )
}

export default memo(List)
