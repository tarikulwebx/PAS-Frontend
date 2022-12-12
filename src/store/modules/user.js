import { login, logout } from '@/api/user'
import { getToken, setToken, removeToken, setUserID, getUserID, removeUserID, removeUserInitialDate, removeUserInitialStore, setLastLoginSession, removeLastLoginSession, removeSearchBy, removeCustomerID } from '@/utils/auth';
import { setZoomInstraction, getZoomInstraction } from '@/utils/zoom';
import router, { resetRouter } from '@/router'

const state = {
    token: getToken(),
    f_name: '',
    l_name: '',
    id: '',
    userid: getUserID(),
    zoomInstration: getZoomInstraction(),
}

const mutations = {
    SET_TOKEN: (state, token) => {
        state.token = token
    },
    SET_NAME: (state, name) => {
        state.name = name
    },
    SET_ZOOM_INSTRATION: (state, zoomInstration) => {
        state.zoomInstration = zoomInstration
    },
    SET_USER_ID: (state, userid) => {
        state.userid = userid
    },
    SET_F_NAME: (state, f_name) => {
        state.f_name = f_name
    },
    SET_L_NAME: (state, l_name) => {
        state.l_name = l_name
    },
    SET_ID: (state, id) => {
        state.id = id
    },
}

const actions = {
    // user login
    login({ commit }, userInfo) {
        const { userid, password } = userInfo
        return new Promise((resolve, reject) => {
            login({ username: userid, password: password }).then(response => {
                commit('SET_TOKEN', response.token)
                commit('SET_ZOOM_INSTRATION', true)
                commit('SET_USER_ID', response.data.userid)
                commit('SET_F_NAME', response.data.f_name)
                commit('SET_L_NAME', response.data.l_name)
                commit('SET_ID', response.data.id)
                setLastLoginSession(new Date().toLocaleDateString('jp-JP'))
                setToken(response.token)
                setUserID(response.data.userid)
                setZoomInstraction(true)
                resolve(response)
            }).catch(error => {
                // console.log('error =>',error);
                reject(error)
            })
        })
    },

    // get user info
    getInfo({ commit, state }) {
        return new Promise((resolve, reject) => {
            getInfo(state.token).then(response => {
                const { data } = response

                if (!data) {
                    reject('Verification failed, please Login again.')
                }
                const { name } = data
                commit('SET_NAME', name)
                resolve(data)
            }).catch(error => {
                reject(error)
            })
        })
    },

    // user logout
    logout({ commit, state, dispatch }) {
        return new Promise((resolve, reject) => {
            logout(state.token).then(() => {
                commit('SET_TOKEN', '')
                commit('SET_ZOOM_INSTRATION', false)
                setZoomInstraction(false)
                removeToken()
                removeUserID()
                removeUserInitialDate()
                removeUserInitialStore()
                removeLastLoginSession()
                removeSearchBy()
                resetRouter()
                removeCustomerID()
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },

    // remove token
    resetToken({ commit }) {
        return new Promise(resolve => {
            commit('SET_TOKEN', '')
            removeToken()
            setZoomInstraction(false)
            removeToken()
            removeUserID()
            removeUserInitialDate()
            removeUserInitialStore()
            removeLastLoginSession()
            removeSearchBy()
            removeCustomerID()
            router.push('/login')
            resolve()
        })
    },

}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}