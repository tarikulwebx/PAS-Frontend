const getters = {
    token: state => state.user.token,
    errorLogs: state => state.errorLog.logs
}
export default getters