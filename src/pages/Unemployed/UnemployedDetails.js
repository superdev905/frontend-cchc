import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Wrapper } from '../../components/UI'
import unemployedActions from '../../state/actions/unemployed'
import Details from '../../components/Unemployed/Details'
import { HeadingWithButton } from '../../components/Shared'

const UnemployedDetails = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const { idUnemployed } = useParams()
  const { unemployed } = useSelector((state) => state.unemployed)

  useEffect(() => {
    setLoading(true)
    dispatch(unemployedActions.getUnemployedById(idUnemployed)).then(() => {
      setLoading(false)
    })
  }, [])

  return (
    <Wrapper>
      <HeadingWithButton
        loading={loading}
        title={`CESANTE: ${unemployed?.employee?.names} 
              ${unemployed?.employee?.paternalSurname} 
              ${unemployed?.employee?.maternalSurname || ''}`}
      />
      <Details loading={loading} />
    </Wrapper>
  )
}

export default UnemployedDetails
