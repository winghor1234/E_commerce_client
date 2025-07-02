import axios from 'axios'


export const createCategory = async (token, form) => {
    // code body
    return axios.post('http://localhost:8888/api/category', form, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const listCategory = async () => {
    // code body
    return axios.get('http://localhost:8888/api/category')
}

export const removeCategory = async (token, id) => {
    // code body
    return axios.delete('http://localhost:8888/api/category/'+id, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}