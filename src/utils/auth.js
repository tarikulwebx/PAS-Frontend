const TokenKey = 'Admin-Token'
const UserID = 'User-ID'
const CustomerID = 'Customer-ID'
const InitialDate = "InitialDate"
const InitialStore = "InitialStore"
const LastLoginSession = "LastLoginSession"
const searchedBy = "searchBy"

export function getToken() {
    return localStorage.getItem(TokenKey)
}

export function getUserID() {
    return localStorage.getItem(UserID)
}

export function setToken(token) {
    return localStorage.setItem(TokenKey, token)
}

export function setUserID(userid) {
    return localStorage.setItem(UserID, userid)
}

export function removeToken() {
    return localStorage.removeItem(TokenKey)
}

export function removeUserID() {
    return localStorage.removeItem(UserID)
}

export function setUserInitialDate(date){
    return localStorage.setItem(InitialDate, date)
}

export function getUserInitialDate(){
    return localStorage.getItem(InitialDate)
}

export function removeUserInitialDate(){
    return localStorage.removeItem(InitialDate)
}

export function setUserInitialStore(store) {
    return localStorage.setItem(InitialStore, store)
}

export function getUserInitialStore() {
    return localStorage.getItem(InitialStore)
}

export function removeUserInitialStore() {
    return localStorage.removeItem(InitialStore)
}

export function setLastLoginSession(session){
    return localStorage.setItem(LastLoginSession, session)
}

export function getLastLoginSession(){
    return localStorage.getItem(LastLoginSession)
}

export function removeLastLoginSession() {
    return localStorage.removeItem(LastLoginSession)
}

export function setSearchedBy(searchBy) {
    return localStorage.setItem(searchedBy, searchBy)
}

export function getSearchBy() {
    return localStorage.getItem(searchedBy)
}

export function removeSearchBy() {
    return localStorage.removeItem(searchedBy)
}

export function setCustomerID(ID) {
    return localStorage.setItem(CustomerID, ID)
}

export function getCustomerID() {
    return localStorage.getItem(CustomerID)
}

export function removeCustomerID() {
    return localStorage.removeItem(CustomerID)
}
