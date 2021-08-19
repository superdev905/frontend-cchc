import PropTypes from 'prop-types'
import { Box, makeStyles } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import DataTable from 'react-data-table-component'
import { EmptyState } from '../UI'

const useStyles = makeStyles(() => ({
  loader: {
    transform: 'none',
    marginBottom: 5,
    height: 35,
    width: '100%'
  }
}))

const customStyles = {
  table: {
    style: { width: '100%' }
  },
  headCells: {
    style: {
      width: '100%',
      fontSize: '14px',
      color: '#334D6E',
      fontWeight: 'bold'
    }
  },
  rows: {
    style: {
      fontSize: '15px'
    }
  }
}

const CustomDataTable = ({
  columns,
  data,
  pagination,
  responsive,
  loaderRows,
  styles,
  emptyMessage,
  ...props
}) => {
  const classes = useStyles()
  return (
    <DataTable
      customStyles={{ ...customStyles, ...styles }}
      columns={columns}
      data={data}
      pagination={pagination}
      responsive={responsive}
      persistTableHead={true}
      noDataComponent={<EmptyState message={emptyMessage} />}
      progressComponent={
        <Box width="100%">
          {[...Array(loaderRows)].map((__, i) => (
            <Skeleton
              key={`loader-row-${i}`}
              className={classes.loader}
            ></Skeleton>
          ))}
        </Box>
      }
      {...props}
      paginationComponentOptions={{
        rowsPerPageText: 'Datos por página'
      }}
    />
  )
}
CustomDataTable.defaultProps = {
  responsive: true,
  pagination: false,
  loaderRows: 5,
  emptyMessage: 'No hay datos por mostrar'
}

CustomDataTable.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array
}

export default CustomDataTable
