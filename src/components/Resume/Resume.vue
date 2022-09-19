<template>
     <div class="features" id="dn">
    <el-select v-model="value" class="m-2" :placeholder="options[0].label">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
      :change="changeTheme(value)"
    />
  </el-select>
  <!-- <el-select v-model="value1" class="m-2" placeholder="se">
    <el-option
      v-for="item in comList"
      :key="item.name"
      :label="item.name"
      :value="item.name"
      :change="changeTheme(value)"
    />
  </el-select> -->
    </div>

  <div class="main" id="printC">
    <div class="personal">
      <Personal></Personal>
    </div>
    <!-- <div :class="focusIndex===index ? 'active':''" v-for="(item,index) in comList" :key="index" @mouseover="focusMoudle(index)" @mouseout="blurMoudel">
      <div class="control" v-show="focusIndex===index">
      <button @click="switchTabUp(index)">上</button>
      <button @click="switchTabDown(index)">下</button>
    <button @click="tabDel(index)">
      删除
    </button>
    </div> -->
        <!-- <component :is="item"></component> -->
        <Degree :resumeMoudle="resumeMoudle"></Degree>
    <!-- </div> -->

    <button @click="print()">打印</button>
  </div>

</template>
<script lang="ts" setup>
import Personal from '@/components/Resume/components/Personal.vue'
import printjs from 'print-js'
import { ref,markRaw, onMounted } from 'vue'
import Degree from './components/Degree.vue'
import Worked from './components/Worked.vue'
import Skill from './components/Skill.vue'
import Summary from './components/Summary.vue'
import { stringify } from 'querystring'

const style = '.main{margin:0;padding:0;}'

const value = ref('light-theme')
    const options = [
  {
    value: 'light-theme',
    label: 'ligth',
  },
  {
    value: 'dark-theme',
    label: 'dark',
  }
]
const value1 = ref('Degree')
const changeTheme = (theme:string)=>{
      window.document.getElementById('app')?.setAttribute('data-theme', theme)
}
let resumeMoudle = [{
    title:'教育经历',
    expand:true,
    inputList:{
        school:'',
        major:'',
        degree:'',
        academy:'',
        city:'',
        Time:{
            startTime:'',
            endTime:''
        },
        
        richText:''
    }
},
{
    title:'工作经历',
    expand:true,
    inputList:{
        school:'',
        major:'',
        degree:'',
        academy:'',
        city:'',
        startTime:'',
        endTime:'',
        richText:''
    }
}]
onMounted:{
    localStorage.setItem('resumeMoudle', JSON.stringify(resumeMoudle));
}
const print = () => {
  printjs({
    printable: 'printC',
    type: 'html',
    targetStyles: ['*'],
    style,
    header: null
  })
}
</script>

<style scoped lang="scss">
.main {
  width: 780px;
  height: 1106px;
  @include base-color();
  @include base-background();
  font-size: $font-size;
  .personal {
    height: 100px;
  }
  .active{
    background-color: darkgray;
    opacity: 0.4;
  }
}
.features{
    height: 60px;
    margin-bottom: 10px;
}
.v-enter,
			.v-leave-to{
				opacity: 0;
				// transform: translateY(150px);
			}
			.v-enter-active,
			.v-leave-active{
				opacity: 1;
				// transition: all 0.2s ease; 
      }

</style>