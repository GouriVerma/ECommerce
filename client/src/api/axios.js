import axios from 'axios'
export const BASE_URL='https://ecommerce-backend-e1rh.onrender.com/api'

export default(axios.create({
    baseURL:BASE_URL
}))


export const axiosPrivate=axios.create({
    baseURL:BASE_URL
})