import { View, StyleSheet } from '@react-pdf/renderer'
import Columna from './Columna'

const TeamView = ({ jefatura }) => {
  const styles = StyleSheet.create({
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      textAlign: 'center',
      color: 'white',
      fontSize: '12pt'
    },
    main: {
      width: '50%',
      backgroundColor: 'grey',
      border: '1px solid grey'
    }
  })
  return (
    <View style={styles.row}>
      <Columna
        style={styles.main}
        primary={jefatura.name}
        secondary={jefatura.email}
      />
      <Columna primary={jefatura.cargo} secondary={jefatura.zona} />
    </View>
  )
}

export default TeamView
