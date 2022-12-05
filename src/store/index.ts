import { createStore } from 'vuex'

export default createStore({
  state: {
    isEdit:false,
    editChosen: 0,
    editChosenDetail: 0,
    isAdd:false,
    color_theme: 'red-theme'
  },
  getters: {
    
  },
  mutations: {
    switch(state,isEdit){
      state.isEdit = isEdit
    },
    switchAdd(state,isAdd){
      state.isAdd = isAdd
    },
    chosenOne(state,editChosen){
      state.editChosen = editChosen
    },
    chosenDetail(state,editChosenDetail){
      state.editChosenDetail = editChosenDetail
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
