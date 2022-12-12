import { setUserInitialDate, setUserInitialStore, getUserInitialDate, getUserInitialStore, getSearchBy, setSearchedBy, setCustomerID, getCustomerID, removeCustomerID } from '@/utils/auth';
import contractStore from '../../../public/contractStore.json'
const state = {
    userSelections: {
        initial: {
            date: getUserInitialDate(),
            ContractStore: getUserInitialStore()
        },
        searchBy: getSearchBy(),
        customerId: getCustomerID(),
    },
    capturedImages: [],
    // ContractStores: [
    //     { id: 1, name: '浜松町本店' },
    //     { id: 2, name: 'GINZA店' },
    //     { id: 3, name: '渋谷店' },
    //     { id: 4, name: '新宿店' },
    //     { id: 5, name: '全店舗' },
    //     { id: 6, name: '浜松町本店-1' },
    //     { id: 7, name: 'GINZA店-2' },
    //     { id: 8, name: '渋谷店-3' },
    // ]
    ContractStores: contractStore,
}

const mutations = {
    SET_USER_INITIAL: (state, userSelections) => {
        state.userSelections.initial = userSelections
    },
    SET_CAPTURED_IMAGES: (state, image) => {
        if (image.type === 'ocr') {
            state.capturedImages[0] = image;
        } else {
            state.capturedImages.push(image);
        }
    },
    SET_SELECTED_CUSTOMER: (state, customer) => {
        state.userSelections.customer = customer;
    },
    SET_SEARCH_BY: (state, data) => {
        state.userSelections.searchBy = data;
    },
    SET_SEARCHED_ID: (state, data) => {
        state.userSelections.searchedId = data;
    },
}

const actions = {
    // set user selections
    setUserInitial({ commit }, data) {
        return new Promise(resolve => {
            commit('SET_USER_INITIAL', data)
            setUserInitialDate(data.date)
            setUserInitialStore(data.ContractStore)
            resolve('success')
        })
    },
    // set selected customer by oparator
    setSelectedCustomer({ commit }, data) {
        return new Promise(resolve => {
            commit('SET_SELECTED_CUSTOMER', data)
            setCustomerID(data.CustomerID)
            state.userSelections.customerId = data.CustomerID
            resolve('success')
        })
    },
    // set captured images by oparator
    setCapturedImages({ commit }, image) {
        return new Promise(resolve => {
            commit('SET_CAPTURED_IMAGES', image)
            resolve('success')
        })
    },
    // set oparator selected search method
    setSearchBy({ commit }, data) {
        return new Promise(resolve => {
            commit('SET_SEARCH_BY', data)
            setSearchedBy(data)
            resolve('success')
        })
    },
    // get oparator's searched id
    setSearchedId({ commit }, data) {
        return new Promise(resolve => {
            commit('SET_SEARCHED_ID', data)
            resolve('success')
        })
    },
    // refresh global store for cache clear
    refreshGlobalStore({ commit, state }) {
        return new Promise(resolve => {
            commit('SET_SELECTED_CUSTOMER', {})
            state.capturedImages = []
            state.userSelections.customerId = null
            commit('SET_SEARCH_BY', {})
            commit('SET_SEARCHED_ID', {})
            removeCustomerID()
            resolve('success')
        })
    }

}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}