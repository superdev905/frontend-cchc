import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { Box, Chip, Typography } from '@material-ui/core'
import companyActions from '../../state/actions/companies'
import { ActionsTable, EmptyState, StatusChip, Wrapper } from '../UI'
import { DataTable } from '../Shared'
import useStyles from './styles'

const Details = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { idCompany } = useParams()
  const history = useHistory()
  const [tableData, setTableData] = useState([])
  const [loading, setLoading] = useState(false)

  const onViewClick = (item) => {
    history.push(`/company/${item.id}/details`)
  }

  const columns = [
    {
      name: 'Razón social',
      selector: 'business_name',
      sortable: true
    },
    {
      name: 'Rut',
      selector: 'rut'
    },
    {
      name: 'Empresa socia',
      selector: 'is_partner',
      cell: (row) => <Chip {...row} label={row.is_partner}></Chip>,
      hide: 'md'
    },
    {
      name: 'Estado',
      selector: 'state',
      hide: 'md',
      center: true,
      cell: (row) => (
        <StatusChip
          label={row.state === 'CREATED' ? 'Activo' : 'Eliminado'}
          error={row.state !== 'CREATED'}
          success={row.state === 'CREATED'}
        />
      )
    },
    {
      name: 'Fecha de creación',
      selector: 'createDate',
      hide: 'md'
    },
    {
      name: '',
      selector: '',
      right: true,
      cell: (row) => <ActionsTable {...row} onView={() => onViewClick(row)} />
    }
  ]

  useEffect(() => {
    setLoading(true)
    dispatch(companyActions.getRelatedCompanies(idCompany))
      .then((list) => {
        setLoading(false)
        setTableData(
          list.map((item) => ({
            ...item,
            createDate: new Date(item.created_at).toLocaleDateString('es-CL', {
              dateStyle: 'long'
            })
          }))
        )
      })
      .catch(() => {
        setLoading(false)
      })
  }, [])

  return (
    <Box>
      <Wrapper>
        <Box display="flex" justifyContent="space-between">
          <Typography className={classes.heading}>Divisiones</Typography>
        </Box>

        <Box>
          {!loading && tableData.length > 0 ? (
            <DataTable
              progressPending={loading}
              columns={columns}
              data={tableData}
            />
          ) : (
            <EmptyState message={'Esta empresa no tiene subempresas'} />
          )}
        </Box>
      </Wrapper>
    </Box>
  )
}

export default Details
