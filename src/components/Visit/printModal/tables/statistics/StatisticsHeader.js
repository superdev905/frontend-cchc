import { View, Text, StyleSheet } from '@react-pdf/renderer'

const StatisticsHeader = () => {
  const styles = StyleSheet.create({
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      textAlign: 'center',
      color: 'white',
      fontSize: '12pt'
    },
    main: {
      width: '30%',
      backgroundColor: 'black'
    },
    quantity: {
      width: '20%',
      backgroundColor: 'black',
      color: 'black'
    },
    space: {
      width: '20%'
    }
  })
  return (
    <View style={styles.row}>
      <Text style={styles.main}>ATENDIDOS</Text>
      <Text style={styles.quantity}>CANTIDAD</Text>
      <Text style={styles.space}></Text>
      <Text style={styles.main}>DOTACIÓN</Text>
      <Text style={styles.quantity}>CANTIDAD</Text>
    </View>
  )
}

export default StatisticsHeader
