import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';

const superagent = superagentPromise(_superagent, global.Promise);

const API_ROOT = 'http://localhost:8080';

const encode = encodeURIComponent;
const responseBody = res => res.body;

let token = null;
const tokenPlugin = req => {
    if (token) {
        req.set('Authorization', `Bearer ${token}`);
    }
}

const requests = {
    del: url =>
        superagent.del(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
    get: url =>
        superagent.get(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
    put: (url, body) =>
        superagent.put(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody),
    post: (url, body) =>
        superagent.post(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody)
};

const Auth = {
    current: (token) =>
        requests.post('/api/auth/currentUser', { token }),
    login: (username, password) =>
        requests.post('/api/auth/authenticate', { username, password  }),
    register: (firstName, lastName, userName, email, password, roleName) =>
        requests.post('/api/auth/register', { firstName, lastName, userName, email, password, roleName } ),
};

const Courses = {
    all: () =>
        requests.get(`/api/v1/courses`)
};

export default {
    Courses,
    Auth,
    setToken: _token => { token = _token; }
};