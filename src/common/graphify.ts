export const graphify = (obj: any) => replaceId(JSON.parse(JSON.stringify(obj)))

const replaceId = (obj: any) => {
    if(Array.isArray(obj)) {
        return obj.map(o => replaceId(o))
    }
    obj.id = obj._id || obj.id
    delete obj._id
    Object.keys(obj).forEach(key => {
        if(typeof obj[key] === "object") obj[key] = replaceId(obj[key])
    })
    return obj
}

export default graphify
