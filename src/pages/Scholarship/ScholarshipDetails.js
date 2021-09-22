import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import { Box, IconButton, makeStyles, Typography } from '@material-ui/core'
import {
  CalendarToday as CalendarIcon,
  ArrowBack as BackIcon
} from '@material-ui/icons'
import { Skeleton } from '@material-ui/lab'
import { PageHeading, Button, Wrapper } from '../../components/UI'
import scholarshipsActions from '../../state/actions/scholarships'
import PostulationDetails from '../../components/Scholarships/PostulationDetails'

const useStyles = makeStyles((theme) => ({
  head: {
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      justifyContent: 'space-between'
    }
  },
  title: {
    color: theme.palette.common.black
  },
  createdTime: {
    fontSize: 14,
    display: 'flex',
    alignItems: 'center'
  },
  icon: {
    color: theme.palette.gray.gray600,
    marginRight: 5
  }
}))

const ScholarshipDetails = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const classes = useStyles()
  const { idPostulation } = useParams()
  const { application } = useSelector((state) => state.scholarships)
  const [loading, setLoading] = useState(false)

  const goBack = () => {
    history.goBack()
  }

  const fetchData = () => {
    setLoading(true)
    dispatch(scholarshipsActions.getPostulationDetails(idPostulation)).then(
      () => {
        setLoading(false)
      }
    )
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <Wrapper p={1}>
      <Box className={classes.head}>
        <Box display="flex">
          <Box>
            <IconButton onClick={goBack}>
              <BackIcon />
            </IconButton>
          </Box>
          <Box>
            <PageHeading className={classes.title}>
              {loading ? <Skeleton width="80%" /> : 'Postulacion'}{' '}
            </PageHeading>
            <Typography className={classes.createdTime}>
              <CalendarIcon className={classes.icon} />
              {!loading && `Creado ${application?.createdTimeStamp}`}
            </Typography>
          </Box>
        </Box>
        <Box>
          <Button>Editar</Button>
          <Button>Aprobar</Button>
        </Box>
      </Box>
      <PostulationDetails fetching={loading} />
    </Wrapper>
  )
}
export default ScholarshipDetails
