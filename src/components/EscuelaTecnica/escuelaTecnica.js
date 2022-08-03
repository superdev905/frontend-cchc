import { useState } from 'react'
import { Box, Grid } from '@material-ui/core'
import { useToggle } from '../../hooks'
import { Wrapper, Button } from '../UI'
import { DataTable } from '../Shared'
import EscuelaReport from './escuelaReport'

export default function Etc() {
  const [selectedReport, setSelectedReport] = useState()
  const { open, toggleOpen } = useToggle()
  const reportes = [
    {
      id: 1,
      name: 'Cursos',
      tag: 'course'
    },
    {
      id: 2,
      name: 'Empresas',
      tag: 'company'
    },
    {
      id: 3,
      name: 'Libro de clases',
      tag: 'classesBook'
    },
    {
      id: 4,
      name: 'Participantes',
      tag: 'alumns'
    }
    /*  {
      id: 5,
      name: 'Consolidado',
      tag: 'all'
    }   */
  ]

  return (
    <Wrapper>
      <Box>
        <Grid container spacing={1} alignItems="center">
          <Grid item xs={12}>
            <DataTable
              data={reportes}
              highlightOnhover
              pointerOnHover
              columns={[
                {
                  name: 'Nombre',
                  selector: (row) => row.name
                },
                {
                  name: 'Informe',
                  right: true,
                  cell: (row) => (
                    <Button
                      onClick={() => {
                        setSelectedReport(row)
                        toggleOpen()
                      }}
                    >
                      Generar
                    </Button>
                  )
                }
              ]}
              pagination={reportes.length}
            />
          </Grid>
        </Grid>
      </Box>
      {open && (
        <EscuelaReport
          open={open}
          onClose={toggleOpen}
          report={selectedReport}
        />
      )}
    </Wrapper>
  )
}
