import { getCustomerByID, getOCRData, getCustomersByOpenSearch, getCustomerData, registerNewDocument, getOCRResult, getOCRDataBySchedule } from '@/api/customer'
import { getUserInitialStore } from '@/utils/auth';

const state = {
    type: '',
    ocrOriginalResponse: [],
    ocrSearchResults: [],
    ocrResponseElements: [],
    ocrResponseSelectedElements: [],
    ocrOriginalResponseSelectedElements: [],
    ocrSearchedText: '',
    mailHistories: [],
    topFiveCustomers: [],
    boundingBoxImage: '',
    openSearchQuery: {
        search: '',
        corporation: 1,
        personal: 1,
        ContractStore: parseInt(getUserInitialStore())
    }
}

const mutations = {
    SET_TYPE: (state, type) => {
        state.type = type
    },

    SET_OCR_SEARCHED_TEXT: (state, ocrSearchedText) => {
        state.ocrSearchedText = ocrSearchedText
    },
    SET_OCR_SEARCH_RESULTS: (state, results) => {
        state.ocrSearchResults = results
    },
    SET_OPEN_SEARCH_QUERY: (state, query) => {
        state.openSearchQuery[query.name] = query.value
    },
    SET_OCR_RESPONSE_ELEMENTS: (state, elements) => {
        state.ocrResponseElements = elements
    },
    SET_OCR_RESPONSE_SELECTED_ELEMENT: (state, element) => {
        state.ocrResponseSelectedElements.push(element)
    },
    SET_MAIL_HISTORIES: (state, histories) => {
        state.mailHistories = histories
    },
    SET_TOP_FIVE_CUSTOMERS: (state, customers) => {
        state.topFiveCustomers = customers
    },
    SET_OCR_ORIGINAL_RESPONSE: (state, response) => {
        state.ocrOriginalResponse = response
    },
    SET_BOUNDING_BOX_IMAGE: (state, image) => {
        state.boundingBoxImage = image
    },
    SET_OCR_ORIGINAL_RESPONSE_SELECTED_ELEMENT: (state, elements) => {
        state.ocrOriginalResponseSelectedElements = elements
    }
}

const actions = {
    // set opensearch query
    setOpenSearchQuery({ commit }, query) {
        return new Promise(resolve => {
            commit('SET_OPEN_SEARCH_QUERY', query)
            resolve('success')
        })
    },
    // get user info
    getCustomerByID({ commit, state }, data) {
        return new Promise((resolve, reject) => {
            getCustomerByID(data).then(response => {
                const { data } = response
                if (!data) {
                    reject('No customer found with this id')
                }
                const { type } = data
                commit('SET_TYPE', type)
                resolve(data)
            }).catch(error => {
                reject(error)
            })
        })
    },
    // get ocr data
    getOCRData({ commit, state }, data) {
        state.ocrResponseElements = []
        state.ocrResponseSelectedElements = []
        state.ocrOriginalResponse = []
        state.topFiveCustomers = []
        state.boundingBoxImage = ''
        state.ocrOriginalResponseSelectedElements = []
        return new Promise((resolve, reject) => {
            getOCRData(data).then(response => {
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },
    // get ocr result
    getOCRResult({ commit, state }, data) {
        state.ocrResponseElements = []
        state.ocrResponseSelectedElements = []
        state.ocrOriginalResponse = []
        state.topFiveCustomers = []
        state.boundingBoxImage = ''
        state.ocrOriginalResponseSelectedElements = []
        return new Promise((resolve, reject) => {
            getOCRResult(data).then(response => {
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },
    // get customers by open search
    getCustomersByOpenSearch({ commit, state }) {
        return new Promise((resolve, reject) => {
            getCustomersByOpenSearch(state.openSearchQuery).then(response => {
                commit('SET_OCR_SEARCHED_TEXT', state.openSearchQuery.search)
                commit('SET_OCR_SEARCH_RESULTS', response.data)
                resolve(response.data)
            }).catch(error => {
                reject(error)
            })
        })
    },
    // get customer balance and previous mail histories latest 3
    getCustomerData({ commit, state }, data) {
        return new Promise((resolve, reject) => {
            getCustomerData(data).then(response => {
                commit('SET_MAIL_HISTORIES', response.history)
                console.log(response.history);
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },
    // finial submition for registering new document
    registerNewDocument({ commit, state }, data) {
        return new Promise((resolve, reject) => {
            registerNewDocument(data).then(response => {
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },
    // set ocr response elements
    setOCRResponseElements({ commit, state }, data) {
        return new Promise((resolve, reject) => {
            commit('SET_OCR_RESPONSE_ELEMENTS', data)
            resolve(data)
        })
    },
    // set ocr response selected element
    setOCRResponseSelectedElements({ commit, state }, data) {
        return new Promise((resolve, reject) => {
            commit('SET_OCR_RESPONSE_SELECTED_ELEMENT', data)
            resolve(data)
        })
    },
    // set ocr original response selected element
    setOCROriginalResponseSelectedElements({ commit, state }, data) {
        return new Promise((resolve, reject) => {
            commit('SET_OCR_ORIGINAL_RESPONSE_SELECTED_ELEMENT', data)
            resolve(data)
        })
    },
    // get ocr data by schedule
    getOCRDataBySchedule({ commit, state }, data) {
        state.ocrResponseElements = []
        state.ocrResponseSelectedElements = []
        state.ocrOriginalResponse = []
        state.topFiveCustomers = []
        state.boundingBoxImage = ''
        state.ocrOriginalResponseSelectedElements = []
        return new Promise((resolve, reject) => {
            getOCRDataBySchedule(data).then(response => {
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },

    // refresh customer store
    refreshCustomerStore({ commit, state }) {
        return new Promise((resolve, reject) => {
            state.ocrSearchResults = []
            state.ocrResponseElements = []
            state.ocrResponseSelectedElements = []
            state.ocrSearchedText = ''
            state.mailHistories = []
            state.ocrOriginalResponse = []
            state.topFiveCustomers = []
            state.boundingBoxImage = ''
            state.ocrOriginalResponseSelectedElements = []
            resolve()
        })
    },

    // get top five customers
    setTopFiveCustomers({ commit, state }, data) {
        return new Promise((resolve, reject) => {
            return new Promise(resolve => {
                commit('SET_TOP_FIVE_CUSTOMERS', data)
                resolve('success')
            })
        })

    },
    // get ocr original response
    setOCROriginalResponse({ commit, state }, data) {
        return new Promise((resolve, reject) => {
            commit('SET_OCR_ORIGINAL_RESPONSE', data)
            resolve(data)
        })
    },
    // get ocr bounding box image
    setBoundingBoxImage({ commit, state }, data) {
        return new Promise((resolve, reject) => {
            commit('SET_BOUNDING_BOX_IMAGE', data)
            resolve(data)
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}