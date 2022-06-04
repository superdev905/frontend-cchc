import { View, Text, StyleSheet } from '@react-pdf/renderer'

const GesHeaderTable = () => {
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
    gest: {
      width: '50%'
    },
    people: {
      width: '17%'
    },
    dig: {
      width: '15%'
    },
    date: {
      width: '23%'
    }
  })
  return (
    <View style={styles.row}>
      <Text style={styles.gest}>GESTIÓN</Text>
      <Text style={styles.people}>N° PERSONAS</Text>
      <Text style={styles.dig}>DIGITADO</Text>
      <Text style={styles.date}>FECHA</Text>
    </View>
  )
}

export default GesHeaderTable
