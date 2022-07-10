import { View, Text, StyleSheet } from '@react-pdf/renderer'

const HeaderACF = ({ first, second, third, fourth, five }) => {
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
    date: {
      width: '10%'
    },
    name: {
      width: '30%'
    },
    acf: {
      width: '40%'
    },
    total: {
      width: '15%'
    }
  })
  return (
    <View style={styles.row}>
      <Text style={styles.number}>{first}</Text>
      <Text style={styles.date}>{second}</Text>
      <Text style={styles.name}>{third}</Text>
      <Text style={styles.acf}>{fourth}</Text>
      <Text style={styles.total}>{five}</Text>
    </View>
  )
}

export default HeaderACF
