import { View, Text, StyleSheet } from '@react-pdf/renderer'

const AreaView = (props) => {
  const { firstName, secondName, thirdName } = props
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
      <Text style={styles.area}>{firstName}</Text>
      <Text style={styles.total}>{secondName}</Text>
      <Text style={styles.per}>{thirdName}</Text>
    </View>
  )
}

export default AreaView
