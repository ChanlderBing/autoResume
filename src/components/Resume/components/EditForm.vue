<template>
  <div class="topTab">
    <button @click="back">回去</button>
    <span class="title">{{renderList.title}}</span>
    <el-button type="primary" @click="onSubmit">Create</el-button>
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
        <QuillEditor theme="snow"  v-model:content="renderList.inputList.richText" contentType="html" />
      </template>
        
      </template>
  </el-form>
    </div>
  </template>
  
  <script setup lang="ts">
  import { onMounted,ref, unref } from 'vue';
  import { QuillEditor } from '@vueup/vue-quill'
  import '@vueup/vue-quill/dist/vue-quill.snow.css'
  import store from '@/store';

  
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
  }
  const back = ()=>{
    store.commit('switch',false)
  }
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