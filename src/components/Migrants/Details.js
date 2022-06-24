import { useEffect, useState } from 'react'
import { FiArrowLeft as ArrowBack, FiCheck as DoneIcon } from 'react-icons/fi'
import {
  Box,
  Drawer,
  IconButton,
  makeStyles,
  Typography
} from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import migrants from '../../state/actions/migrants'
import { ActionsTable, Button, InputLabel, LabeledRow, Text } from '../UI'
import { formatDate } from '../../formatters'
import UserCard from '../Users/Card'
import { DataTable } from '../Shared'
import { useToggle } from '../../hooks'
import BenefitDialog from './BenefitDialog'
import AssistanceDialog from '../Assistance/Dialog'
import assistanceActions from '../../state/actions/assistance'
import AttentionDetails from './AttentionList'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '80%'
    },
    [theme.breakpoints.up('lg')]: {
      width: 800
    }
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  heading: {
    fontSize: '17px',
    fontWeight: 'bold',
    marginTop: '10px'
  }
}))

const DetailsDrawer = ({ open, onClose, migrantId }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { isMobile } = useSelector((state) => state.ui)
  const { migrant } = useSelector((state) => state.migrants)
  const [loading, setLoading] = useState(false)
  const { open: openEdit, toggleOpen: toggleOpenEdit } = useToggle()
  const { open: openAttention, toggleOpen: toggleOpenAttention } = useToggle()
  const [benefit, setBenefit] = useState(null)
  const [attentions, setAttentions] = useState()

  const createAttention = (values) =>
    dispatch(
      assistanceActions.createAssistance({
        ...values,
        employee_id: migrant.employee.id,
        employee_name: migrant.employee.names,
        employee_lastname: `${migrant.employee.paternalSurname}`,
        employee_rut: migrant.employee.run
      })
    )

  const fetchData = () => {
    setLoading(true)
    dispatch(migrants.getMigrantDetails(migrantId)).then(() => {
      dispatch(
        assistanceActions.getAttention({ id_employee: migrant.employeeId })
      ).then((result) => {
        setAttentions(result)
        setLoading(false)
      })
    })
  }

  useEffect(() => {
    if (open) {
      fetchData()
    }
  }, [open])
  return (
    <Drawer
      classes={{ paper: classes.root }}
      anchor="right"
      fullScreen={isMobile}
      open={open}
      onClose={onClose}
    >
      <Box px={3} py={4}>
        <Box display="flex" alignItems="center">
          <IconButton onClick={onClose}>
            <ArrowBack />
          </IconButton>
          <Text loading={loading} className={classes.title}>
            {`${migrant?.employee?.names} ${migrant?.employee?.paternalSurname}`}
          </Text>
        </Box>
        <Box my={2}>
          <LabeledRow loaderWidth="5%" label={'Periodo'}>
            <Text loading={loading}>{migrant?.period} </Text>
          </LabeledRow>
          <LabeledRow loaderWidth="65%" label={'Ingreso a Chile'}>
            <Text loading={loading}>{formatDate(migrant?.entryDate)} </Text>
          </LabeledRow>
          <LabeledRow loaderWidth="65%" label={'Fecha de registro'}>
            <Text loading={loading}>{formatDate(migrant?.createdDate)} </Text>
          </LabeledRow>
        </Box>
        <Box my={1}>
          <Typography className={classes.heading}>
            Datos del Trabajador
          </Typography>
          <LabeledRow label={'Run'}>
            <Text loaderWidth="25%" loading={loading}>
              {migrant?.employee?.run}{' '}
            </Text>
          </LabeledRow>
          <LabeledRow label={'Nombres'}>
            <Text loaderWidth="30%" loading={loading}>
              {migrant?.employee?.names}
            </Text>
          </LabeledRow>
          <LabeledRow label={'Apellido paterno'}>
            <Text loaderWidth="60%" loading={loading}>
              {migrant?.employee?.paternalSurname}
            </Text>
          </LabeledRow>
          <LabeledRow label={'Apellido materno'}>
            <Text loaderWidth="60%" loading={loading}>
              {migrant?.employee?.maternalSurname || '---'}
            </Text>
          </LabeledRow>
          <LabeledRow label={'Sexo'}>
            <Text loaderWidth="10%" loading={loading}>
              {migrant?.employee?.gender || '---'}
            </Text>
          </LabeledRow>
        </Box>
        <Box mt={1}>
          <Typography className={classes.heading}>Beneficios</Typography>
          <DataTable
            data={migrant?.benefits}
            columns={[
              {
                name: 'Fecha',
                selector: (row) => (
                  <Box>
                    {row.benefit.name.includes('ATENCIÓN SOCIAL') &&
                    !row.isCompleted ? (
                      <Button
                        onClick={() => {
                          setBenefit(row)
                          toggleOpenAttention()
                        }}
                        size={'small'}
                      >
                        Atender
                      </Button>
                    ) : (
                      <>{row.date ? formatDate(row.date) : 'Sin fecha'}</>
                    )}
                  </Box>
                )
              },
              {
                name: 'Tipo beneficio',
                selector: (row) => row.benefit.name
              },
              {
                name: '',
                right: true,
                maxWidth: '50px',
                selector: (row) => (
                  <>
                    {row.isCompleted ? (
                      <DoneIcon fontSize={'24px'} color="green" />
                    ) : (
                      <>
                        {!row.benefit.name.includes('ATENCIÓN SOCIAL') && (
                          <ActionsTable
                            onEdit={() => {
                              setBenefit(row)
                              toggleOpenEdit()
                            }}
                          />
                        )}
                      </>
                    )}
                  </>
                )
              }
            ]}
          />
        </Box>
        <Box mt={2}>
          <AttentionDetails
            createAttention={createAttention}
            attentions={attentions}
          />
        </Box>
        {openEdit && benefit && (
          <BenefitDialog
            migrantId={migrant.id}
            open={openEdit}
            onClose={toggleOpenEdit}
            benefit={benefit}
          />
        )}
        <Box mt={3}>
          <InputLabel>Registrado por: </InputLabel>
          {!loading && migrant?.author && <UserCard user={migrant.author} />}
        </Box>

        <Box textAlign="right" my={2}>
          <Button onClick={onClose}>Aceptar</Button>
        </Box>
        {openAttention && (
          <AssistanceDialog
            sourceSystem={'MIGRANTES'}
            onClose={toggleOpenAttention}
            open={openAttention}
            employee={migrant?.employee}
            visitShift={''}
            submitFunction={createAttention}
            company={{ business_name: '' }}
            construction={{ name: '' }}
            successFunction={() => {
              dispatch(
                migrants.updateDeliveredBenefit(benefit.id, {
                  date: new Date().toISOString(),
                  isCompleted: true
                })
              ).then(() => {
                fetchData()
              })
            }}
            successMessage="Atención creada con éxito"
          />
        )}
      </Box>
    </Drawer>
  )
}

export default DetailsDrawer
