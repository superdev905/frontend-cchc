import { Box, Typography } from '@material-ui/core'
import DataTable from 'react-data-table-component'
import { LabeledRow, PageHeading, Text, Wrapper } from '../../components/UI'

const HousingWorker = () => (
  <Box>
    <Wrapper>
      <Grid container spacing={2}>
        <Grid item md={6}>
          <Box>
            <PageHeading>Ficha de Trabajador</PageHeading>
            <Box>
              <LabeledRow label="Run">
                <Text>20777</Text>
              </LabeledRow>
              <LabeledRow label="Nombres">
                <Text></Text>
              </LabeledRow>
              <LabeledRow label="Apellido Paterno">
                <Text></Text>
              </LabeledRow>
              <LabeledRow label="Apellido Materno">
                <Text></Text>
              </LabeledRow>
            </Box>
          </Box>
        </Grid>
        <Grid item md={6}>
          <Box>
            <Box>
              <Typography>Contacto</Typography>
              <Box>
                <LabeledRow label="Rut Empresa"></LabeledRow>
                <LabeledRow label="Direccion"></LabeledRow>
                <LabeledRow label="Región"></LabeledRow>
                <LabeledRow label="Comuna"></LabeledRow>
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid item md={6}>
          <Box>
            <Box>
              <Typography variant="h5">Detalle laboral</Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item md={6}>
          <Box>
            <Box>
              <Typography variant="h5">Profesionales asociados</Typography>
            </Box>
          </Box>
        </Grid>
        <Grid container alignItems="center">
          <Box>
            <Typography variant="h5">Diagnóstico</Typography>
          </Box>
          <Grid item md={11}>
            <Box display="flex" justifyContent="flex-end">
              <Can
                availableTo={['ADMIN', 'SOCIAL_ASSISTANCE']}
                yes={() => <Button> Agregar </Button>}
                no={() => null}
              />
            </Box>
          </Grid>
        </Grid>
        <DataTable
          higlightOnHover
          pointerOnHover
          columns={[
            {
              name: '1',
              selector: (row) => row.one
            },
            {
              name: '2',
              selector: (row) => row.two
            },
            {
              name: '3',
              selector: (row) => row.three
            }
          ]}
        />
      </Grid>
      <Box>
        <Box>
          <Typography style={{ fontSize: '18px', fontWeight: 'bold' }}>
            Etapas
          </Typography>
          <Timeline align="alternate">
            <>
              <TimelineItem>
                <TimelineOppositeContent>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                  ></Typography>
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                  <Box p={1}>
                    <Typography></Typography>
                    <Typography
                      style={{ fontSize: '14px', opacity: 0.7 }}
                    ></Typography>
                  </Box>
                </TimelineContent>
              </TimelineItem>
            </>
          </Timeline>
        </Box>
      </Box>
    </Wrapper>
  </Box>
)

export default HousingWorker
