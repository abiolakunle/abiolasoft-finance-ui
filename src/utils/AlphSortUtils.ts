const sort = (arr: any ) => {
    return arr.sort((a: any, b: any) => a.name.localeCompare(b.name))
    
}

export default sort