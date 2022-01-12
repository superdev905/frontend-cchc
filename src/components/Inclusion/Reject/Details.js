import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Grid, makeStyles, Typography } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import inclusionActions from '../../../state/actions/inclusion'
import { UserCard } from '../../Users'
import { LabeledRow, Text } from '../../UI'
import { formatDate } from '../../../formatters'

const useStyles = makeStyles(() => ({
  label: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 5
  }
}))

const Details = ({ caseNumber }) => {
  const classes = useStyles()
  const [loading, setLoading] = useState(false)
  const { rejection } = useSelector((state) => state.inclusion)
  const dispatch = useDispatch()

  const fetchDetails = () => {
    setLoading(true)
    dispatch(inclusionActions.getRejectionDetails(caseNumber)).then(() => {
      setLoading(false)
    })
  }
  useEffect(() => {
    fetchDetails()
  }, [])
  return (
    <Box>
      {loading ? (
        <>
          <Skeleton></Skeleton>
          <Skeleton></Skeleton>
          <Skeleton></Skeleton>
        </>
      ) : (
        <Box>
          {rejection && (
            <>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Box>
                    <LabeledRow label={'Fecha: '}>
                      <Text loading={loading}>
                        {formatDate(rejection.date)}
                      </Text>
                    </LabeledRow>
                    <LabeledRow label={'Comentarios: '}>
                      <Text loading={loading}>{rejection.comments}</Text>
                    </LabeledRow>
                  </Box>
                </Grid>

                <Grid item xs={12}>
                  <Typography className={classes.label}>
                    Analista de casos
                  </Typography>

                  <UserCard user={rejection.analyst} />
                </Grid>
              </Grid>
            </>
          )}
        </Box>
      )}
    </Box>
  )
}

export default Details
