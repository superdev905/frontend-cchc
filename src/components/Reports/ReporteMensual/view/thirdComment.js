import { View, Text, StyleSheet } from '@react-pdf/renderer'

const FirstComment = ({ areaTotal, totalAtenciones, TercerArea }) => {
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
          C-{' '}
          {areaTotal && areaTotal.length > 2 && areaTotal[2].total > 0
            ? areaTotal[2].name
            : null}
        </Text>
        <Text>
          <Br />
        </Text>
        <Text style={styles.text}>
          La Tercera área de mayor intervención corresponde a{' '}
          {areaTotal && areaTotal.length > 2 && areaTotal[2].total > 0
            ? areaTotal[2].name
            : null}
          , con porcentaje de{' '}
          {areaTotal && areaTotal.length > 2 && areaTotal[2].total > 0
            ? `${Number.parseFloat(
                (areaTotal[2].total * 100) / totalAtenciones
              ).toFixed(2)}% `
            : '0%'}{' '}
          consultas realizadas. A continuación se detallan sus variables:
        </Text>
        <Text>
          <Br />
          <Br />
        </Text>
        <Text style={styles.text}> {TercerArea || null} </Text>
      </View>
    </Text>
  )
}

export default FirstComment
