const isPollListAnswered = (moduleResponse) => {
  if (!moduleResponse.isRequired) return true

  return (
    moduleResponse.pollStatus.filter((item) => !item.isAnswered).length === 0
  )
}

export default isPollListAnswered
