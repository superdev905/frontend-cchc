const removeEmptyChildren = (data) => {
  if (data.children.length > 0 && data.children) {
    data.children.forEach((item) => {
      removeEmptyChildren(item)
    })
  } else {
    delete data.children
  }
}

//  eslint-disable-next-line
const buildTreeData = (list) => {
  const map = []
  let node = []
  const roots = []

  for (let i = 0; i < list.length; i += 1) {
    map[list[i].id] = i
    list[i].children = []
  }
  for (let j = 0; j < list.length; j += 1) {
    node = list[j]
    if (node.parent_business_id !== null) {
      list[map[node.parent_business_id]].children.push(node)
    } else {
      roots.push(node)
    }
  }
  roots.forEach((item) => {
    removeEmptyChildren(item)
  })

  return roots
}

export default buildTreeData
