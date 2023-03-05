import axios from "axios"
// const https = require('https')

// const baseURL = 'http://195.140.146.153:8080/api'
const baseURL = 'https://keys-store.online/api'

const token = localStorage.getItem('jwt')

const Api = axios.create({
    baseURL,
    headers: {'Authorization': `Bearer ${ token }`},
})

export { Api }