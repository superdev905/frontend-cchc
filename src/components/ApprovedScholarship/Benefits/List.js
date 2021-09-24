import { memo, useEffect, useState } from 'react'
import { Box, Typography } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useToggle } from '../../../hooks'
import scholarshipsActions from '../../../state/actions/scholarships'
import { Button } from '../../UI'
import BenefitCard from './Card'
import BenefitDialog from './Dialog'

const List = () => {
  const { idApproved } = useParams()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const { open: openAdd, toggleOpen: toggleOpenAdd } = useToggle()
  const { benefitsList } = useSelector((state) => state.scholarships)

  const onCreateBenefit = (values) =>
    dispatch(
      scholarshipsActions.createBenefit({
        ...values,
        approvedScholarshipId: idApproved
      })
    )
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

  useEffect(() => {
    fetchBenefits()
  }, [])

  return (
    <Box p={1}>
      <Box display="flex" justifyContent="space-between">
        <Typography>Beneficios</Typography>
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
              <BenefitCard key={`card-${item.id}`} benefit={item} />
            ))}
          </>
        )}
      </Box>
      <BenefitDialog
        open={openAdd}
        onClose={toggleOpenAdd}
        submitFunction={onCreateBenefit}
        successFunction={() => {}}
        successMessage={'Beneficio creado'}
      />
    </Box>
  )
}

export default memo(List)
