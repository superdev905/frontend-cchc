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
  imgPreview: {
    width: '100%',
    padding: 20,
    height: 450,
    borderRadius: 5,
    margin: '0 auto',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  },
  deleteImgIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    borderRadius: '50%',
    padding: 4,
    backgroundColor: theme.palette.common.white,
    '&:hover': {
      backgroundColor: theme.palette.common.white
    },
    '& svg': {
      fill: theme.palette.error.main
    }
  },
  pdfPreview: {
    backgroundColor: theme.palette.gray.gray100,
    borderRadius: 5,
    fontSize: 15,
    display: 'flex',
    alignItems: 'center'
  },
  pdfIcon: {
    width: 40,
    height: 40,
    marginRight: 10
  },
  previewWrapper: {
    backgroundColor: theme.palette.gray.gray100,
    textAlign: 'center'
  }
}))

export default useStyles
