import { FiTrash2 as DeleteIcon, FiEye as ViewIcon } from 'react-icons/fi'
import { Box, IconButton, makeStyles, Typography } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'

const useStyles = makeStyles((theme) => ({
  root: ({ selected }) => ({
    borderRadius: 5,
    border: `2px solid ${
      selected ? theme.palette.primary.main : theme.palette.gray.gray300
    }`,
    backgroundColor: selected ? '#E5F6FF' : 'transparent',
    cursor: 'pointer',
    '&:hover': {
      border: `2px solid ${
        selected ? theme.palette.primary.main : theme.palette.primary.main
      }`
    },
    marginBottom: 10
  }),
  actions: {
    position: 'absolute',
    top: '50%',
    right: 20,
    transform: 'translate(50%, -50%)',
    '& button': {
      padding: 6,
      margin: 0,
      color: theme.palette.primary.main
    }
  },
  deleteIcon: {
    color: theme.palette.error.main
  }
}))

const Loader = () => (
  <Box p={2}>
    <Skeleton width={'30%'}></Skeleton>
    <Skeleton width={'50%'}></Skeleton>
  </Box>
)

const BenefitCard = ({ benefit, onClick, selected, onDelete }) => {
  const classes = useStyles({ selected })

  const handleOnClickView = (e, id) => {
    e.stopPropagation()
    const win = window.open(`/benefits/${id}`, '_blank')
    win.focus()
  }
  return (
    <Box p={2} className={classes.root} onClick={onClick}>
      <Box position="relative">
        <Box className={classes.actions}>
          {selected && onDelete && (
            <IconButton
              onClick={(e) => {
                e.stopPropagation()
                onDelete()
              }}
            >
              <DeleteIcon className={classes.deleteIcon} />
            </IconButton>
          )}
          {!selected && (
            <IconButton onClick={(e) => handleOnClickView(e, benefit.id)}>
              <ViewIcon />
            </IconButton>
          )}
        </Box>
        <Typography>
          Código: <strong>{`${benefit.code}`}</strong>
        </Typography>
        <Typography>
          Nombre: <strong>{benefit.name}</strong>
        </Typography>
      </Box>
    </Box>
  )
}

BenefitCard.Loader = Loader

export default BenefitCard
