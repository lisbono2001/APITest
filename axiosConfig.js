const axios = require('axios');

const axiosInstance = axios.default.create({
    baseURL: 'https://suchonsite-server.herokuapp.com/people'
});

module.exports = axiosInstance;