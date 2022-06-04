import { View, Text, StyleSheet } from '@react-pdf/renderer'

const AttendedHeaderTable = () => {
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
    number: {
      width: '5%'
    },
    rut: {
      width: '20%'
    },
    names: {
      width: '30%'
    },
    mini: {
      width: '4%'
    },
    dig: {
      width: '18%'
    },
    date: {
      width: '27%'
    }
  })
  return (
    <View style={styles.row}>
      <Text style={styles.number}>N°</Text>
      <Text style={styles.rut}>R.U.T.</Text>
      <Text style={styles.names}>NOMBRES</Text>
      <Text style={styles.mini}>N</Text>
      <Text style={styles.mini}>S</Text>
      <Text style={styles.mini}>V</Text>
      <Text style={styles.mini}>P</Text>
      <Text style={styles.mini}>F</Text>
      <Text style={styles.mini}>E</Text>
      <Text style={styles.mini}>L</Text>
      <Text style={styles.mini}>D</Text>
      <Text style={styles.mini}>B</Text>
      <Text style={styles.mini}>FR</Text>
      <Text style={styles.mini}>PS</Text>
      <Text style={styles.mini}>IN</Text>
      <Text style={styles.dig}>DIGITADO</Text>
      <Text style={styles.date}>FECHA</Text>
    </View>
  )
}

export default AttendedHeaderTable
