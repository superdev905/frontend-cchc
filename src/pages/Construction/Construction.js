import { useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Box, IconButton, Typography } from '@material-ui/core'
import { ArrowBack as ArrowBackIcon } from '@material-ui/icons/'
import constructionActions from '../../state/actions/constructions'
import { PageHeading, Wrapper } from '../../components/UI'
import { ConstructionContactsList } from '../../components/Constructions'

const Construction = ({ ...props }) => {
  const dispatch = useDispatch()
  const { idConstruction } = props.match.params
  const { construction } = useSelector((state) => state.constructions)
  const goBack = () => {
    props.history.goBack()
  }

  useEffect(() => {
    dispatch(constructionActions.getConstruction(idConstruction))
  }, [])
  return (
    <div>
      <Box display="flex" alignItems="center">
        <IconButton onClick={goBack}>
          <ArrowBackIcon />
        </IconButton>
        <PageHeading>{construction?.business_name}</PageHeading>
      </Box>
      <Wrapper>
        <Typography>Detalles</Typography>
      </Wrapper>
      <ConstructionContactsList />
    </div>
  )
}

export default withRouter(Construction)
