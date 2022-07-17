import { View, StyleSheet } from '@react-pdf/renderer'
import Columna from './Columna'

const TeamView = ({ jefatura }) => {
  const styles = StyleSheet.create({
    row: {
      flexDirection: 'row',
      alignItems: 'left',
      textAlign: 'left',
      color: 'black',
      fontSize: '12pt'
    },
    main: {
      width: '50%',
      backgroundColor: 'transparent',
      border: '1px solid grey'
    }
  })
  return (
    <View style={styles.row}>
      <Columna
        style={styles.main}
        primary={jefatura.nombre}
        secondary={jefatura.email}
      />
      <Columna
        primary={jefatura.charge_name}
        secondary={
          jefatura?.zona ||
          `(${jefatura?.region_delegacion} - ${jefatura?.comuna_delegacion})`
        }
      />
    </View>
  )
}

export default TeamView
