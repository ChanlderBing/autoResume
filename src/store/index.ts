import { createStore } from 'vuex'

export default createStore({
  state: {
    isEdit:false,
    editChosen: 0
  },
  getters: {
    
  },
  mutations: {
    switch(state,isEdit){
      state.isEdit = isEdit
    },
    chosenOne(state,editChosen){
      state.editChosen = editChosen
    }
  },
  actions: {
  },
  modules: {
  }
})
