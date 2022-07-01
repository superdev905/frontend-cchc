import { View, Text, StyleSheet } from '@react-pdf/renderer'

const HouseAreaView = () => {
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
    area: {
      width: '50%'
    },
    total: {
      width: '23%'
    },
    per: {
      width: '23%'
    }
  })
  return (
    <View style={styles.row}>
      <Text style={styles.area}>Consulta Area Vivienda</Text>
      <Text style={styles.total}>Toral</Text>
      <Text style={styles.per}>%</Text>
    </View>
  )
}

export default HouseAreaView
