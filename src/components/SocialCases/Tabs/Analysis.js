import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { makeStyles, Box, Typography, Grid } from '@material-ui/core'
import { Wrapper, Button } from '../../UI'
import assistanceActions from '../../../state/actions/assistance'
import DerivationModal from '../Analysis/DerivationModal'

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  message: {
    fontSize: '19px',
    fontWeight: 'bold'
  }
}))

const Analysis = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const [assistance, setAssistance] = useState([])
  const { caseDetails } = useSelector((state) => state.socialCase)

  const openModal = () => {
    setOpen(true)
  }
  const closeModal = () => {
    setOpen(false)
  }

  useEffect(() => {
    dispatch(
      assistanceActions.getAttentionDetails(caseDetails.assistanceId)
    ).then((item) => {
      setAssistance([
        {
          id: item.id,
          employee_name: item.employee_name
        }
      ])
    })
  }, [])

  return (
    <Grid item xs={12}>
      {caseDetails ? (
        <Box>
          <Wrapper>
            <Box className={classes.root}>
              <Typography className={classes.message}>
                Este Caso No Tiene Derivación
              </Typography>
              <Button onClick={openModal}>Crear</Button>
            </Box>
          </Wrapper>
          <DerivationModal
            open={open}
            onClose={closeModal}
            assistance={assistance}
          />
        </Box>
      ) : null}
    </Grid>
  )
}

export default Analysis
