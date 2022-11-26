import { createStore } from 'vuex'

export default createStore({
  state: {
    isEdit:false,
    editChosen: 0,
    color_theme: 'red-theme'
  },
  getters: {
    
  },
  mutations: {
    switch(state,isEdit){
      state.isEdit = isEdit
    },
    chosenOne(state,editChosen){
      state.editChosen = editChosen
    },
    switchThemeColor(state,color_theme){
      state.color_theme = color_theme
    }
  },
  actions: {
  },
  modules: {
  }
})
