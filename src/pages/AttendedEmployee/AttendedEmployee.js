import { useParams } from 'react-router-dom'

const AttendedEmployee = () => {
  const { idVisit, idEmployee } = useParams()
  return (
    <div>
      {idVisit}
      {idEmployee}
    </div>
  )
}

export default AttendedEmployee
