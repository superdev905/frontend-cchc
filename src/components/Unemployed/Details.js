import { useSelector, useDispatch } from 'react-redux'
import { Box, Typography, Grid, makeStyles } from '@material-ui/core'
import files from '../../state/actions/files'
import { formatDate } from '../../formatters'
import { LabeledRow, Text } from '../UI'
import { FileThumbnail, FileVisor } from '../Shared'
import PaymentsList from './Payment/List'
import { UserCard } from '../Users'
import { useToggle } from '../../hooks'
import BenefitsList from './BenefitsList'

const useStyles = makeStyles((theme) => ({
  heading: {
    fontSize: '17px',
    fontWeight: 'bold',
    marginBottom: '10px'
  },
  boxList: {
    background: 'rgb(245, 246, 248)',
    overflowY: 'scroll',
    height: '200px'
  },
  bgGray: {
    backgroundColor: theme.palette.gray.gray100,
    borderRadius: theme.spacing(1)
  }
}))

const Details = ({ loading }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { unemployed } = useSelector((state) => state.unemployed)
  const { open, toggleOpen } = useToggle()

  return (
    <Box px={1}>
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Box>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography style={{ fontSize: '19px', fontWeight: 'bold' }}>
                  Información de cesantes
                </Typography>
              </Box>
              <LabeledRow label={'Run'}>
                <Text loading={loading}>{unemployed?.employee?.run}</Text>
              </LabeledRow>
              <LabeledRow label={'Nombres'}>
                <Text loading={loading}>{unemployed?.employee?.names}</Text>
              </LabeledRow>
              <LabeledRow label={'Apellido paterno'}>
                <Text loading={loading}>
                  {unemployed?.employee?.paternalSurname}
                </Text>
              </LabeledRow>
              <LabeledRow label={'Apellido materno'}>
                <Text loading={loading}>
                  {unemployed?.employee?.maternalSurname}
                </Text>
              </LabeledRow>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box className={classes.bgGray} p={2}>
              <LabeledRow label={'Fecha de Registro'}>
                <Text loading={loading}>{formatDate(unemployed?.date)}</Text>
              </LabeledRow>
              <LabeledRow label={'Oficina'}>
                <Text loading={loading}>{unemployed?.office}</Text>
              </LabeledRow>
              <LabeledRow label={'Periodo'}>
                <Text loading={loading}>{unemployed?.period}</Text>
              </LabeledRow>
              <Box mt={2}>
                <Typography className={classes.heading}>Finiquito</Typography>
                {unemployed?.dismissalFile && (
                  <FileThumbnail
                    bgWhite
                    fileName={unemployed?.dismissalFile?.fileName}
                    date={formatDate(unemployed?.dismissalFile?.uploadDate)}
                    fileSize={unemployed?.dismissalFile?.fileSize}
                    onView={toggleOpen}
                    onDownload={() => {
                      dispatch(
                        files.downloadFile(
                          unemployed?.dismissalFile?.fileUrl,
                          unemployed?.dismissalFile?.fileName
                        )
                      )
                    }}
                  />
                )}
                {open && unemployed.dismissalFile && (
                  <FileVisor
                    open={open}
                    onClose={toggleOpen}
                    src={unemployed.dismissalFile.fileUrl}
                    filename={unemployed.dismissalFile.fileName}
                  />
                )}
              </Box>
              <Box mt={2}>
                <Typography className={classes.heading}>
                  Asistente Social
                </Typography>
                {unemployed?.assistance && (
                  <UserCard user={unemployed.assistance} />
                )}
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Box mt={2}>
          <BenefitsList benefits={unemployed?.benefits} />
        </Box>

        <Box mt={2}>
          <PaymentsList />
        </Box>
      </Box>
    </Box>
  )
}

export default Details
