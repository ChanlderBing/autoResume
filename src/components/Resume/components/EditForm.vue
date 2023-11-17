<template>
  <el-card class="box-card">
    <div class="topTab">
      <div @click="back"><svg style="width: 1em; height: 1em;font-size: 22px;" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-029747aa=""><path fill="currentColor" d="M609.408 149.376 277.76 489.6a32 32 0 0 0 0 44.672l331.648 340.352a29.12 29.12 0 0 0 41.728 0 30.592 30.592 0 0 0 0-42.752L339.264 511.936l311.872-319.872a30.592 30.592 0 0 0 0-42.688 29.12 29.12 0 0 0-41.728 0z"></path></svg></div>
      <span class="text-large font-600 mr-3"> {{renderList.title}} </span>
      <el-button type="primary" class="ml-2" @click="onSubmit">完成</el-button>
    </div>
    <div class="skill">
      <el-form :inline="true" :model="renderListDetailForm" ref="ruleForm" class="demo-form-inline">
        <template v-for="(value,key) in renderListDetailForm">
          <template  v-if="moduleCheck(key) === 'normal'">    
            <el-form-item  :label="realationship[key]"  :prop="key" :rules="[{required: true, message: '请输入'+ realationship[key], trigger: 'blur'},{ min: 2, max: 28, message: '长度应该在2-28个字符', trigger: 'blur'}]">
              <el-input v-model="renderListDetailForm[key]" />
            </el-form-item>
          </template>
          <el-form-item label="始末时间" v-if="key.toString() === 'period'" :prop="key"  :rules="[{required: true, message: '请输入时间', trigger: 'change'}]">
            <el-date-picker
              v-model="renderListDetailForm.period"
              type="daterange"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              format="YYYY/MM"
              value-format="YYYY.MM"
            />
          </el-form-item>
          
          <template v-if="key.toString() === 'richText'" >
            <div style="font-size: 14px;">具体描述</div>
              <Toolbar
              style="border-bottom: 1px solid #ccc"
              :editor="editorRef"
              :defaultConfig="toolbarConfig"
              />
              <Editor
                style="height: 500px; overflow-y: hidden;"
                v-model="renderListDetailForm.richText"
                :defaultConfig="editorConfig"
                @onCreated="handleCreated"
                mode="simple"
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
  import { onBeforeUnmount,unref, ref, shallowRef, onMounted, inject, reactive, render, computed, isShallow } from 'vue'
  import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
  import { ElMessage } from 'element-plus';
  import  realationship  from "@/utils/realationshipMap.js";
  import  axios  from '@/api/http';


  const emit = defineEmits(['updateResume'])
  let resumeMoudle = inject('resumeMoudle') as any
  let renderList =computed(() => {
    //访问异步数据，这里二次更新
    return resumeMoudle.value?.find((res: any) => {
      return res.moduleId === store.state.editChosen
    })
   }) 
   //ref(resumeMoudle.value[store.state.editChosen])
  // computed(() => {
  //   //访问异步数据，这里二次更新
  //   return resumeMoudle.value?.find((res: any) => {
  //     return res.moduleId !== store.state.editChosen
  //   })
  // })

  let index = resumeMoudle.value.findIndex((item)=>{
          return item.moduleId === store.state.editChosen
      }) 
  let detailIndex =  resumeMoudle.value[index].inputList.findIndex((item)=>{
      return item.sortIndex === store.state.editChosenDetail
    })
  const renderListDetailForm = ref(JSON.parse(JSON.stringify(renderList.value.inputList[detailIndex])));
  //将时间反格式显示
  const dateReInit = (date)=>{
    return date?.split('~')
  }
  const dateInit = (date)=>{
    return date[0]+ '~'+ date[1]
  }
 
  const checkList = ['Text','period','id','resumemodelId','sortIndex','title','isShow']
  const moduleCheck =(key)=>{
    if (checkList.find((item)=>{
      return key.includes(item)
    }) === 'Text') {
      return 'Text'
    }else if(checkList.find((item)=>{
      return key.includes(item)
    }) === 'period') {
       return 'period'
    }else if(checkList.find((item)=> key === item && item !=='period')){
      return null
    }else {
      return 'normal'
    } 
  }

  const dyamicCom =  {
    '1':'updateWork',
    '2':'updateProject',
    '3':'updateSummary',
    '0':'updateSchool'
  }
  const ruleForm = ref(null);
  const onSubmit = () => {  
  ruleForm.value.validate((valid)=>{
  if (valid) {
    if (renderListDetailForm.value.period) {
      renderListDetailForm.value.period = dateInit(renderListDetailForm.value.period)
    }
    if (store.state.token && store.state.currentResumeId != store.state.modelResumeId) {
      axios.post(`posts/${dyamicCom[renderList.value.moduleId]}`,renderListDetailForm.value).then((res)=>{
        if (res.status=== 201) {
          emit('updateResume')
          ElMessage.success('修改成功')
          back()
        }
    })
    } else {
      renderList.value.inputList[store.state.editChosenDetail] = renderListDetailForm.value
      resumeMoudle[store.state.editChosen] = unref(renderList)
      localStorage.setItem('resumeMoudle',JSON.stringify(resumeMoudle.value))
      ElMessage.success('修改成功')
      back()
    }
    }else{
      ElMessage.error("输入数据格式不对")
  }
  })
  }

  const back = ()=>{
    store.commit('switch',false)
  }

  const disabledDate = (time: Date) => {
    return time.getTime() > Date.now()
  }
  //richText
  const editorRef = shallowRef()
  const toolbarConfig = {
    toolbarKeys: [ 
    "bold",
    "italic",
    "underline",
    "color",
    "indent",
    "delIndent",
    "insertLink",
    "undo",
    "bulletedList",
    "numberedList",
    ],
  }
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

  onMounted:{
  if (renderListDetailForm.value.period) {
    renderListDetailForm.value.period = dateReInit(renderListDetailForm.value.period)
  }
}
</script>

  <style scoped lang="scss">
    .topTab{
      height: 60px;
      display: flex;
      justify-content: space-between;
    }
  </style>