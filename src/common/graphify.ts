export const graphify = (obj: any) => {
    const newObj = JSON.parse(JSON.stringify(obj))
    newObj.id = newObj._id
    delete newObj._id
    return newObj
}

export default graphify
