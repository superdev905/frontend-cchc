import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  input: {
    position: 'absolute',
    zIndex: 1,
    width: 0
  },
  label: {
    display: 'flex',
    height: '120px',
    border: '2px dashed #C6C6C6',
    borderRadius: '10px',
    alignItems: 'center',
    width: '100%',
    cursor: 'pointer'
  },
  labelWrapper: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column'
  },
  uploadRoot: {
    width: '100%'
  },
  uploadStatus: {
    borderRadius: '10px',
    border: '1px solid #C6C6C6'
  },
  pdfPreview: {
    backgroundColor: theme.palette.gray.gray100,
    borderRadius: 5,
    fontSize: 15,
    alignItems: 'center',
    marginTop: '30px',
    marginLeft: '120px'
  },
  pdfIcon: {
    width: 50,
    height: 50
  },
  previewWrapper: {
    backgroundColor: theme.palette.gray.gray100,
    minHeight: '140px',
    borderRadius: 5,
    position: 'relative'
  },
  actions: {
    position: 'absolute',
    right: 5,
    top: 5,
    '& button': {
      padding: 8,
      marginLeft: 5,
      backgroundColor: theme.palette.common.white,
      '&:hover': {
        backgroundColor: theme.palette.common.white
      }
    }
  },
  removeIcon: {
    color: theme.palette.error.main
  },
  fileSize: {
    fontSize: 13
  }
}))

export default useStyles
