import { Fragment } from 'react'
import { View, Text, StyleSheet } from '@react-pdf/renderer'
import moment from 'moment'

const GesBodyTable = ({ assistConstructionList, assigned }) => {
  const styles = StyleSheet.create({
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      textAlign: 'center',
      border: '1px solid black',
      fontSize: '10pt'
    },
    gest: {
      width: '50%',
      borderRight: '1px solid black'
    },
    people: {
      width: '17%',
      borderRight: '1px solid black'
    },
    dig: {
      width: '15%',
      borderRight: '1px solid black'
    },
    date: {
      width: '23%',
      borderRight: '1px solid black'
    }
  })

  const rows =
    assistConstructionList.length > 0 ? (
      assistConstructionList.map((element) => (
        <View style={styles.row}>
          <Text style={styles.gest}>{element.type_name}</Text>
          <Text style={styles.people}>{element.quantity}</Text>
          <Text style={styles.dig}>
            {assigned.names.charAt(0)}
            {assigned.paternal_surname}
          </Text>
          <Text style={styles.date}>
            {moment(element.update_at).format('DD-MM-YYYY HH:mm:ss')}
          </Text>
        </View>
      ))
    ) : (
      <View style={styles.row}>
        <Text style={styles.gest}>-</Text>
        <Text style={styles.people}>-</Text>
        <Text style={styles.dig}>-</Text>
        <Text style={styles.date}>-</Text>
      </View>
    )
  return <Fragment>{rows}</Fragment>
}

export default GesBodyTable
