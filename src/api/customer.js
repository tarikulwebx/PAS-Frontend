import request from '@/utils/request'

export function getCustomerByID(data) {
    return request({
        url: '/search-id',
        method: 'post',
        data: data
    })
}

export function getOCRData(data) {
    return request({
        url: '/ocr',
        method: 'post',
        data: data
    })
}

export function getOCRResult(data) {
    return request({
        url: '/ocr-result',
        method: 'post',
        data: data
    })
}

export function getOCRDataBySchedule(data) {
    return request({
        url: '/ocr-schedule',
        method: 'post',
        data: data
    })
}

export function getCustomersByOpenSearch(data){
    return request({
        url: '/open-search',
        method: 'post',
        data:  data 
    })
}

export function getCustomerData(data){
    return request({
        url: '/balance-and-history',
        method: 'post',
        data: { CustomerID: data }
    })
}

export function registerNewDocument(data){
    return request({
        url: '/operator-final-submit',
        method: 'post',
        data: data
    })
}