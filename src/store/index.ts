import { createStore } from 'vuex'

export default createStore({
  state: {
    resumeModules:[
      {
        id:0,
        name:'Degree'
      },
      {
        id:1,
        name:'Skill'
      },
      {
        id:2,
        name:'Worked'
      },
      {
        id:3,
        name:'Summary'
      },
    ]
  },
  getters: {
    sx(state){
      return state.resumeModules.filter((item)=>{
        return item.id!==3
      })
    }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
