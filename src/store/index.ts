import { createStore } from 'vuex'

export default createStore({
  state: {
    isEdit:false,
    editChosen: 0,
    editChosenDetail: 0,
    editPersonal:false,
    isAdd:false,
    color_theme: 'red-theme',
    addStruct:{},
    token: localStorage.getItem('token') || null
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
    switchEditPersonal(state,editPersonal){
      state.editPersonal = editPersonal
    },
    chosenOne(state,editChosen){
      state.editChosen = editChosen
    },
    chosenDetail(state,editChosenDetail){
      state.editChosenDetail = editChosenDetail
    },
    switchThemeColor(state,color_theme){
      state.color_theme = color_theme
    },
    addStructInit(state,Struct){
      state.addStruct = Struct
    },
    updateToken(state, token) {
      state.token = token
      localStorage.setItem('token', JSON.stringify(token))
    },
    romoveToken(state) {
      state.token = null
      localStorage.removeItem('token')
    },
  },
  actions: {
  },
  modules: {
  }
})
