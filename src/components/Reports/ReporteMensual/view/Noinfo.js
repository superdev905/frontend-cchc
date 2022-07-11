import { View, Text, StyleSheet } from '@react-pdf/renderer'

const Noinfo = ({ primary }) => {
  const styles = StyleSheet.create({
    row: {
      textAlign: 'center',
      fontSize: '12pt',
      width: '100%'
    },
    main: {
      backgroundColor: 'transparent',
      border: '1px solid grey'
    }
  })
  return (
    <View style={styles.row}>
      <Text style={styles.main}>{primary} </Text>
    </View>
  )
}

export default Noinfo
