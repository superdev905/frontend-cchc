import { PDFViewer, Document, Page, Text } from '@react-pdf/renderer'
/*  import { useSelector } from 'react-redux' */
import { Dialog } from '../../Shared'
import useStyles from '../../Shared/FileVisor/styles'
import AreaView from './view/AreaAtendida'
import HouseAreaView from './view/AreaPrevision'
import ObrasView from './view/ObrasAtendidas'
import TeamView from './view/Team'

const MonthlyReport = ({ open, onClose }) => {
  /*  const { visit, totalUsers, assistanceConstructionList, statisticsPrint } =
    useSelector((state) => state.assistance)  */
  const classes = useStyles()
  const jefaturas = [
    {
      name: 'Cristián Carvallo',
      email: 'ccarvallo@fundacioncchc.cl',
      cargo: 'Gerente Sostenibilidad',
      zona: '(Santiago)'
    },
    {
      name: 'Carlos García',
      email: 'cgarcia@fundacioncchc.cl',
      cargo: 'Gerente Servicio Social',
      zona: '(Santiago)'
    },
    {
      name: 'Greta Lopez',
      email: 'glopez@fundacioncchc.cl',
      cargo: 'Sub Gerente Zona Norte Grande',
      zona: '(Iquique)'
    },
    {
      name: 'Ana María Gómez',
      email: 'amgomez@fundacioncchc.cl',
      cargo: 'Sub Gerente Zona Sur',
      zona: '(Temuco)'
    },
    {
      name: 'Johana Chamorro',
      email: 'jchamorro@fundacioncchc.cl',
      cargo: 'Sub Gerente Quinta Región',
      zona: '(Valparaiso)'
    },
    {
      name: 'Constanza Galaz',
      email: 'cgalaz@fundacioncchc.cl',
      cargo: 'Jefa Norte Chico',
      zona: '(La Serena)'
    },
    {
      name: 'Yessica Pino',
      email: 'ypino@fundacioncchc.cl',
      cargo: 'Jefa Servicio Social Oficina',
      zona: '(Santiago)'
    },
    {
      name: 'Karina Hidalgo',
      email: 'khidalgo@fundacioncchc.cl',
      cargo: 'Coordinadora Atencion Social Empresas',
      zona: '(Santiago)'
    },
    {
      name: 'Krsitopher Poblete',
      email: 'kpoblete@fundacioncchc.cl',
      cargo: 'Coordinador Atencion Social Empresas',
      zona: '(Santiago)'
    },
    {
      name: 'Melisa Vega',
      email: 'mvega@fundacioncchc.cl',
      cargo: 'Coordinadora Atencion Social Empresas',
      zona: '(Santiago)'
    }
  ]
  const prueba = [
    {
      name: 'prueba',
      email: 'prueba@prueba',
      cargo: 'pruebas.',
      zona: 'prueba'
    }
  ]
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={true}
      classes={{ paper: classes.modalRoot }}
    >
      <PDFViewer style={{ minHeight: '85vh', width: '100%' }}>
        <Document style={{ minHeigth: '100vh', width: '100%' }}>
          <Page size="A4" style={{ padding: '20px' }}>
            <Text> FUNDACIÓN SOCIAL SOMOS CCHC </Text>
            <Text>INFORME EJECUTIVO</Text>
            <Text> "NOMBRE EMPRESA" </Text>
            <Text> "FECHA SELECCIONADA" </Text>
          </Page>
          <Page size="A4" style={{ padding: '20px' }}>
            <Text>INTRODUCCIÓN </Text>
            <Text> </Text>
            <Text>
              El presente documento informa sobre las actividades y gestiones
              realizadas por el equipo de la Fundación Social Cámara Chilena de
              la Construcción durante el mes de "inserte Fecha" en "inserte
              Empresa". Durante el periodo se atendió a los trabajadores de la
              empresa y sus grupos familiares tanto en las oficinas de la
              Fundación Social como en su lugar de trabajo. El equipo a cargo de
              la atención social en este mes estuvo integrado por:
            </Text>
            <Text> </Text>
            {jefaturas.map((jefatura, index) => (
              <TeamView jefatura={jefatura} key={index} />
            ))}
            {prueba.map((jefatura, index) => (
              <TeamView jefatura={jefatura} key={index} />
            ))}
          </Page>
          <Page size="A4" style={{ padding: '20px' }}>
            <Text> I. ATENCION SOCIAL EMPRESA - TERRENO "inserte fecha"</Text>
            <Text> </Text>
            <Text>
              Durante el presente mes se visitaron las siguientes obras en las
              cuales se atendió al total de trabajadores que se indica:
            </Text>
            <Text> Cuadro </Text>
            <Text>Obras Atendidas durante el mes</Text>
            <Text> </Text>
            <ObrasView></ObrasView>
            <Text> </Text>
            <Text>
              El total de atenciones realizadas durante "Inserte Fecha", se
              distribuye entre las areas citadas a continuacion:
            </Text>
            <Text> Cuadro </Text>
            <Text> Consultas realizadas por Area </Text>
            <Text> </Text>
            <AreaView></AreaView>
          </Page>
          <Page size="A4" style={{ padding: '20px' }}>
            <Text>
              De acuerdo a la información arrojada por la Consulta, es posible
              inferir que las áreas de mayor intervención son las siguientes:
            </Text>
            <Text>A-"llenado por asistente" </Text>
          </Page>
          <Page size="A4" style={{ padding: '20px' }}>
            <Text>DISTRIBUCION POR CONSULTA - ATENCION TERRENO</Text>
            <Text> </Text>
            <Text>
              En los cuadros siguientes se detallan los temas consultados por
              los trabajadores en cada una de las areas citadas anteriormente:
            </Text>
            <Text>Cuadro</Text>
            <Text>Gestiones realizadas "Inserte Fecha"</Text>
            <Text> </Text>
            <HouseAreaView></HouseAreaView>
            <Text> </Text>
            <HouseAreaView></HouseAreaView>
            <Text> </Text>
          </Page>
          <Page size="A4" style={{ padding: '20px' }}>
            <Text>MATERIAL DE DIFUSION ENTREGADO</Text>
            <Text> </Text>
            <Text> A. Afiches:</Text>
            <Text>
              Durante "Inserte Fecha", de acuerdo a la programación de la
              empresa, se entregaron los siguientes afiches informativos.
            </Text>
            <Text>Cuado</Text>
            <Text>Afiches entregados "Inserte Fecha"</Text>
          </Page>
          <Page size="A4" style={{ padding: '20px' }}>
            <Text> B. Folletos: </Text>
            <Text>
              Durante "Inserte Fecha", de acuerdo a la programación de la
              empresa, se entregaron los siguientes folletos informativos.
            </Text>
            <Text> Cuadro</Text>
            <Text>Folletos entregados "Inserte Fecha"</Text>
          </Page>
          <Page size="A4" style={{ padding: '20px' }}>
            <Text> II. ATENCION SOCIAL EMPRESA - OFICINA</Text>
            <Text> </Text>
            <Text>
              Del total de atenciones realizadas en terreno por las asistentes
              sociales, algunas son derivadas a las oficinas centrales de la
              Fundación Social para entregar una atención focalizada y
              especifica en los problemas del trabajador y dar una respuesta de
              calidad a sus necesidades.
            </Text>
            <Text>Cuadro</Text>
            <Text>Consultas realizadas por Area "inserte Fecha"</Text>
            <Text>Cuadro</Text>
            <Text>Gestiones realizadas "Inserte Fecha"</Text>
            <Text>DISTRIBUCIÓN POR CONSULTA - ATENCION OFICIN</Text>
          </Page>
          <Page size="A4" style={{ padding: '20px' }}>
            <Text>III. CAPACITACIÓN REALIZADA EN OBRA</Text>
            <Text> </Text>
            <Text>
              Con el objetivo entregar información, incentivar y promover
              diversos temas de relevancia para los trabajadores durante sus
              visitas a obras, las asistentes sociales de la Fundación Social
              realizan charlas informativas. Durante "Inserte Fecha", de acuerdo
              a la programación de la empresa, se realizaron las siguientes
              charlas informativas y de capacitación.
            </Text>
            <Text>Cuadro</Text>
            <Text>Charlas realizadas "Inserte Fecha"</Text>
          </Page>
          <Page size="A4" style={{ padding: '20px' }}>
            <Text>IV. PROYECTOS SOCIALES</Text>
            <Text> </Text>
            <Text> Capacitacion </Text>
            <Text> </Text>
            <Text>
              En el marco de los Proyectos de Responsabilidad Social promovidos
              por Cámara Chilena de la Construcción, la Fundación Social
              desarrolla el programa de “Capacitación en oficios de la
              construcción para trabajadores”.
            </Text>
            <Text>
              Este proyecto tiene por objetivo entregar a los trabajadores de la
              construcción capacitación técnica de un oficio relativo al área
              donde se desempeñan, representando no sólo el mejoramiento de sus
              condiciones de trabajo, sino también especializar sus
              conocimientos laborales en el ámbito de la construcción.
            </Text>
            <Text>
              Además se desarrollan cursos de capacitación para esposas e hijos
              de trabajadores, con el fin de aumentar el nivel de empleabilidad
              del grupo familiar y asi incidir positivamente en sus ingresos.
            </Text>
            <Text>
              Durante "Inserte Fecha" no se matricularon personas en cursos.
            </Text>
            <Text> </Text>
            <Text>V. BECAS EMPRESARIOS DE LA CONSTRUCCION </Text>
            <Text> </Text>
            <Text> Beca Mejor Alumno:</Text>
            <Text>
              Durante el mes se difundió el programa Beca Empresarios de la
              Construcción. El proyecto tiene por objetivo contribuir en la
              educación de los hijos de trabajadores de menores recursos
              pertenecientes a empresas socias del gremio. Esta dirigido a los
              alumnos que se encuentran cursando 8° año básico durante el
              presente año y que tengan un promedio de notas igual o superior a
              5,7.
            </Text>
            <Text>No se registraron trabajadores para este beneficio. </Text>
          </Page>
          <Page size="A4" style={{ padding: '20px' }}>
            <Text>VI. PROGRAMA DE FOMENTO AL AHORRO "Inserte Fecha" </Text>
            <Text> </Text>
            <Text>
              Durante "Inserte Fecha" se continuó con la difusión en las obras
              sobre este programa para incentivar el ahorro para la vivienda,
              ahorro previsional voluntario y/o ahorro de libre disposición, a
              través de los diversos beneficios que entrega la caja de
              compensación.
            </Text>
            <Text>
              {' '}
              En el presente mes no se tramitaron aperturas de libretas de
              ahorro
            </Text>
            <Text> </Text>
            <Text> VII. TEMAS DE DIFUSIÓN MENSUAL</Text>
            <Text> </Text>
            <Text>Los principales temas ha difundir el próximo mes son: </Text>
            <Text>Charla:</Text>
            <Text>Habilidades Parentales</Text>
            <Text>Marketing:</Text>
            <Text> 1. Extensión IFE Laboral </Text>
            <Text> 2. Actividades con los niños en verano </Text>
            <Text> 3. Beca Presidente de la República </Text>
            <Text> </Text>
            <Text> VII. CASOS SOCIALES RELEVANTES</Text>
            <Text>Parque Las Palmas II</Text>
          </Page>
        </Document>
      </PDFViewer>
    </Dialog>
  )
}

export default MonthlyReport
