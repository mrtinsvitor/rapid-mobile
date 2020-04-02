import tron from 'reactotron-react-native';
import axios from 'axios';

import { baseURL } from '../config/apiConfig';

const instance = axios.create({ baseURL, timeout: 600000 })

export default {
  get: (url, data) => {
    return request({ method: 'get', url, data });
  },
  post: (url, data) => {
    return request({ method: 'post', url, data });
  },
  put: (url, data) => {
    return request({ method: 'put', url, data });
  },
  delete: (url, data) => {
    return request({ method: 'delete', url, data });
  },
  auth: (data) => {
    return auth(data);
  }
}

const request = ({ method, url, data, headers }) => {
  if (method === 'get') {
    return instance.request({
      method, url, params: data, headers
    }).then(res => res.data)
      .catch(err => handleError(err));
  }

  return instance.request({
    method, url, data, headers
  }).then(res => res.data)
    .catch(err => handleError(err))
}

const handleError = (err, ) => {
  tron.log('[ERROR]: ' + err);
}