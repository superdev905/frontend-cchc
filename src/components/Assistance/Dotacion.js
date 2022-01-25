import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  FaUserLock as CompanyIcon,
  FaUserCog as WorkerIcon
} from 'react-icons/fa'
import { Box, Grid, makeStyles, Typography } from '@material-ui/core'
import { Button, DataCard, Wrapper } from '../UI'
import { useToggle } from '../../hooks'
import WorkerDialog from '../Visit/WorkerDialog'
import assistanceActions from '../../state/actions/assistance'

const useStyles = makeStyles(() => ({
  dataTitle: {
    fontSize: 15,
    opacity: 0.8,
    marginBottom: 5
  }
}))

const Dotacion = ({ fetchDetails }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { open: openWorkerDialog, toggleOpen: toggleOpenWorkerDialog } =
    useToggle()
  const { visit } = useSelector((state) => state.assistance)
  const setVisitWorkers = (values) =>
    dispatch(assistanceActions.setWorkersQuantity(visit.id, values))

  return (
    <Wrapper>
      <Box>
        <Grid item xs={12} md={6}>
          <Box>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography
                style={{
                  fontSize: '18px',
                  fontWeight: 'bold',
                  marginBottom: '10px'
                }}
              >
                Dotación
              </Typography>
              <Button
                size="small"
                disabled={visit?.is_close}
                onClick={toggleOpenWorkerDialog}
              >
                Actualizar
              </Button>
            </Box>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <Typography className={classes.dataTitle}>
                  Trabajadores de casa:
                </Typography>
                <DataCard
                  icon={<CompanyIcon />}
                  data={visit?.company_workers || 0}
                  color="primary"
                />
              </Grid>
              <Grid item xs={6}>
                <Typography className={classes.dataTitle}>
                  Trabajadores de subcontrato:
                </Typography>
                <DataCard
                  icon={<WorkerIcon />}
                  data={visit?.outsourced_workers || 0}
                  color="purple"
                />
              </Grid>
            </Grid>
          </Box>
        </Grid>
        {openWorkerDialog && visit && (
          <WorkerDialog
            open={openWorkerDialog}
            onClose={toggleOpenWorkerDialog}
            data={{
              company_workers: visit?.company_workers || 0,
              outsourced_workers: visit?.outsourced_workers || 0
            }}
            submitFunction={setVisitWorkers}
            successFunction={fetchDetails}
          />
        )}
      </Box>
    </Wrapper>
  )
}

Dotacion.propTypes = {}

export default Dotacion
