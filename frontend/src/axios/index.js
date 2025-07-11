import axios from 'axios';

const _axios = axios.create({
    baseURL: 'http://localhost:2250/api/v1',
    headers: {
        post: {
            'Content-Type': 'multipart/form-data',
        },
        patch: { 'Content-Type': 'multipart/form-data' },
    },
});

_axios.defaults.withCredentials = true;

_axios.interceptors.request.use(req => {
    return req;
});

_axios.interceptors.response.use(
    res => {
        return res;
    },
    ({ response: { data } }) => {
        return Promise.reject({ data });
    }
);

export default _axios;
