import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'

Vue.use(Vuex)

import user from './modules/user';
import customer from './modules/customer';
import global from './modules/global';

const modules = { user, customer, global };

const store = new Vuex.Store({
    modules,
    getters
})

export default store