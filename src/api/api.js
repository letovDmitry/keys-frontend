import axios from "axios"
// const https = require('https')

const baseURL = 'https://185.185.68.187:8080/api'

const token = localStorage.getItem('jwt')

const Api = axios.create({
    baseURL,
    headers: {'Authorization': `Bearer ${ token }`},
})

export { Api }