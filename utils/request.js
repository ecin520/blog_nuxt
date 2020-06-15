import axios from 'axios'
import Toast from "muse-ui-toast";
import store from "../store";
import {getToken} from './auth'

import qs from 'qs'



const service = axios.create({
  baseURL: 'http://www.pytap.com/api',
  timeout: 18000,
  // headers: {'Content-Type':'multipart/form-data'}
});

service.interceptors.request.use(config => {

  if (config.method === 'post') {
    // config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
  }

  if (getToken()) {
    config.headers['Authorization'] = getToken();
  }
  return config
}, error => {
  Promise.reject(error)
});

service.interceptors.response.use(response => {
  const resp = response.data;
  if (resp.code !== 200) {
    if (resp.code === 403) {
      store.dispatch('logout');
      Toast.error('无权限访问')
    }
    return resp
  } else if (resp.code === 200 || response.code === 200) {
    return resp
  }
}, error => {
  return Promise.reject(error)
});

export default service
