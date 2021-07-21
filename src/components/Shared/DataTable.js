import PropTypes from 'prop-types'
import DataTable from 'react-data-table-component'

const customStyles = {
  headCells: {
    style: {
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
  styles,
  ...props
}) => (
  <DataTable
    customStyles={{ ...customStyles, ...styles }}
    columns={columns}
    data={data}
    pagination={pagination}
    responsive={responsive}
    {...props}
  />
)
CustomDataTable.defaultProps = {
  responsive: true,
  pagination: false
}

CustomDataTable.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array
}

export default CustomDataTable
