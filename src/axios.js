import axios from 'axios'


const Host = location.host === 'dev.psyai.net' ? 'https://dev.api.psyai.net' : (location.host === 'psyai.com' || location.host === 'www.psyai.com') ? 'https://api.psyai.net' : '' // build

const Axios = axios.create({
    validateStatus: s => s === 200,
    baseURL: Host,
    timeout: 30000,
    headers: {
        "Content-Type": "application/json;charset=UTF-8",
    },
    withCredentials: true,
})


Axios.interceptors.response.use(
    response => {
        return response.data
    },
    error => {
        const status = error && error.response && error.response.status || 500
        switch (status) {
            case 500:
                return error.response && error.response.data || {
                    code: 'NONE_DATA',
                    msg: '问服务端为什么没有返回code'
                }
        }
        return Promise.reject(error);
    }
)

export default Axios