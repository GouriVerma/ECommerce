import axios from 'axios'
export const BASE_URL='https://ecommerce-backend-e1rh.onrender.com/api'
//export const BASE_URL='http://localhost:8000/api'

export default(axios.create({
    baseURL:BASE_URL
}))


export const axiosPrivate=axios.create({
    baseURL:BASE_URL
})