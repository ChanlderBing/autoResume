<template>
  <el-card class="box-card">
  <div class="topTab">
      <div @click="back"><svg style="width: 1em; height: 1em;font-size: 22px;" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-029747aa=""><path fill="currentColor" d="M609.408 149.376 277.76 489.6a32 32 0 0 0 0 44.672l331.648 340.352a29.12 29.12 0 0 0 41.728 0 30.592 30.592 0 0 0 0-42.752L339.264 511.936l311.872-319.872a30.592 30.592 0 0 0 0-42.688 29.12 29.12 0 0 0-41.728 0z"></path></svg></div>
      <span class="text-large font-600 mr-3"> {{renderList.title}} </span>
      <el-button type="primary" class="ml-2" @click="onSubmit">完成</el-button>
  </div>
    <div class="skill">
      
<h1>牛</h1>
    </div>
  </el-card>
  </template>
  
  <script setup lang="ts">
  import store from '@/store';
  import '@wangeditor/editor/dist/css/style.css' // 引入 css
  import { onBeforeUnmount,unref, ref, shallowRef, onMounted } from 'vue'
  import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
  import { ElMessage } from 'element-plus';

  
  let resumeMoudle = JSON.parse(localStorage.getItem('resumeMoudle'))
  let renderList = ref(resumeMoudle[store.state.editChosen])
  let renderListDetail = ref(renderList.value.inputList[store.state.editChosenDetail])
  
  const checkList = ['Text','Time']
  const moduleCheck =(key)=>{
    if (checkList.find((item)=>{
      return key.includes(item)
    }) === 'Text') {
      return 'Text'
    }else if(checkList.find((item)=>{
        return key.includes(item)
    }) === 'Time') {
    return 'Time'
  }
    return 'normal'
  }
  const onSubmit = () => {
    resumeMoudle[store.state.editChosen] = unref(renderList)
    localStorage.setItem('resumeMoudle',JSON.stringify(resumeMoudle))
    ElMessage.success('修改成功')
    back()
  }
  const back = ()=>{
    store.commit('switch',false)
  }
  //datePicker
  const shortcuts = [
    {
      text: 'Today',
      value: new Date(),
    },
    {
      text: 'Yesterday',
      value: () => {
        const date = new Date()
        date.setTime(date.getTime() - 3600 * 1000 * 24)
        return date
      },
    },
    {
      text: 'A week ago',
      value: () => {
        const date = new Date()
        date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
        return date
      },
    },
  ]

  const disabledDate = (time: Date) => {
    return time.getTime() > Date.now()
  }
  //richText
  const editorRef = shallowRef()

  const toolbarConfig = {}
  const editorConfig = { placeholder: '请输入内容...' }

  // 组件销毁时，也及时销毁编辑器
  onBeforeUnmount(() => {
      const editor = editorRef.value
      if (editor == null) return
      editor.destroy()
  })

  const handleCreated = (editor) => {
    editorRef.value = editor // 记录 editor 实例，重要！
  }
  //对应关系
  const realationship = {
      'school':'学校',
      'academy':'学时',
      'degree':'学历',
      'major':'专业'
  }
</script>

  <style scoped lang="scss">
    .topTab{
      height: 60px;
      display: flex;
      justify-content: space-between;
    }
    
    .personal{
        height: 200px;
        width: 100%;
        background-color: pink;
    }
   
  </style>