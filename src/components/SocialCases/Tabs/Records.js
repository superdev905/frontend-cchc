import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Box, Typography } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import assistanceActions from '../../../state/actions/assistance'
import { AssistanceList } from '../../Visit'
import useStyles from './styles'

const Record = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { socialCaseId } = useParams()
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(false)
  const [query] = useState({ page: 1, size: 30, socialCaseId })

  const fetchRecords = () => {
    setLoading(false)
    dispatch(assistanceActions.getAttention(query))
      .then((res) => {
        setLoading(false)
        setList(res)
      })
      .catch(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchRecords()
  }, [query])

  return (
    <Box>
      <Typography className={classes.title}>
        Registros de Intervención personal
      </Typography>
      <AssistanceList list={list} loading={loading} />
    </Box>
  )
}

export default Record
