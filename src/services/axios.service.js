import axios from 'axios';
import config from '../config';

axios.defaults.baseURL = config.dbURL;

export default function apiCaller(path, data = {}, method = 'POST') {
    const methods = {
        DELETE: 'delete',
        GET: 'get',
        HEAD: 'head',
        OPTIONS: 'options',
        PATCH: 'patch',
        POST: 'post',
        PUT: 'put',
    };

    axios.defaults.headers.AuthorizationPath = window.location.pathname;
    axios.defaults.headers.Authorization = `Bearer ${localStorage.getItem(
        'adminToken'
    )}`;
    axios.defaults.headers['Access-Control-Allow-Origin'] = '*';

    /** @type {(url: string, data?: any, config?: AxiosRequestConfig) => AxiosResponse}  */
    const func = axios[methods[method] || 'post'];

    return func(path, data)
        .then((response) => response.data)
        // .catch(handleError);
}