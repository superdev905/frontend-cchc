/* eslint-disable */
const removeEmptyChildren = (data) => {
  if (data.children && data.children.length > 0) {
    data.children.forEach((item) => {
      removeEmptyChildren(item)
    })
  } else {
    delete data.children
  }
}

const searchFromTree = (mainNode, element, matchingTitle) => {
  if (element.id === matchingTitle) {
    return mainNode
  } else if (element.children) {
    let i
    let result = null
    for (i = 0; result === null && i < element.children.length; i++) {
      result = searchFromTree(mainNode, element.children[i], matchingTitle)
    }
    return result
  }
  return null
}

//  eslint-disable-next-line
const buildTreeData = (list) => {
  const hashTable = Object.create(null)
  list.forEach((aData) => (hashTable[aData.id] = { ...aData, children: [] }))
  const dataTree = []
  list.forEach((aData) => {
    if (aData.parent_business_id)
      hashTable[aData.parent_business_id].children.push(hashTable[aData.id])
    else dataTree.push(hashTable[aData.id])
  })

  return dataTree
}

export { buildTreeData, searchFromTree }
