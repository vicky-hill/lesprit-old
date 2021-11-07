import axios from 'axios'

const fetch = () => {
    const defaultOptions = {
      baseURL: 'http://localhost:4000/',
      headers: {
        'Content-Type': 'application/json',
      },
    };
  
    // Create instance
    let instance = axios.create(defaultOptions);
  
    // Set the auth token for any request
    instance.interceptors.request.use(function (config) {
      const token = localStorage.getItem('token');
      config.headers['x-auth-token'] =  token ? token : '';
      return config;
    });
  
    return instance;
  };
  
export default fetch();