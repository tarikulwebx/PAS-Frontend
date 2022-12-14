import axios from 'axios'
import { showToastMessage } from "../utils/message";
import store from '@/store'
import { getToken, getLastLoginSession } from '@/utils/auth'
// create an axios instance
const service = axios.create({
    //baseURL: "https://shiraser.com/postal-api/api/v1", // url = base url + request url
    // withCredentials: true, // send cookies when cross-domain requests
    //timeout: 50000, // request timeout
    //baseURL: "http://127.0.0.1:8000/api/v1"
    baseURL: "https://54.161.246.53/postal-api/api/v1"
})

// request interceptor
service.interceptors.request.use(
    config => {
        // do something before request is sent
        if (store.state.user.token) {
            // let each request carry token
            // ['X-Token'] is a custom headers key
            // please modify it according to the actual situation
            config.headers['Token'] = getToken(),
                config.headers['Access-Control-Allow-Headers'] = '*',
                config.headers['Access-Control-Allow-Origin'] = '*',
                config.headers['Accept'] = 'application/json',
                config.headers['Content-Type'] = 'application/json',
                config.headers['Authorization'] = 'Bearer ' + getToken()
        }
        let today = new Date().toLocaleDateString('jp-JP');
        if (getLastLoginSession() && today !== getLastLoginSession()) {
            store.dispatch('user/resetToken').then(() => {
                store.dispatch('global/refreshGlobalStore');
                store.dispatch('customer/refreshCustomerStore');
                showToastMessage('ログアウトしました。再度ログインしてください。', "is-danger");
            })
            // location.reload();
        } else {
            return config
        }
    },
    error => {
        // do something with request error
        console.log('error', error) // for debug
        return Promise.reject(error)
    }
)

// response interceptor
service.interceptors.response.use(
    /**
     * If you want to get http information such as headers or status
     * Please return  response => response
    */

    /**
     * Determine the request status by custom code
     * Here is just an example
     * You can also judge the status by HTTP Status Code
     */
    async response => {
        const res = response.data
        // if the custom status_code is not 200, it is judged as an error.
        if (res.status_code !== 200) {
            // showToastMessage(res.message, "is-danger");
            // 508: Illegal token; 512: Other clients logged in; 514: Token expired;
            if (res.status_code === 508 || res.status_code === 512 || res.status_code === 514 || res.status_code === 401) {
                // to re-login
                await store.dispatch('user/resetToken').then(() => {
                    store.dispatch('global/refreshGlobalStore');
                    store.dispatch('customer/refreshCustomerStore');
                    showToastMessage('ログアウトしました。再度ログインしてください。', "is-danger");
                })
                // location.reload();
            }
            return Promise.reject(new Error(res.message || 'Error'))
        } else {
            return res
        }
    },
    async error => {
        if (error.response.status === 401) {
            await store.dispatch('user/resetToken').then(() => {
                store.dispatch('global/refreshGlobalStore');
                store.dispatch('customer/refreshCustomerStore');
                showToastMessage('ログアウトしました。再度ログインしてください。', "is-danger");
            })
        } else if (error.response.status === 403) {
            showToastMessage(
                "ユーザーIDとパスワードを入力してください。",
                "is-danger"
            );
        } else {
            showToastMessage(error.message, "is-danger");
        }

        return Promise.reject(error)
    }
)

export default service