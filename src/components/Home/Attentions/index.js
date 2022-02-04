import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Grid, Typography } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import homeActions from '../../../state/actions/home'
import { EmptyState, Wrapper } from '../../UI'
import useStyles from '../style'
import AttentionCard from './Card'
import { AssistanceDetailsModal } from '../../Assistance'
import { useToggle } from '../../../hooks'

const LastAttentions = () => {
  const history = useHistory()
  const classes = useStyles()
  const dispatch = useDispatch()
  const [currentId, setCurrentId] = useState('')
  const [loading, setLoading] = useState(false)
  const { lastAttentions } = useSelector((state) => state.home)
  const { open, toggleOpen } = useToggle()

  const getLastAttentions = () => {
    setLoading(true)
    dispatch(homeActions.getLastAttentions())
      .then(() => {
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    getLastAttentions()
  }, [])

  console.log(currentId)

  return (
    <Wrapper>
      <Typography className={classes.title}>Ultimas atenciones</Typography>
      {loading}
      <Grid container spacing={2}>
        {loading ? (
          <>
            {[...Array.from(Array(3).keys())].map((__, index) => (
              <Grid key={`loader-card-${index}`} item xs={12}>
                <AttentionCard.Loader />
              </Grid>
            ))}
          </>
        ) : (
          <>
            {lastAttentions.length === 0 ? (
              <Grid item xs={12}>
                <EmptyState
                  message="No tienes ultimas atenciones"
                  bgWhite
                  actionMessage="Ver visitas"
                  event={() => {
                    history.push('/visits')
                  }}
                />
              </Grid>
            ) : (
              <>
                {lastAttentions.map((item) => (
                  <Grid key={`attention-card-${item.id}`} item xs={12}>
                    <AttentionCard
                      attention={item}
                      onClick={() => {
                        setCurrentId(item.id)
                        toggleOpen()
                      }}
                    />
                  </Grid>
                ))}
              </>
            )}
          </>
        )}
      </Grid>
      {currentId && open && (
        <AssistanceDetailsModal
          open={open}
          onClose={toggleOpen}
          assistanceId={currentId}
        />
      )}
    </Wrapper>
  )
}

export default LastAttentions
