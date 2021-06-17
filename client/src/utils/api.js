import axios from 'axios'

export default axios.create({
    baseURL: 'http://localhost:5000/',
    headers: {
        Authorization: 'Bearer l2cmhf2ez...',
        'Content-Type': 'application/json'
    }
})
