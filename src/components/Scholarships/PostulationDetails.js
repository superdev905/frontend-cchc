import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Box, Grid, Typography, makeStyles } from '@material-ui/core'
import { LabeledRow, Text, Wrapper } from '../UI'
import { formatDate } from '../../formatters'
import { useToggle } from '../../hooks'
import { FileThumbnail, FileVisor } from '../Shared'

import scholarshipsActions from '../../state/actions/scholarships'

const useStyles = makeStyles((theme) => ({
  head: {
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      justifyContent: 'space-between'
    }
  },
  title: {
    color: theme.palette.common.black,
    marginBottom: '15px',
    marginTop: '5px'
  },
  info: {
    marginLeft: '150px'
  },
  files: {
    backgroundColor: theme.palette.gray.gray100
  }
}))

const PostulationDetails = ({ loading }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { application } = useSelector((state) => state.scholarships)
  const { open: openVisor, toggleOpen: toggleOpenVisor } = useToggle()

  const getPostulationDetails = (id) => {
    dispatch(scholarshipsActions.getPostulationDetails(id))
  }

  useEffect(() => {
    getPostulationDetails()
  }, [])

  return (
    <Box p={2} className={classes.head}>
      <Grid
        container
        spacing={2}
        item
        xs={7}
        md={7}
        lg={7}
        className={classes.aaa}
      >
        <Box>
          <Box p={2}>
            <Grid item xs={12} md={12}>
              <LabeledRow label="Fecha:">
                <Text loading={loading}>
                  {application ? formatDate(application.date) : ''}
                </Text>
              </LabeledRow>
            </Grid>
            <Grid item xs={12} md={12}>
              <LabeledRow label="Beca">
                <Text loading={loading}>
                  {' '}
                  {application?.scholarshipType.name}
                </Text>
              </LabeledRow>
            </Grid>
          </Box>
          <Grid xs={12} md={12} lg={12}>
            <Typography variant="h6" className={classes.title}>
              Trabajador
            </Typography>
            <Grid item xs={12} md={12}>
              <Text className={classes.info} loading={loading}>
                {' '}
                {application?.employeeRut}
              </Text>
              <Text className={classes.info} loading={loading}>
                {' '}
                {application?.employeeNames}
              </Text>
            </Grid>
          </Grid>
          <Grid xs={12} md={12} lg={12}>
            <Typography variant="h6" className={classes.title}>
              Empresa
            </Typography>
            <Grid item xs={12} md={12}>
              <Text className={classes.info} loading={loading}>
                {' '}
                {application?.businessRut}
              </Text>
              <Text className={classes.info} loading={loading}>
                {' '}
                {application?.businessName}
              </Text>
            </Grid>
          </Grid>
          <Grid xs={12} md={12} lg={12}>
            <Typography variant="h6" className={classes.title}>
              Beneficiario
            </Typography>
            <Grid item xs={12} md={12}>
              <Text className={classes.info} loading={loading}>
                {' '}
                {application?.beneficiaryRut}
              </Text>
              <Text className={classes.info} s loading={loading}>
                {' '}
                {application?.beneficiaryNames}
              </Text>
            </Grid>
          </Grid>
          <Grid xs={12} md={12} lg={12}>
            <Typography variant="h6" className={classes.title}>
              Comentarios
            </Typography>
            <Grid item xs={12} md={12}>
              <Text className={classes.info} loading={loading}>
                {' '}
              </Text>
            </Grid>
          </Grid>
        </Box>
      </Grid>

      <Grid lg={5} md={5} xs={5} className={classes.files}>
        <Box p={3}>
          <Typography variant="h6" className={classes.title}>
            Archivos
          </Typography>

          <Wrapper>
            {application?.attachments.map((item, index) => (
              <Grid item xs={12} md={12} key={index}>
                <LabeledRow label={application.attachments[index].name} />
                <FileThumbnail
                  fileName={item.fileName}
                  onView={() => {
                    toggleOpenVisor()
                  }}
                  onDownload={() => {
                    console.log(application.attachments[index].name)
                  }}
                />
              </Grid>
            ))}
          </Wrapper>
        </Box>
      </Grid>
      {openVisor && (
        <FileVisor
          open={openVisor}
          onClose={toggleOpenVisor}
          src={application.attachments.fileUrl}
        />
      )}
    </Box>
  )
}

export default PostulationDetails
