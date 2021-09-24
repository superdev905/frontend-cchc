import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Box, IconButton, makeStyles, Typography } from '@material-ui/core'
import {
  CalendarToday as CalendarIcon,
  ArrowBack as BackIcon
} from '@material-ui/icons'
import { Skeleton } from '@material-ui/lab'
import { PageHeading, Button, Wrapper } from '../../../components/UI'
import ApprovedCard from '../../../components/Scholarships/ApprovedCard'
import ApprovedList from '../../../components/Scholarships/ApprovedList'

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

const ApprovedDetails = () => {
  const history = useHistory()
  const classes = useStyles()
  const [loading] = useState(false)
  const { application } = useSelector((state) => state.scholarships)

  const goBack = () => {
    history.goBack()
  }

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
              {loading ? <Skeleton width="80%" /> : 'Beca aprobada'}{' '}
            </PageHeading>
            <Typography className={classes.createdTime}>
              <CalendarIcon className={classes.icon} />
              {!loading && `Creado ${application?.createdTimeStamp}`}
            </Typography>
          </Box>
        </Box>
        <Box>
          <Button>Ver Detalles</Button>
          <Button>Editar</Button>
        </Box>
      </Box>
      <ApprovedList />
      <ApprovedCard />
    </Wrapper>
  )
}
export default ApprovedDetails
