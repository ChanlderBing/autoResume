import { createStore } from 'vuex'

export default createStore({
  state: {
    isEdit:false
  },
  getters: {
    
  },
  mutations: {
    switch(state,isEdit){
       state.isEdit = isEdit
       }
  },
  actions: {
  },
  modules: {
  }
})
