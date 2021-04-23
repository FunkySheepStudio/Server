import { FeathersVuex, FeathersVuexFind, FeathersVuexGet } from 'feathers-vuex'

import Vue from 'vue'

Vue.use(FeathersVuex)
Vue.component('FeathersVuexFind', FeathersVuexFind)
Vue.component('FeathersVuexGet', FeathersVuexGet)
