<template>
  <el-card class="box-card">
  <div class="topTab">
      <div @click="back">Back</div>
      <span class="text-large font-600 mr-3"> {{renderList.title}} </span>
      <el-button type="primary" class="ml-2" @click="onSubmit">完成编辑</el-button>
  </div>
    <div class="skill">
      <el-form :inline="true" :model="renderList.inputList" class="demo-form-inline">
        <template v-for="(value,key) in renderList.inputList">
          <el-form-item :label="key" v-if="moduleCheck(key) === 'normal'">
            <el-input v-model="renderList.inputList[key]" />
          </el-form-item>
      <el-form-item label="时间" v-if="moduleCheck(key) === 'Time'">
        <el-col :span="11">
        <el-date-picker
          v-model="renderList.inputList[key].startTime"
          type="date"
          placeholder="开始时间"
          format="YYYY/MM/DD"
          value-format="YYYY-MM-DD"
        />
        </el-col>
      <el-col :span="2" class="text-center">
        <span class="text-gray-500">-</span>
      </el-col>
        <el-col :span="11">
        <el-date-picker
          v-model="renderList.inputList[key].endTime"
          type="date"
          placeholder="结束时间"
          :disabled-date="disabledDate"
          :shortcuts="shortcuts"
          format="YYYY/MM/DD"
          value-format="YYYY-MM-DD"
        />
      </el-col>
      </el-form-item>
      <template v-if="moduleCheck(key) === 'Text'">
        <div>{{key}}</div>
        <Toolbar
        style="border-bottom: 1px solid #ccc"
        :editor="editorRef"
        :defaultConfig="toolbarConfig"
      />
      <Editor
        style="height: 500px; overflow-y: hidden;"
        v-model="renderList.inputList.richText"
        :defaultConfig="editorConfig"
        @onCreated="handleCreated"
      />
      </template>
      </template>
  </el-form>
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

  const checkList = ['Text','Time']
  const moduleCheck =(key)=>{
  if (checkList.find((item)=>{
  return key.includes(item)
  }) === 'Text') {
    return 'Text'
  }else if(checkList.find((item)=>{
  return key.includes(item)
  }) === 'Time'){
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