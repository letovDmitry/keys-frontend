import axios from "axios"
// const https = require('https')

const baseURL = 'https://keys-store.online:8080/api'

const token = localStorage.getItem('jwt')

const Api = axios.create({
    baseURL,
    headers: {'Authorization': `Bearer ${ token }`},
})

export { Api }