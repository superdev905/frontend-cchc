import { View, Text, StyleSheet } from '@react-pdf/renderer'

const ObrasView = () => {
  const styles = StyleSheet.create({
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      textAlign: 'center',
      border: '1px solid black',
      backgroundColor: 'grey',
      color: 'white',
      fontSize: '12pt'
    },
    place: {
      width: '50%'
    },
    date: {
      width: '23%'
    },
    people: {
      width: '23%'
    },
    consult: {
      width: '13%'
    }
  })
  return (
    <View style={styles.row}>
      <Text style={styles.place}>Lugar</Text>
      <Text style={styles.date}>Fecha</Text>
      <Text style={styles.people}>Personas</Text>
      <Text style={styles.consult}>Consulta</Text>
    </View>
  )
}

export default ObrasView
