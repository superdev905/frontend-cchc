const isPollListAnswered = (moduleResponse) => {
  if (!moduleResponse.isRequired) return true

  return (
    moduleResponse.pollStatus.filter(
      (item) => !item.isAnswered && item.isMandatory
    ).length === 0
  )
}

export default isPollListAnswered
