import { View, Text, StyleSheet } from '@react-pdf/renderer'

const CompanyHeaderTable = () => {
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
    date: {
      width: '20%'
    },
    company: {
      width: '50%'
    },
    construction: {
      width: '30%'
    }
  })
  return (
    <View style={styles.row}>
      <Text style={styles.date}>FECHA</Text>
      <Text style={styles.company}>EMPRESA</Text>
      <Text style={styles.construction}>OBRA</Text>
    </View>
  )
}

export default CompanyHeaderTable
