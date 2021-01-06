

const setFormObject = (data, fn) => ({target}) => {
    const value = target.value;

    return fn({...data, [target.name]: value})
}

export default setFormObject
