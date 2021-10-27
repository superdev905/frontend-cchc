import { FiTrash2 as DeleteIcon } from 'react-icons/fi'
import { Box, IconButton, makeStyles, Typography } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'

const useStyles = makeStyles((theme) => ({
  root: ({ selected }) => ({
    borderRadius: 5,
    border: `2px solid ${
      selected ? theme.palette.success.main : theme.palette.gray.gray300
    }`,
    cursor: 'pointer',

    '&:hover': {
      border: `2px solid ${
        selected ? theme.palette.success.main : theme.palette.primary.main
      }`
    },
    marginBottom: 10
  }),
  actions: {
    position: 'absolute',
    top: 0,
    right: 0,
    '& button': {
      padding: 6,
      margin: 0,
      color: theme.palette.error.main
    }
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
  return (
    <Box p={2} className={classes.root} onClick={onClick}>
      <Box position="relative">
        <Box className={classes.actions}>
          {onDelete && (
            <IconButton
              onClick={(e) => {
                e.stopPropagation()
                onDelete()
              }}
            >
              <DeleteIcon />
            </IconButton>
          )}
        </Box>
        <Typography>{`Código: ${benefit.code}`}</Typography>
        <Typography>{`Nombre: ${benefit.name}`}</Typography>
      </Box>
    </Box>
  )
}

BenefitCard.Loader = Loader

export default BenefitCard
