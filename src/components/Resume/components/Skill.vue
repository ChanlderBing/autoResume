<template>
    <div class="skill">
      <el-form :inline="true" :model="formInline[0].inputList" class="demo-form-inline">
        <template v-for="(value,key) in resumeMoudle[0].inputList">
          <el-form-item :label="key" v-if="moduleCheck(key) === 'normal'">
      <el-input v-model="formInline[0].inputList[key]" />
    </el-form-item>
    <el-form-item label=" time" v-if="moduleCheck(key) === 'Time'">
      <el-col :span="11">
      <div class="block">
      <span class="demonstration">Default</span>
      <el-date-picker
        v-model="formInline[0].inputList[key].startTime"
        type="date"
        placeholder="Pick a day"
        format="YYYY/MM/DD"
        value-format="YYYY-MM-DD"
      />
    </div>
    <div class="block">
      <span class="demonstration">Picker with quick options</span>
      <el-date-picker
        v-model="formInline[0].inputList[key].endTime"
        type="date"
        placeholder="Pick a day"
        :disabled-date="disabledDate"
        :shortcuts="shortcuts"
        format="YYYY/MM/DD"
        value-format="YYYY-MM-DD"
      />
    </div>
  </el-col>
    </el-form-item>
    <el-form-item :label="key" v-if="moduleCheck(key) === 'Text'">
      <!-- <el-select v-model="formInline[0].inputList[key]" placeholder="Activity zone">
        <el-option label="Zone one" value="shanghai" />
        <el-option label="Zone two" value="beijing" />
      </el-select> -->
      <QuillEditor theme="snow" />
    </el-form-item>
        </template>
        <el-button type="primary" @click="onSubmit">Create</el-button>
  </el-form>
    </div>
  </template>
  
  <script setup lang="ts">
import { onMounted,ref } from 'vue';
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'

let resumeMoudle = JSON.parse(localStorage.getItem('resumeMoudle'))
let formInline = ref(resumeMoudle)

onMounted(()=>{
console.log(formInline)

})
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
  console.log(formInline)
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
    .personal{
        height: 200px;
        width: 100%;
        background-color: pink;
    }
  </style>