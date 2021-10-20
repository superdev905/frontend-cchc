import { Box, Typography } from '@material-ui/core'
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

const RestrictionCard = ({ type, restriction }) => {
  const types = {
    GENERAL: {
      name: 'General',
      icon: <FaClipboardList />,
      component: <General restriction={restriction} />
    },
    BUSINESS: {
      name: 'Empresas',
      icon: <FaCity />,
      component: <Company restriction={restriction} />
    },
    COURSE: {
      name: 'Curso',
      icon: <FaAward />,
      component: <Course restriction={restriction} />
    },
    HOME: { name: 'Vivienda', icon: <FaHome /> },
    SCHOLARSHIP: { name: 'Beca', icon: <FaUserGraduate /> }
  }

  return (
    <Box p={2} border={'1px solid'} borderRadius={'5px'}>
      <Box display={'flex'} alignItems={'center'}>
        <Box
          style={{
            width: '40px',
            fontSize: '22px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: 'blue',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white',
            marginRight: '10px'
          }}
        >
          {types[type].icon}
        </Box>
        <Typography>{types[type].name}</Typography>
      </Box>
      <Typography>{type}</Typography>
      <Typography>{restriction.id}</Typography>
      {types[type].component}
    </Box>
  )
}
export default RestrictionCard
