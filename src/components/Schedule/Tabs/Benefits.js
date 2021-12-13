import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Box, Typography } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import scheduleActions from '../../../state/actions/schedule'
import { useSuccess, useToggle } from '../../../hooks'
import { Button } from '../../UI'
import { ConfirmDelete, DataTable } from '../../Shared'
import ScheduleBenefitDrawer from '../BenefitDrawer'
import useStyles from './styles'

const Meetings = () => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const { scheduleId } = useParams()
  const [loading, setLoading] = useState(false)
  const [updating, setUpdating] = useState(false)
  const [currentBenefit, setCurrentBenefit] = useState(null)
  const [query, setQuery] = useState({ scheduleId, page: 1, size: 30 })
  const [targetMonths, setTargetMonths] = useState(null)
  const { open: openBenefitEdit, toggleOpen: toggleOpenBenefitEdit } =
    useToggle()
  const { open: openDelete, toggleOpen: toggleOpenDelete } = useToggle()
  const { benefits } = useSelector((state) => state.schedule)
  const { success } = useSuccess()

  const handleScheduleEdit = () => {
    setUpdating(true)
    dispatch(
      scheduleActions.updateProgrammedBenefit(currentBenefit.id, {
        ...currentBenefit,
        ...targetMonths
      })
    )
      .then(() => {
        setUpdating(false)
        toggleOpenDelete()
      })
      .catch(() => {
        setUpdating(false)
      })
  }

  const fetchBenefits = () => {
    setLoading(true)
    dispatch(scheduleActions.getBenefits(query)).then(() => {
      setLoading(false)
    })
  }

  useEffect(() => {
    fetchBenefits()
  }, [query])

  return (
    <Box>
      <Box mb={1}>
        <Typography className={classes.subHeading}>
          Programacion de beneficios
        </Typography>
      </Box>
      <DataTable
        emptyMessage={'Esta empresa no tiene beneficios'}
        data={benefits}
        progressPending={loading}
        columns={[
          {
            name: 'Nombre de beneficio',
            selector: (row) => row.benefitName.toUpperCase()
          },
          {
            name: 'Mes de inicio - Mes de fin',
            selector: (row) => `${row.startMonth} - ${row.endMonth}`
          },
          {
            name: '',
            right: true,
            selector: (row) => (
              <Box display="flex" alignItems="center">
                <Button
                  size="small"
                  onClick={() => {
                    setCurrentBenefit(row)
                    toggleOpenBenefitEdit()
                  }}
                >
                  Editar
                </Button>
              </Box>
            )
          }
        ]}
        pagination
        paginationServer={true}
        paginationRowsPerPageOptions={[30, 40]}
        paginationPerPage={query.size}
        onChangeRowsPerPage={(limit) => {
          setQuery({ ...query, size: limit })
        }}
        onChangePage={(page) => {
          setQuery({ ...query, page })
        }}
      />
      {openBenefitEdit && currentBenefit && (
        <ScheduleBenefitDrawer
          type="UPDATE"
          data={{
            startMonth: currentBenefit.startMonth,
            endMonth: currentBenefit.endMonth
          }}
          benefit={currentBenefit}
          open={openBenefitEdit}
          onClose={toggleOpenBenefitEdit}
          onSubmit={(__, values) => {
            setTargetMonths(values)
            toggleOpenDelete()
          }}
        />
      )}
      {currentBenefit && openDelete && (
        <ConfirmDelete
          event="CONFIRM"
          confirmText="Actualizar"
          open={openDelete}
          onClose={toggleOpenDelete}
          loading={updating}
          success={success}
          onConfirm={handleScheduleEdit}
          message={
            <Box>
              <Typography align="center" variant="h6">
                ¿Estás seguro de modificar la programacion de este beneficio?
              </Typography>
            </Box>
          }
        />
      )}
    </Box>
  )
}
export default Meetings
