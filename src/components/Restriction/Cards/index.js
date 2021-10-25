import { Box, IconButton, Typography } from '@material-ui/core'
import { FiEdit as EditIcon, FiTrash2 as DeleteIcon } from 'react-icons/fi'
import {
  FaUserGraduate,
  FaAward,
  FaHome,
  FaCity,
  FaClipboardList
} from 'react-icons/fa'
import Company from './Company'
import General from './General'
import Course from './Course'
import Scholarship from './Scholarship'
import useStyles from './styles'

const RestrictionCard = ({ type, restriction, onEdit, onDelete }) => {
  const types = {
    GENERAL: {
      name: 'General',
      icon: <FaClipboardList />,
      component: <General restriction={restriction} />,
      iconColor: '#BE52F2'
    },
    BUSINESS: {
      name: 'Empresas',
      icon: <FaCity />,
      component: <Company restriction={restriction} />,
      iconColor: '#00C48C'
    },
    COURSE: {
      name: 'Curso',
      icon: <FaAward />,
      component: <Course restriction={restriction} />,
      iconColor: '#0084F4'
    },
    HOME: { name: 'Vivienda', icon: <FaHome /> },
    SCHOLARSHIP: {
      name: 'Beca',
      icon: <FaUserGraduate />,
      component: <Scholarship restriction={restriction} />,
      iconColor: '#FF6474'
    }
  }

  const classes = useStyles({ iconColor: types[type].iconColor })

  return (
    <Box className={classes.root}>
      <Box display={'flex'} justifyContent={'space-between'}>
        <Box display={'flex'} alignItems={'center'}>
          <Box className={classes.iconWrapper}>{types[type].icon}</Box>
          <Typography className={classes.typeTag}>
            {types[type].name}
          </Typography>
        </Box>
        <Box className={classes.actions}>
          <IconButton onClick={onEdit}>
            <EditIcon />
          </IconButton>
          {onDelete && (
            <IconButton onClick={onDelete} className={classes.deleteIcon}>
              <DeleteIcon />
            </IconButton>
          )}
        </Box>
      </Box>
      <Box mt={1}>{types[type].component}</Box>
    </Box>
  )
}
export default RestrictionCard
