import { FiPlus } from 'react-icons/fi'
import { Box, Grid, makeStyles, Typography } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import { formatDate } from '../../../formatters'
import { FilePostulation } from '../../Shared'

const Container = ({ children }) => (
  <Grid container spacing={2}>
    {children}
  </Grid>
)

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 5,
    border: `1px solid ${theme.palette.common.black}`,
    marginBottom: 10
  },
  paper: {
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
    position: 'relative'
  },
  addRoot: {
    minHeight: 200,
    borderRadius: 5,
    display: 'flex',
    cursor: 'pointer',
    justifyContent: 'center',
    alignItems: 'center',
    border: `2px dashed ${theme.palette.gray.gray500}`
  },
  deleteButton: {
    position: 'absolute',
    top: 5,
    right: 5
  },
  deleteIcon: {
    color: theme.palette.error.main
  },
  date: {
    fontSize: 15,
    marginBottom: 5
  },
  info: {
    fontWeight: 'bold',
    marginBottom: 5
  },
  dateLoader: {
    marginBottom: 15,
    width: '30%'
  },
  thumbnailLoader: {
    height: 60,
    width: '100%',
    transform: 'none'
  }
}))

const Loader = () => {
  const classes = useStyles()
  return (
    <Box className={classes.root}>
      <Box className={classes.paper}>
        <Skeleton className={classes.dateLoader}></Skeleton>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Skeleton width="30%"></Skeleton>
            <Skeleton className={classes.thumbnailLoader}></Skeleton>
          </Grid>
          <Grid item xs={12} md={8}>
            <Box>
              <Skeleton width="20%"></Skeleton>
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Skeleton className={classes.thumbnailLoader}></Skeleton>
              </Grid>
              <Grid item xs={12} md={6}>
                <Skeleton className={classes.thumbnailLoader}></Skeleton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

const OtherDocsCard = ({ doc, onView, onRemove }) => {
  const classes = useStyles()
  return (
    <Grid item xs={12} md={4}>
      <Box p={2} className={classes.root}>
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              ></Box>

              <FilePostulation.PDFPreview
                bgWhite
                fileName={doc.file.fileName}
                onView={() => {
                  onView(doc.file)
                }}
                onRemove={() => {
                  onRemove(doc)
                }}
              />
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                marginBottom={1}
              >
                <Typography className={classes.date}>
                  {formatDate(new Date(doc.file.uploadDate))}
                </Typography>
                <Typography className={classes.date}>
                  {doc.file.fileSize}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Grid>
  )
}

const AddCard = ({ onClick }) => {
  const classes = useStyles()
  return (
    <Grid item xs={12} md={4} lg={3}>
      <Box p={2} className={classes.addRoot} onClick={onClick}>
        <Box textAlign="center">
          <FiPlus fontSize={40} opacity={0.5} />
          <Typography className={classes.addText}>Nuevo Documento</Typography>
        </Box>
      </Box>
    </Grid>
  )
}

OtherDocsCard.Container = Container
OtherDocsCard.AddCard = AddCard
OtherDocsCard.Loader = Loader

export default OtherDocsCard
