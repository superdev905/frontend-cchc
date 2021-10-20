import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { Box, Typography } from '@material-ui/core'
import { ConfirmDelete, HeadingWithButton } from '../../components/Shared'
import benefitsActions from '../../state/actions/benefits'
import { Button, Wrapper } from '../../components/UI'
import { useSuccess, useToggle } from '../../hooks'
import { BenefitDetails, BenefitTabs } from '../../components/Benefit'

const Benefits = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { benefitId } = useParams()
  const [loading, setLoading] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const { benefitDetails: benefit } = useSelector((state) => state.benefits)
  const { open: openDelete, toggleOpen: toggleOpenDelete } = useToggle()
  const { success, changeSuccess } = useSuccess()

  const goBack = () => {
    history.push('/benefits')
  }
  const fetchDetails = () => {
    setLoading(true)
    dispatch(benefitsActions.getBenefitDetails(benefitId)).then(() => {
      setLoading(false)
    })
  }

  const deleteBenefit = () => {
    setDeleting(true)
    dispatch(benefitsActions.deleteBenefit(benefitId))
      .then(() => {
        setDeleting(false)
        changeSuccess(true, () => {
          fetchDetails()
          toggleOpenDelete()
        })
      })
      .catch(() => {
        setDeleting(false)
      })
  }

  useEffect(() => {
    fetchDetails()
  }, [])

  return (
    <Wrapper>
      <Box display={'flex'} justifyContent={'space-between'}>
        <HeadingWithButton
          goBack={goBack}
          title={benefit && `${benefit.code} - ${benefit.name}`}
          timeAgo={benefit && benefit.timeAgo}
          loading={loading}
        />
        <Box>
          <Button
            danger
            disabled={benefit?.state === 'DELETED'}
            onClick={toggleOpenDelete}
          >
            Eliminar
          </Button>
          <Button disabled={benefit?.state === 'DELETED'}>Editar</Button>
        </Box>
      </Box>
      <BenefitDetails loading={loading} />
      <BenefitTabs />
      {benefit && openDelete && (
        <ConfirmDelete
          open={openDelete}
          onClose={toggleOpenDelete}
          onConfirm={() => deleteBenefit(benefit.id)}
          message={
            <Typography variant="h6">
              ¿Estás seguro de eliminar este beneficio: {`${benefit.name}`}?
            </Typography>
          }
          loading={deleting}
          success={success}
        />
      )}
    </Wrapper>
  )
}

export default Benefits
