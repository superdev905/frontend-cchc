import { View, Text, StyleSheet } from '@react-pdf/renderer'

const AreaBody = (props) => {
  const { AreaName, AtentionTotal, Porcentaje } = props
  const styles = StyleSheet.create({
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      textAlign: 'center',
      border: '1px solid black',
      backgroundColor: 'transparent',
      color: 'black',
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
      <Text style={styles.area}>{AreaName}</Text>
      <Text style={styles.total}>{AtentionTotal}</Text>
      <Text style={styles.per}>{Porcentaje}</Text>
    </View>
  )
}

export default AreaBody
