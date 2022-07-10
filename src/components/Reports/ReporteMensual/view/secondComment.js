import { View, Text, StyleSheet } from '@react-pdf/renderer'

const SecondComment = ({ areaTotal, totalAtenciones, SegundaArea }) => {
  const styles = StyleSheet.create({
    subtitles2: {
      fontWeight: 'extrabold',
      fontSize: '13pt',
      marginHorizontal: '20px',
      marginTop: '10px'
    },
    text: {
      fontWeight: 'extralight',
      fontSize: '12pt',
      marginHorizontal: '20px',
      marginTop: '10px'
    }
  })

  const Br = () => '\n'

  return (
    <Text style={styles.text}>
      <View>
        <Text style={styles.subtitles2}>
          B-{' '}
          {areaTotal && areaTotal.length > 1 && areaTotal[1].total > 0
            ? areaTotal[1].name
            : null}
        </Text>
        <Br />
        <Text style={styles.text}>
          La segunda área de mayor intervención corresponde a{' '}
          {areaTotal && areaTotal.length > 1 && areaTotal[1].Total > 0
            ? areaTotal[1].name
            : null}
          , con porcentaje de{' '}
          {areaTotal && areaTotal.length > 1 && areaTotal[1].total > 0
            ? `${Number.parseFloat(
                (areaTotal[1].total * 100) / totalAtenciones
              ).toFixed(2)}% `
            : '0%'}{' '}
          consultas realizadas. A continuación se detallan sus variables:
        </Text>
        <Br />
        <Br />
        <Text style={styles.text}> {SegundaArea || null} </Text>
      </View>
    </Text>
  )
}

export default SecondComment
